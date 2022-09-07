import {
  DistributionPoint,
  DistributionPointStoreKeeper,
  DistributionPointsFilters,
  ProductFilters,
  ProductOnDistributionPoint,
  ProductToAssignToDistributionPoint,
  StockFilters,
} from "../types";
import { client } from "./index";

export interface CreateDistributionPointRequest {
  name: string;
  organizationId: string;
  products: ProductToAssignToDistributionPoint[];
  storekeeperIds: string[];
}

export interface CreateDistributionPointResponse {
  id: string;
}

export interface UpdateDistributionPointReqeust {
  name: string;
}

export interface UpdateProductsOnDistributionPointRequest {
  productId: string;
  name: string;
  number: string;
  upperLimit: number;
  thresholdValue: number;
}

export const createDistributionPoint = async (
  request: CreateDistributionPointRequest
) =>
  (
    await client.post<CreateDistributionPointResponse>(
      `organizations/${request.organizationId}/distributionPoints`,
      request
    )
  ).data;

export const getDistributionPoints = async (
  organizationId: string,
  params: DistributionPointsFilters
) =>
  (
    await client.get<DistributionPoint[]>(
      `organizations/${organizationId}/distributionPoints`,
      { params }
    )
  ).data;

export const getDistributionPoint = async (
  organizationId: string,
  id: string
) =>
  (
    await client.get<DistributionPoint>(
      `organizations/${organizationId}/distributionPoints/${id}`
    )
  ).data;

export const updateDistributionPoint = async (
  organizationId: string,
  id: string,
  request: UpdateDistributionPointReqeust
) => {
  const response = await client.put(
    `organizations/${organizationId}/distributionPoints/${id}`,
    { ...request, id },
    {
      headers: { organizationId },
    }
  );
  return response.data;
};

export const removeDistributionPoint = async (
  organizationId: string,
  id: string
) => {
  const response = await client.delete(
    `organizations/${organizationId}/distributionPoints/${id}`,
    {
      headers: { organizationId },
    }
  );
  return response.data;
};

export const updateProductsOnDistributionPoint = async (
  organizationId: string,
  id: string,
  request: UpdateProductsOnDistributionPointRequest[]
) => {
  const response = await client.post(
    `organizations/${organizationId}/distributionPoints/${id}/products`,
    request,
    {
      headers: { organizationId },
    }
  );
  return response.data;
};

export const removeProductOnDistributionPoint = async (
  organizationId: string,
  id: string,
  request: ProductOnDistributionPoint[]
) => {
  const response = await client.delete(
    `organizations/${organizationId}/distributionPoints/${id}/products`,
    {
      headers: { organizationId },
      data: request,
    }
  );
  return response.data;
};

export const getProductsOnDistributionPoint = async (
  organizationId: string,
  id: string,
  searchTerm: ProductFilters
) => {
  const response = await client.get(
    `organizations/${organizationId}/distributionPoints/${id}/products/search`,
    {
      params: searchTerm,
    }
  );
  return response.data;
};

export const getStocks = async (
  organizationId: string,
  id: string,
  params: StockFilters
) => {
  const response = await client.get(
    `organizations/${organizationId}/distributionPoints/${id}/stocks/search`,
    { params }
  );
  return response.data;
};

export const getStoreKeepers = async (organizationId: string, id: string) => {
  const response = await client.get<DistributionPointStoreKeeper[]>(
    `organizations/${organizationId}/distributionPoints/${id}/storekeepers`
  );
  return response.data;
};

export interface UpdateStoreKeepersRequest {
  usersIds: string[];
}

export const updateStoreKeepers = async (
  organizationId: string,
  id: string,
  request: UpdateStoreKeepersRequest
) => {
  const response = await client.post(
    `organizations/${organizationId}/distributionPoints/${id}/storekeepers`,
    request
  );
  return response;
};
