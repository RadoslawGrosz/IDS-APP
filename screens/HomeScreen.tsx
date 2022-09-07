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
} from "react-native-paper";
import theme from "../theme";
import { StackHeaderProps } from "@react-navigation/stack";

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
      <Text variant="titleLarge">Wybierz punkt dystrybucyjny</Text>
      <View style={style.list}>
        {distributionPointQuery.data?.map((distributionPoint) => (
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
              <Text style={{ padding: 20 }}>{distributionPoint.name}</Text>
            </TouchableRipple>
          </View>

          // <Card>
          //   <Card.Content>
          //     <Title>Card title</Title>
          //     <Paragraph>Card content</Paragraph>
          //   </Card.Content>
          // </Card>
        ))}
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Details", { distributionPointId })}
      >
        Załadunek
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  list: {
    display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
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
