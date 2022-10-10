import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import useDistributionPointsData from '../hooks/query/useDistributionPointsData';
import { useAuth } from '../hooks/useAuth';
import { Text, TouchableRipple, Card, Avatar, Button, Title, Paragraph, Badge } from 'react-native-paper';
import theme from '../theme';
import { StackHeaderProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: StackHeaderProps) {
  const { user } = useAuth();
  const [distributionPointId, setDistributionPointId] = useState('');

  const distributionPointQuery = useDistributionPointsData(
    user.organizationId || '',
    { searchTerm: '' }
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
      <Button
        mode='contained'
        onPress={() =>
          navigation.navigate('Details', {
            distributionPointId,
            organizationId: user.organizationId
          })
        }
        style={style.button}
      >
        Załadunek
      </Button>
      <Button
        mode='contained'
        onPress={() =>
          navigation.navigate('Release', {
            distributionPointId,
            organizationId: user.organizationId
          })
        }
        style={style.button}
      >
        Pobieranie
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,

    padding: 24
  },
  button: {
    marginVertical: 20
  }
});
