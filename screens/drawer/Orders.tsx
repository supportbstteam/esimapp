import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import Container from '../../components/Container'
import { useAppDispatch, useAppSelector } from '../../redux/Store'
import { fetchOrdersByUser } from '../../redux/slice/OrderSlice'
import { useFocusEffect } from '@react-navigation/native'
import EmptyCard from '../../customs/Cards/EmptyCard'
import { moderateScale } from '../../components/Matrix/Responsive'
import CustomText from '../../customs/CustomText'
import Colors from '../../utils/Color'
import { globalStyle } from '../../utils/GlobalStyle'
import Header from '../../customs/Headers/Header'
import OrderCard from '../../customs/Cards/OrderCard'
import Loader from '../../customs/Loader'
import NetworkWrapper from '../../customs/NetworkWrapper'

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector(state => state?.order);
  const fetchOrdering = async () => {
    await dispatch(fetchOrdersByUser());
  }


  console.log('====================================');
  console.log(orders);
  console.log('====================================');


  useFocusEffect(useCallback(() => {
    fetchOrdering();
  }, [dispatch]))

  if (loading)
    return (
      <View style={[globalStyle.center, { flex: 1, backgroundColor: Colors.white }]} >
        <Loader
          size={moderateScale(120)}
        />
      </View>
    )

  return (
    <NetworkWrapper blockContent={true} >
      <Container>
        <Header
          title='Orders'
        />
        {
          orders && orders?.length > 0 ? (
            <FlatList
              data={orders}
              keyExtractor={({ item }) => item?.id}
              contentContainerStyle={{
                rowGap: moderateScale(10),
                paddingBottom: moderateScale(40)
              }}
              renderItem={({ item }: any) => {
                return (
                  <OrderCard
                    item={item}
                  />
                )
              }}
            />
          ) : (
            <View style={[globalStyle.center, { flex: 1 }]} >
              <EmptyCard
                text='No Orders yet'
              />
              <CustomText text='No Orders Yet' color={Colors.lightGray} />
            </View>
          )
        }

      </Container>
    </NetworkWrapper>
  )
}

export default Orders

const styles = StyleSheet.create({})