import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Button, StatusBar } from 'react-native';
import DistributionPointList from '../DistributionPointList';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from 'react-query';
import { TokensQueryKey } from '../../types';
import { getUserTokenSummaries } from '../../api/OrganizationUsers';
import { Badge, Text, TouchableRipple } from 'react-native-paper';
import theme from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ReleaseFirstStepProps {
  distributionPointId: string;
  setDistributionPointId: React.Dispatch<React.SetStateAction<string>>;
  tokenId: string;
  setTokenId: React.Dispatch<React.SetStateAction<string>>;
  buttons: JSX.Element;
}

export default function ReleaseFirstStep(props: ReleaseFirstStepProps) {
  const { distributionPointId, setDistributionPointId, tokenId, setTokenId, buttons } = props;
  const { user } = useAuth();

  const tokenSummariesQuery = useQuery(TokensQueryKey.Summaries, () => getUserTokenSummaries(user.organizationId || '', user.id));

  console.log(tokenSummariesQuery.data);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 0.8 }}>
          <DistributionPointList distributionPointId={distributionPointId} setDistributionPointId={setDistributionPointId} />
          <View style={{ height: 200 }}>
            <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
          </View>
        </View>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderTopColor: 'black',
            borderTopWidth: 1,
            backgroundColor: 'white',
            flex: 0.2
          }}
        >
          {buttons}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // minHeight: '100%'
    // paddingTop: StatusBar.currentHeight
    // alignItems: "center",
    // justifyContent: "space-between",
    // padding: 24
  },
  list: {
    display: 'flex',
    // alignItems: "center",
    // justifyContent: "center",
    width: '100%'
    // marginTop: 20
  },
  distributionPointCard: {
    // padding: 20,
    marginVertical: 10,
    borderRadius: 4,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
