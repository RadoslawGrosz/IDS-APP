import { fetchOrganizationProductGroups } from '@/api/OrganizationProductGroups';
import { OrganizationProductGroup, OrganizationProductGroupQueryKey } from '@/types';
import { useQuery } from 'react-query';
import { AdditionalQueryOptions } from './consts';

export default function useOrganizationProductGroupsData(
  organizationId: string,
  { onSuccess, onError, enabled = !!organizationId }: AdditionalQueryOptions<OrganizationProductGroup[]> = {}
) {
  return useQuery<OrganizationProductGroup[]>(
    [OrganizationProductGroupQueryKey.OrganizationProductGroups],
    () => fetchOrganizationProductGroups(organizationId),
    {
      onSuccess,
      onError,
      enabled
    }
  );
}
