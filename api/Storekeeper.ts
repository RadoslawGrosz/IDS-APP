import { client } from ".";
import { DistributionPoint, ProductWithCapabilities } from "../types";

export interface Transaction {
  productNumber: string;
  amount: number;
}

interface StorekeeperProducts {
  id: string;
  name: string;
  number: string;
  upperLimit: number;
  thresholdValue: number;
  amount: number;
  isDefined: boolean;
  isDepleting: boolean;
  isCriticalCase: boolean;
  loadPercentage: number;
}

export interface StorekeeperOrganization {
  id: string;
  name: string;
  distributionPoints: DistributionPoint[];
}

export interface ReleaseProducts {
  productsToRelease: Transaction[];
  tags: string[];
}

export const fetchStorekeeperOrganizations = async () =>
  (
    await client.get<StorekeeperOrganization[]>(
      `vendingAssistant/myOrganizations`
    )
  ).data;

export const getProductsWithCapabilities = async (
  organizationId: string,
  distributionPointId: string,
  tokenId: string
) => {
  const response = await client.get<ProductWithCapabilities[]>(
    `organizations/${organizationId}/distributionPoints/${distributionPointId}/tokens/${tokenId}`
  );
  return response.data;
};

export const replenish = async (
  organizationId: string,
  distributionPointId: string,
  data: Transaction[]
) => {
  console.log(client);

  client.post(
    `organizations/${organizationId}/distributionPoints/${distributionPointId}/replenishments`,
    data
  );
};

export const releaseProducts = async (
  organizationId: string,
  distributionPointId: string,
  tokenId: string,
  data: ReleaseProducts
) =>
  (
    await client.post(
      `organizations/${organizationId}/distributionPoints/${distributionPointId}/tokens/${tokenId}`,
      data
    )
  ).data;
