import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import useDistributionPointsData from "../hooks/query/useDistributionPointsData";
import { useAuth } from "../hooks/useAuth";
import {
  Text,
  TouchableRipple,
  Card,
  Avatar,
  Button,
  Title,
  Paragraph,
  Badge,
} from "react-native-paper";
import theme from "../theme";
import { StackHeaderProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }: StackHeaderProps) {
  const { user } = useAuth();
  const [distributionPointId, setDistributionPointId] = useState("");

  const distributionPointQuery = useDistributionPointsData(
    user.organizationId || "",
    { searchTerm: "" }
    // {
    //   onSuccess: (distributionPoints) => {
    //     distributionPoints.length &&
    //       searchParams.set("distributionPointId", distributionPoints[0].id);
    //     setSearchParams(searchParams);
    //   },
    // }
  );

  return (
    <View style={style.container}>
      <View style={{ flex: 0.2 }}>
        <Text variant="titleLarge" style={{ textAlign: "center" }}>
          Wybierz punkt dystrybucyjny
        </Text>
        <View style={style.list}>
          {distributionPointQuery.data?.map((distributionPoint) => {
            const loadColor =
              distributionPoint.loadPercentage > 80
                ? "#70A37F"
                : distributionPoint.loadPercentage > 20
                ? "#FF6663"
                : "#F03A47";
            return (
              <View
                key={distributionPoint.id}
                style={[
                  style.distributionPointCard,
                  {
                    // backgroundColor:
                    //   distributionPointId === distributionPoint.id
                    //     ? "blue"
                    //     : "white",
                    borderColor:
                      distributionPointId === distributionPoint.id
                        ? theme.colors.primary
                        : "transparent",
                  },
                ]}
              >
                <TouchableRipple
                  onPress={() => setDistributionPointId(distributionPoint.id)}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 20,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {distributionPointId === distributionPoint.id && (
                        <Ionicons
                          name="checkmark-sharp"
                          size={24}
                          color="#70A37F"
                          style={{ marginRight: 10 }}
                        />
                      )}
                      <Text>{distributionPoint.name}</Text>
                    </View>
                    <View>
                      <Badge
                        style={{
                          borderRadius: 4,
                          minWidth: 80,
                          backgroundColor: loadColor,
                        }}
                        size={30}
                      >
                        {distributionPoint.loadPercentage
                          ? `${distributionPoint.loadPercentage}%`
                          : "0"}
                      </Badge>
                    </View>
                  </View>
                </TouchableRipple>
              </View>

              // <Card>
              //   <Card.Content>
              //     <Title>Card title</Title>
              //     <Paragraph>Card content</Paragraph>
              //   </Card.Content>
              // </Card>
            );
          })}
        </View>
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
          onPress={() =>
            navigation.navigate("Details", {
              distributionPointId,
              organizationId: user.organizationId,
            })
          }
        >
          Lista produktów
        </Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "space-between",
    padding: 24,
  },
  list: {
    display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  distributionPointCard: {
    // padding: 20,
    marginVertical: 10,
    borderRadius: 4,
    borderColor: "red",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
});
