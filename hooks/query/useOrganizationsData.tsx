import { FetchOrganizationsResponse, fetchOrganizations } from '@/api/Organizations';
import { OrganizationsQueryKey } from '@/types';
import { useQuery } from 'react-query';
import { AdditionalQueryOptions } from './consts';

export default function useOrganizationsData({
  onSuccess,
  onError,
  enabled = true
}: AdditionalQueryOptions<FetchOrganizationsResponse> = {}) {
  return useQuery<FetchOrganizationsResponse>(OrganizationsQueryKey.Organizations, () => fetchOrganizations(0, 10), {
    onSuccess,
    onError,
    enabled
  });
}
