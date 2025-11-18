import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Container from '../../components/Container'
import CustomText from '../../customs/CustomText'
import NetworkWrapper from '../../customs/NetworkWrapper'
import { useAppDispatch, useAppSelector } from '../../redux/Store'
import { fetchSimsByUser } from '../../redux/slice/ESimSlice'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../../customs/Loader'
import { moderateScale } from '../../components/Matrix/Responsive'
import EsimCard from '../../customs/Cards/EsimCard'
import { globalStyle } from '../../utils/GlobalStyle'
import NoData from '../../customs/Cards/NoData'

const Data = () => {
  const dispatch = useAppDispatch();

  const { esims, loading } = useAppSelector(state => state?.esims);
  const fetchData = async () => {
    try {
      await dispatch(fetchSimsByUser());
    }
    catch (err) {
      console.error("Error in the fetchData", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [dispatch])
  );

  if (loading)
    return (
      <Container>
        <CustomText text='E-Sims' weight='700' size={22} customStyle={{ marginTop: moderateScale(10) }} />
        <View style={[globalStyle.center, { flex: 1 }]} >
          <Loader size={moderateScale(100)} />
        </View>
      </Container>
    )

  return (
    <NetworkWrapper blockContent={false} >
      <Container>
        <CustomText text='E-Sims' weight='700' size={22} customStyle={{ marginTop: moderateScale(10) }} />
        {esims && esims.length > 0 ? (
          <View style={{ marginTop: moderateScale(20) }}>
            {/* <CustomText text="E-Sims" weight="700" size={24} /> */}
            <FlatList
              data={esims}
              contentContainerStyle={{
                gap: moderateScale(10),
                marginTop: moderateScale(10),
                alignSelf: "center",
                paddingBottom: moderateScale(140)
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item: any) => item?.id?.toString()}
              renderItem={({ item }: any) => {
                const status = item?.order?.status?.toLowerCase();
                return <EsimCard item={item} />;
              }}

            />
          </View>
        ):<NoData text='No E-SIM! Order Now' />}
      </Container>
    </NetworkWrapper>
  )
}

export default Data

const styles = StyleSheet.create({})