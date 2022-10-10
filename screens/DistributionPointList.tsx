import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import useDistributionPointsData from '../hooks/query/useDistributionPointsData';
import { useAuth } from '../hooks/useAuth';
import { Text, TouchableRipple, Card, Avatar, Button, Title, Paragraph, Badge } from 'react-native-paper';
import theme from '../theme';
import { StackHeaderProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

interface DistributionPointListProps {
  distributionPointId: string;
  setDistributionPointId: React.Dispatch<React.SetStateAction<string>>;
}

export default function DistributionPointList({ distributionPointId, setDistributionPointId }: DistributionPointListProps) {
  const { user } = useAuth();

  const distributionPointsQuery = useDistributionPointsData(user.organizationId || '', { searchTerm: '' });

  return (
    <View style={style.container}>
      <View style={{ flex: 0.2 }}>
        <Text variant='titleLarge' style={{ textAlign: 'center' }}>
          Wybierz punkt dystrybucyjny
        </Text>
        <View style={style.list}>
          {distributionPointsQuery.data?.map(distributionPoint => {
            const loadColor =
              distributionPoint.loadPercentage > 80 ? '#70A37F' : distributionPoint.loadPercentage > 20 ? '#FF6663' : '#F03A47';
            return (
              <View
                key={distributionPoint.id}
                style={[
                  style.distributionPointCard,
                  {
                    borderColor: distributionPointId === distributionPoint.id ? theme.colors.primary : 'transparent'
                  }
                ]}
              >
                <TouchableRipple onPress={() => setDistributionPointId(distributionPoint.id)}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 20
                    }}
                  >
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      {distributionPointId === distributionPoint.id && (
                        <Ionicons name='checkmark-sharp' size={24} color='#70A37F' style={{ marginRight: 10 }} />
                      )}
                      <Text>{distributionPoint.name}</Text>
                    </View>
                    <View>
                      <Badge
                        style={{
                          borderRadius: 4,
                          minWidth: 80,
                          backgroundColor: loadColor
                        }}
                        size={30}
                      >
                        {distributionPoint.loadPercentage ? `${distributionPoint.loadPercentage}%` : '0'}
                      </Badge>
                    </View>
                  </View>
                </TouchableRipple>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "space-between",
    padding: 24
  },
  list: {
    display: 'flex',
    // alignItems: "center",
    // justifyContent: "center",
    width: '100%',
    marginTop: 20
  },
  distributionPointCard: {
    // padding: 20,
    marginVertical: 10,
    borderRadius: 4,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: '#fff'
  }
});
