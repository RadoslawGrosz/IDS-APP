import { FetchTokenFilters, fetchTokens } from '@/api/Tokens';
import { Token, TokensQueryKey } from '@/types';
import { useQuery } from 'react-query';
import { AdditionalQueryOptions } from './consts';

export const tokensInitialFilters = {
  searchTerm: '',
  CreatedAtFrom: null,
  CreatedAtTo: null
};

export default function useTokensData(
  organizationId: string,
  filters: FetchTokenFilters,
  { onSuccess, onError, enabled = !!organizationId }: AdditionalQueryOptions<Token[]> = {}
) {
  return useQuery<Token[]>([TokensQueryKey.Tokens, organizationId, filters], () => fetchTokens(organizationId, filters), {
    onSuccess,
    onError,
    enabled
  });
}
