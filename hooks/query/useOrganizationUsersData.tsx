import { fetchOrganizationUsers } from '@/api/OrganizationUsers';
import { OrganizationUser, OrganizationUserQueryKey } from '@/types';
import { useQuery } from 'react-query';
import { AdditionalQueryOptions } from './consts';

export default function useOrganizationUsersData(
  organizationId: string,
  { onSuccess, onError, enabled = !!organizationId }: AdditionalQueryOptions<OrganizationUser[]> = {}
) {
  return useQuery<OrganizationUser[]>(
    [OrganizationUserQueryKey.OrganizationUsers, organizationId],
    () => fetchOrganizationUsers(organizationId),
    {
      onSuccess,
      onError,
      enabled
    }
  );
}
