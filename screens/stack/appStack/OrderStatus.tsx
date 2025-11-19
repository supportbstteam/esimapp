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
import { clearCart, fetchCart } from '../../../redux/slice/CartSlice';
import CustomButton from '../../../customs/CustomButton';
import Colors from '../../../utils/Color';
import { fetchUserDetails } from '../../../redux/slice/UserSlice';

const OrderStatus = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const props = route?.params as any;

  console.log("-=-=--=-=- props?.order -=-=-=--=-=-=-=-", props?.order)

  // ✅ Hook usage (auto navigates to BottomTabs after 10s)
  useBackHandler(async () => {
    await dispatch(clearCart());
    await dispatch(fetchCart());
    await dispatch(fetchUserDetails());
    navigation.navigate('AppDrawer' as never);
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
        return `Your order has been completed ${props?.order?.orderCode}`;
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
        <CustomText customStyle={{ textAlign: "center" }} weight="600" size={18} text={renderStatusText()} />
        <CustomButton
          title='Go to Home'
          bg={Colors.white}
          textColor={Colors.black}
          customStyle={{
            borderWidth: 1,
            borderColor: Colors.primary,
            marginTop:moderateScale(10),
            width:"50%"
          }}
          onPress={async() => {
            await dispatch(fetchCart());
            navigation.navigate("AppDrawer")
          }}
        />
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
