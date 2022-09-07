import { fetchToken } from '@/api/Tokens';
import { Token, TokensQueryKey } from '@/types';
import { useQuery, useQueryClient } from 'react-query';
import { AdditionalQueryOptions } from './consts';
import { tokensInitialFilters } from './useTokensData';

export default function useTokenData(
  organizationId: string,
  tokenId: string,
  { onSuccess, onError, enabled = !!(organizationId && tokenId) }: AdditionalQueryOptions<Token> = {}
) {
  const queryClient = useQueryClient();
  return useQuery<Token>([TokensQueryKey.TokenDetails, tokenId], () => fetchToken(organizationId, tokenId), {
    initialData: () => {
      const token = queryClient
        .getQueryData<Token[]>([TokensQueryKey.Tokens, organizationId, tokensInitialFilters])
        ?.find(token => token.id === tokenId);

      if (token) return token;
      return undefined;
    },
    onSuccess,
    onError,
    enabled
  });
}
