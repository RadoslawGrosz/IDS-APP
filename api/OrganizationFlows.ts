import { client } from './';
import qs from 'qs';
import _ from 'lodash';
import { Flow } from '../types';

export interface FetchOrganizationFlowsResponse {
  data: Flow[];
  total: number;
}

export async function fetchOrganizationFlows(organizationId: string, params: FetchOrganizationFlowsParams) {
  const response = await client.get<FetchOrganizationFlowsResponse>(`/organizations/${organizationId}/flows`, {
    params,
    paramsSerializer: params => {
      const filteredParams = _.omitBy(params, _.isNull);
      return qs.stringify(filteredParams, { arrayFormat: 'repeat' });
    }
  });

  return response.data;
}

export interface FetchOrganizationFlowsParams {
  limit: number;
  distributionPointId?: string | null;
  productId?: string | null;
  tokenId?: string | null;
  distributionPointTimestampFrom?: string | null;
  distributionPointTimestampTo?: string | null;
  operationType?: string | null;
  userId?: string | null;
}
