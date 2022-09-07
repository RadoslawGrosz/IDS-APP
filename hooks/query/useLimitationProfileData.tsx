import { fetchLimitationProfile } from '@/api/Tokens';
import { LimitationProfile, TokensQueryKey } from '@/types';
import { useQuery } from 'react-query';
import { AdditionalQueryOptions } from './consts';

export default function useLimitationProfileData(
  organizationId: string,
  id: string,
  { onSuccess, onError, enabled = !!organizationId }: AdditionalQueryOptions<LimitationProfile> = {}
) {
  return useQuery<LimitationProfile>(
    [TokensQueryKey.LimitationProfile, organizationId, id],
    () => fetchLimitationProfile(organizationId || '', id || ''),
    {
      onSuccess,
      onError,
      enabled
    }
  );
}
