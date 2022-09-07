import { fetchLimitationProfiles } from '@/api/Tokens';
import { LimitationProfile, TokensQueryKey } from '@/types';
import { useQuery } from 'react-query';
import { AdditionalQueryOptions } from './consts';

export default function useLimitationProfilesData(
  organizationId: string,
  { onSuccess, onError, enabled = !!organizationId }: AdditionalQueryOptions<LimitationProfile[]> = {}
) {
  return useQuery<LimitationProfile[]>(TokensQueryKey.LimitationProfiles, () => fetchLimitationProfiles(organizationId || ''), {
    onSuccess,
    onError,
    enabled
  });
}
