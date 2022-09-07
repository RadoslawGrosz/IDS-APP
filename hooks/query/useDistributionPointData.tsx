import { useQuery, useQueryClient } from "react-query";
import { getDistributionPoint } from "../../api/DistributionPoints";
import { DistributionPointsQueryKey, DistributionPoint } from "../../types";
import { AdditionalQueryOptions } from "./consts";
import { distributionPointsInitialFilters } from "./useDistributionPointsData";

export const getDistributionPointQueryKey = (distributionPointId: string) => [
  DistributionPointsQueryKey.DistributionPointDetails,
  distributionPointId,
];

export default function useDistributionPointData(
  organizationId: string,
  distributionPointId: string,
  {
    onSuccess,
    onError,
    enabled = !!(organizationId && distributionPointId),
  }: AdditionalQueryOptions<DistributionPoint> = {}
) {
  const queryClient = useQueryClient();
  return useQuery<DistributionPoint>(
    [DistributionPointsQueryKey.DistributionPointDetails, distributionPointId],
    () => getDistributionPoint(organizationId, distributionPointId),
    {
      initialData: () => {
        const distributionPoint = queryClient
          .getQueryData<DistributionPoint[]>([
            DistributionPointsQueryKey.DistributionPoints,
            organizationId,
            distributionPointsInitialFilters,
          ])
          ?.find(
            (distributionPoint) => distributionPoint.id === distributionPointId
          );

        if (distributionPoint) return distributionPoint;
        return undefined;
      },
      onSuccess,
      onError,
      enabled,
    }
  );
}
