import { StackHeaderProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import useDistributionPointData from "../hooks/query/useDistributionPointData";
import { useAuth } from "../hooks/useAuth";

export default function DetailsScreen({ route }: StackHeaderProps) {
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const { user } = useAuth();
  const { distributionPointId } = route.params;

  const distributionPointQuery = useDistributionPointData(
    user.organizationId,
    distributionPointId
  );

  console.log(distributionPointQuery.data);

  return (
    <View style={style.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Sygnatura</DataTable.Title>
          <DataTable.Title>Nazwa</DataTable.Title>
        </DataTable.Header>

        {distributionPointQuery.data.products.map((product) => (
          <DataTable.Row key={product.id}>
            <DataTable.Cell>{product.number}</DataTable.Cell>
            <DataTable.Cell>{product.name}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={"Rows per page"}
        />
      </DataTable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
