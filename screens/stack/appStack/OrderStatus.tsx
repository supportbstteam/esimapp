import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { moderateScale } from '../../../components/Matrix/Responsive';
import Container from '../../../components/Container';
import { globalStyle } from '../../../utils/GlobalStyle';
import { Images } from '../../../utils/Images';
import CustomText from '../../../customs/CustomText';
import { useBackHandler } from '../../../utils/BackHandling';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../../redux/Store';
import { fetchCart } from '../../../redux/slice/CartSlice';

const OrderStatus = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const props = route?.params as any;

  // ✅ Hook usage (auto navigates to BottomTabs after 10s)
  useBackHandler(async () => {
    await dispatch(fetchCart());
    navigation.navigate('HomeBlank' as never);
  });

  const renderStatusImage = () => {
    switch (props?.order?.status) {
      case 'COMPLETED':
        return Images.Sucess;
      case 'SUCCESS':
        return Images.Sucess;
      case 'FAILED':
        return Images.Failed;
      default:
        return Images.Half;
    }
  };

  const renderStatusText = () => {
    switch (props?.order?.status) {
      case 'COMPLETED':
        return 'Your order has been completed';
      case 'FAILED':
        return 'Your order has failed';
      default:
        return 'Your order has been partially completed';
    }
  };

  return (
    <Container>
      <View style={[globalStyle.center, { alignSelf: 'center', flex: 1 }]}>
        <FastImage
          style={styles.video}
          source={renderStatusImage()}
          resizeMode={FastImage.resizeMode.contain}
        />
        <CustomText weight="600" size={18} text={renderStatusText()} />
      </View>
    </Container>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  video: {
    width: moderateScale(100),
    height: moderateScale(100),
    backgroundColor: '#fff',
    borderRadius: moderateScale(100),
  },
});
