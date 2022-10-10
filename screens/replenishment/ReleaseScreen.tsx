import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Card, Avatar, Button, Title, Paragraph, Badge, IconButton } from 'react-native-paper';
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import useDistributionPointsData from '../../hooks/query/useDistributionPointsData';
import { useAuth } from '../../hooks/useAuth';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import { useQueryClient, useQuery } from 'react-query';
import { getProductsWithCapabilities, ReleaseProducts, releaseProducts } from '../../api/Storekeeper';
import { useCustomMutation } from '../../hooks/useCustomMutation';
import { ProductWithCapabilities, DistributionPointsQueryKey } from '../../types';
import ReleaseFirstStep from './ReleaseFirstStep';

export interface ProductRelease extends ProductWithCapabilities {
  releaseAmount: number;
  remainingCapabilities: number;
  showCollectiveIcon: boolean;
}

export default function ReleaseScreen({ navigation }: StackHeaderProps) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [distributionPointId, setDistributionPointId] = useState<string>('');
  const [tokenId, setTokenId] = useState<string>('');
  const [step, setStep] = useState(0);
  const queryClient = useQueryClient();

  const [products, setProducts] = useState<ProductRelease[]>([]);
  const [chosenTags, setChosenTags] = useState<string[]>([]);

  const productsWithCapabilitiesQuery = useQuery<ProductWithCapabilities[]>(
    [DistributionPointsQueryKey.ProductWithCapabilities, distributionPointId, tokenId],
    () => getProductsWithCapabilities(user.organizationId, distributionPointId, tokenId)
  );

  useEffect(() => {
    if (productsWithCapabilitiesQuery.isSuccess)
      setProducts(
        productsWithCapabilitiesQuery.data.map(product => ({
          ...product,
          releaseAmount: '',
          remainingCapabilities: product.capabilitiesAmount,
          showCollectiveIcon: false
        }))
      );
    else setProducts([]);
  }, [productsWithCapabilitiesQuery.data]);

  const releaseMutation = useCustomMutation<ReleaseProducts>(
    data => releaseProducts(user.organizationId, distributionPointId, tokenId, data),
    {
      onSuccessOverride: () => {
        queryClient.invalidateQueries([DistributionPointsQueryKey.ProductsOnDistributionPoint, distributionPointId]);
        queryClient.invalidateQueries([DistributionPointsQueryKey.DistributionPoints, user.organizationId]);
        queryClient.invalidateQueries([DistributionPointsQueryKey.DistributionPointDetails, distributionPointId]);
        queryClient.invalidateQueries([DistributionPointsQueryKey.ProductWithCapabilities, distributionPointId, tokenId]);
        setDistributionPointId('');
        setTokenId('');
        setChosenTags([]);
        clearReleaseAmount();
        setStep(0);
      }
    }
  );

  const handleRelease = () => {
    const chosenProducts = products.filter(product => product.releaseAmount > 0);

    const productsToRelease = chosenProducts.map(product => ({
      productNumber: product.number,
      amount: product.releaseAmount
    }));

    const data: ReleaseProducts = {
      productsToRelease,
      tags: chosenTags
    };

    releaseMutation.mutate(data);
  };

  const someProductChosen = useMemo(() => products.some(product => product.releaseAmount > 0), [products]);

  const clearReleaseAmount = () => {
    setProducts(prev => {
      const temp = prev.map(product => ({ ...product, releaseAmount: 0 }));
      return temp;
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <ReleaseFirstStep
            distributionPointId={distributionPointId}
            setDistributionPointId={setDistributionPointId}
            tokenId={tokenId}
            setTokenId={setTokenId}
            buttons={
              <Button mode='contained' onPress={() => setStep(1)} disabled={!distributionPointId || tokenId.length !== 21}>
                Załaduj
              </Button>
            }
          />
        );
      // case 1:
      //   return (
      //     <ReleaseSecondStep
      //       organizationId={user.organizationId}
      //       distributionPointId={distributionPointId}
      //       tokenId={tokenId}
      //       chosenTags={chosenTags}
      //       setChosenTags={setChosenTags}
      //       products={products}
      //       setProducts={setProducts}
      //       buttons={
      //         <>
      //           <IconButton onClick={() => setStep(0)}>
      //             <ArrowBackIcon />
      //           </IconButton>
      //           <Button variant='contained' onClick={() => setStep(2)} disabled={!someProductChosen} sx={{ width: '60%', ml: 1 }}>
      //             {t('consumer.dashboard.secondStep.button')}
      //           </Button>
      //           <IconButton sx={{ visibility: 'hidden' }}>
      //             <ArrowBackIcon />
      //           </IconButton>
      //         </>
      //       }
      //     />
      //   );
      // case 2:
      //   return (
      //     <ReleaseThirdStep
      //       organizationId={user.organizationId}
      //       distributionPointId={distributionPointId}
      //       tokenId={tokenId}
      //       chosenTags={chosenTags}
      //       setChosenTags={setChosenTags}
      //       products={products.filter(product => product.releaseAmount > 0)}
      //       buttons={
      //         <>
      //           <IconButton onClick={() => setStep(1)}>
      //             <ArrowBackIcon />
      //           </IconButton>
      //           <Button variant='contained' onClick={handleRelease} sx={{ flexBasis: '60%', ml: 1 }}>
      //             {t('consumer.dashboard.thirdStep.button')}
      //           </Button>
      //           <IconButton sx={{ visibility: 'hidden' }}>
      //             <ArrowBackIcon />
      //           </IconButton>
      //         </>
      //       }
      //     />
      //   );
      default:
        return null;
    }
  };

  return renderStep();
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
