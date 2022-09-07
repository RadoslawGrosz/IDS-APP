import { useQuery } from "react-query";
import { getDistributionPoints } from "../../api/DistributionPoints";
import {
  DistributionPointsFilters,
  DistributionPoint,
  DistributionPointsQueryKey,
} from "../../types";
import { AdditionalQueryOptions } from "./consts";

export const distributionPointsInitialFilters = {
  searchTerm: "",
};

export default function useDistributionPointsData(
  organizationId: string,
  filters: DistributionPointsFilters,
  {
    onSuccess,
    onError,
    enabled = !!organizationId,
  }: AdditionalQueryOptions<DistributionPoint[]> = {}
) {
  return useQuery<DistributionPoint[]>(
    [DistributionPointsQueryKey.DistributionPoints, organizationId, filters],
    () => getDistributionPoints(organizationId, filters),
    {
      onSuccess,
      onError,
      enabled,
    }
  );
}
