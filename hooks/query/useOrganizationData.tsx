import { fetchOrganization } from '@/api/Organizations';
import { Organization, OrganizationsQueryKey } from '@/types';
import { useQuery } from 'react-query';
import { AdditionalQueryOptions } from './consts';

export default function useOrganizationData(
  organizationId: string,
  { onSuccess, onError, enabled = !!organizationId }: AdditionalQueryOptions<Organization> = {}
) {
  return useQuery<Organization>([OrganizationsQueryKey.Organization, organizationId], () => fetchOrganization(organizationId), {
    onSuccess,
    onError,
    enabled
  });
}
