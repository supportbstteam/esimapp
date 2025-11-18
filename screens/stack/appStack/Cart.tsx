import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../../components/Container'
import CustomText from '../../../customs/CustomText'
import Header from '../../../customs/Headers/Header'
import { useAppDispatch, useAppSelector } from '../../../redux/Store'
import CartCard from '../../../customs/Cards/CartCard'
import { moderateScale } from '../../../components/Matrix/Responsive'
import CustomButton from '../../../customs/CustomButton'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Images } from '../../../utils/Images'
import FastImage from 'react-native-fast-image';
import { globalStyle } from '../../../utils/GlobalStyle'
import Colors from '../../../utils/Color'
import { useNavigation } from '@react-navigation/native'
import { fetchCart } from '../../../redux/slice/CartSlice'
import EmptyCard from '../../../customs/Cards/EmptyCard'

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const { cart } = useAppSelector(state => state?.cart);

  // console.log("----- cart in the cart.tsx -----",cart);
  return (
    <Container>
      <View style={{ flex: .9 }} >
        <Header title="Cart" />
        {
          cart?.items && cart?.items.length > 0 ? <FlatList
            data={cart?.items}
            // style={{flex:.9}}
            keyExtractor={item => item?.id}
            contentContainerStyle={{
              gap: 10,
              alignSelf: "center",
              marginTop: moderateScale(10),
              paddingBottom: moderateScale(50),
            }}
            renderItem={({ item }) => {
              return (
                <CartCard item={item} onDelete={async () => {
                  await dispatch(fetchCart());
                }} />
              )
            }}
          /> : (
            <View style={[globalStyle.center, { flex: 1 }]} >
              <EmptyCard text={"No Cart Available"} />
              {/* <CustomText customStyle={{ textAlign: "center" }} text='No Cart available' color={Colors.lightGray} weight="500" size={16} /> */}
            </View>
          )
        }
      </View>

      {/* <CustomButton
        title='Checkout'
      /> */}

      {
        cart?.items && cart?.items.length > 0 && <View style={{ flex: .1 }} >
          <TouchableOpacity activeOpacity={.7} onPress={() => {
            navigation.navigate("Checkout");
          }} style={[styles.btn]} >
            <CustomText text='Checkout' color={Colors.white} weight="600" size={18} />
            <FastImage
              style={styles.image}
              source={require('../../../assets/gif/cart.gif')} // ✅ local gif
              resizeMode={FastImage.resizeMode.contain} // contain | cover | stretch | center
            />

          </TouchableOpacity>
        </View>
      }


      {/* <View style={{ marginBottom: moderateScale(20) }} /> */}
    </Container>
  )
}

export default Cart

const styles = StyleSheet.create({
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(5)
  }
})