import { StackHeaderProps } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable, TextInput, Button } from "react-native-paper";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductsOnDistributionPoint } from "../api/DistributionPoints";
import useDistributionPointData from "../hooks/query/useDistributionPointData";
import { useAuth } from "../hooks/useAuth";
import {
  ProductFilters,
  ProductOnDistributionPoint,
  DistributionPointsQueryKey,
} from "../types";
import { useCustomMutation } from "../hooks/useCustomMutation";
import { Transaction } from "../api/Storekeeper";
import { replenish } from "../api/Users";

export interface ProductStock {
  number: string;
  name: string;
  thresholdValue: number;
  upperLimit: number;
  amount: number;
  replenishmentAmount: number;
  isDefined: boolean;
}

export default function DetailsScreen({ route, navigation }: StackHeaderProps) {
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState<number>(0);
  const queryClient = useQueryClient();
  const [products, setProducts] = useState<ProductStock[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [filters, setFilters] = useState<ProductFilters>({
    searchTerm: "",
  });

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const { user } = useAuth();
  const { distributionPointId, organizationId } = route.params;

  const productsOnDistributionPointQuery = useQuery<
    ProductOnDistributionPoint[]
  >(
    [
      DistributionPointsQueryKey.ProductsOnDistributionPoint,
      distributionPointId,
      filters,
    ],
    () =>
      getProductsOnDistributionPoint(
        organizationId,
        distributionPointId,
        filters
      )
  );

  useEffect(() => {
    if (productsOnDistributionPointQuery.isSuccess)
      setProducts(
        productsOnDistributionPointQuery.data.map((product) => ({
          ...product,
          replenishmentAmount: 0,
        }))
      );
  }, [productsOnDistributionPointQuery.data]);

  const handleChangeReplenishmentAmount = (
    newValue: number,
    productNumber: string
  ) => {
    setProducts((prev) =>
      prev.map((row) =>
        row.number === productNumber
          ? { ...row, replenishmentAmount: newValue }
          : row
      )
    );
  };

  const replenishMutation = useCustomMutation(
    (data: Transaction[]) =>
      replenish(organizationId, distributionPointId, data),
    {
      onSuccessOverride: () => {
        queryClient.invalidateQueries([
          DistributionPointsQueryKey.ProductsOnDistributionPoint,
          distributionPointId,
        ]);
        queryClient.invalidateQueries([
          DistributionPointsQueryKey.DistributionPoints,
          organizationId,
        ]);
        queryClient.invalidateQueries([
          DistributionPointsQueryKey.DistributionPointDetails,
          distributionPointId,
        ]);
        queryClient.invalidateQueries([
          DistributionPointsQueryKey.ProductsOnDistributionPoint,
          distributionPointId,
          filters,
        ]);
        navigation.navigate("Home");
      },
    }
  );

  const handleReplenishment = () => {
    const assignedProducts = products.filter(
      (product) => product.isDefined && !!product.replenishmentAmount
    );

    const data: Transaction[] = assignedProducts.map((product) => ({
      productNumber: product.number,
      amount: product.replenishmentAmount,
    }));

    replenishMutation.mutate(data);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.8 }}>
        <DataTable style={{ position: "relative" }}>
          <DataTable.Header>
            <DataTable.Title>Sygnatura</DataTable.Title>
            <DataTable.Title>Nazwa</DataTable.Title>
            <DataTable.Title numeric>Załadunek</DataTable.Title>
            <DataTable.Title numeric>Stan</DataTable.Title>
            <DataTable.Title numeric>Max</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {products.map((product) => (
              <DataTable.Row key={product.number}>
                <DataTable.Cell>{product.number}</DataTable.Cell>
                <DataTable.Cell>{product.name}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <TextInput
                    // type="outlined"
                    dense
                    value={product.replenishmentAmount.toString()}
                    onChangeText={(text) =>
                      handleChangeReplenishmentAmount(
                        text.replace(/[^0-9]/g, ""),
                        product.number
                      )
                    }
                    style={{ textAlign: "center", width: 50 }}
                    // onBlur={(e) =>
                    //   !parseInt(e.target.value) &&
                    //   handleChangeReplenishmentAmount(0, product.number)
                    // }
                    keyboardType={
                      Platform.OS === "android" ? "numeric" : "number-pad"
                    }
                  />
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <View style={{ display: "flex", justifyContent: "center" }}>
                    <Text>{product.amount}</Text>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell numeric>{product.upperLimit}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
          {/* <DataTable.Pagination
            page={page}
            numberOfPages={3}
            onPageChange={(page) => setPage(page)}
            label="1-2 of 6"
            // optionsPerPage={optionsPerPage}
            // itemsPerPage={itemsPerPage}
            // setItemsPerPage={setItemsPerPage}
            // showFastPagination
            optionsLabel={"Rows per page"}
          /> */}
        </DataTable>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderTopColor: "black",
          borderTopWidth: 1,
          backgroundColor: "white",
          flex: 0.2,
        }}
      >
        <Button
          mode="contained"
          onPress={handleReplenishment}
          loading={replenishMutation.isLoading}
        >
          Załaduj
        </Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
