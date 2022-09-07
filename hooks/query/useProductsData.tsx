import { FetchProductsParams, GetProductsResponse, fetchProducts } from '@/api/Products';
import { ProductQueryKey } from '@/types';

import { useQuery } from 'react-query';
import { AdditionalQueryOptions } from './consts';

export default function useProductsData(
  params: FetchProductsParams = {},
  { onSuccess, onError, enabled = true }: AdditionalQueryOptions<GetProductsResponse> = {}
) {
  return useQuery<GetProductsResponse>([ProductQueryKey.products, params], () => fetchProducts(params), {
    onSuccess,
    onError,
    enabled
  });
}
