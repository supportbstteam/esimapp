import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import Container from '../../../components/Container';
import Header from '../../../customs/Headers/Header';
import { useAppDispatch, useAppSelector } from '../../../redux/Store';
import { clearOrderDetails, fetchOrderDetailsByUser } from '../../../redux/slice/OrderSlice';
import OrderCard from '../../../customs/Cards/OrderCard';
import Receipt from '../../../customs/Cards/Recipt';
import { moderateScale } from '../../../components/Matrix/Responsive';
import { globalStyle } from '../../../utils/GlobalStyle';
import Colors from '../../../utils/Color';
import Loader from '../../../customs/Loader';
import NoData from '../../../customs/Cards/NoData';
import NetworkWrapper from '../../../customs/NetworkWrapper';

const OrderDetails = () => {
  const route: any = useRoute();
  const dispatch = useAppDispatch();
  const { orderDetails, loading } = useAppSelector(state => state?.order);
  const fetchOrderDetailsById = async () => {
    await dispatch(clearOrderDetails());
    await dispatch(fetchOrderDetailsByUser(route?.params?.id));
  }

  useFocusEffect(useCallback(() => {
    fetchOrderDetailsById();
  }, []));

  if (loading)
    return (
      <View style={[globalStyle.center, { flex: 1, backgroundColor: Colors.white }]} >
        <Loader
          size={moderateScale(120)}
        />
      </View>
    )

  if (!orderDetails)
    return (
      <NetworkWrapper blockContent={true} >
        <Container>
          <Header title='Order Details' />
          <View style={[globalStyle.center, { flex: 1, backgroundColor: Colors.white }]} >
            <NoData
              text='No order details'
            />
          </View>
        </Container>
      </NetworkWrapper>
    )

  // console.log("-=-=---- order details -----", orderDetails);

  return (
    <Container>
      <Header title='Order Details' />
      <Receipt data={orderDetails} />
    </Container>
  )
}

export default OrderDetails

const styles = StyleSheet.create({})