import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../redux/Store'
import CustomText from '../CustomText';
import { moderateScale } from '../../components/Matrix/Responsive';
import CustomIcon from '../CustomIcon';
import { globalStyle } from '../../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/Color';
import { Images } from '../../utils/Images';

const UserHeader = () => {
    const navigation: any = useNavigation();
    const { user } = useAppSelector(state => state?.user);
    const { cart } = useAppSelector(state => state?.cart);

    // console.log("--- user in the custom header ----", cart);
    return (
        <View style={[styles.container, globalStyle.betweenCenter, { marginBottom: moderateScale(5) }]} >
            <View style={[globalStyle.row]} >
                <Images.AeroLogo
                    width={moderateScale(50)}
                    height={moderateScale(50)}
                    style={{ alignSelf: "center" }}
                />
                <CustomText customStyle={{marginLeft:moderateScale(10)}} weight="600" size={18} text={`Hello! ${user?.firstName + " " + user?.lastName}`} />
            </View>
            <Pressable onPress={() => {
                navigation.navigate('Cart');
            }} >
                {
                    cart?.items && cart?.items.length > 0 && <Text style={[globalStyle.center, styles.cartItemLength]} >
                        {cart?.items.length}
                    </Text>
                }

                <CustomIcon
                    type='Feather'
                    name='shopping-cart'
                />
            </Pressable>

        </View>
    )
}

export default UserHeader

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // backgroundColor: "red",
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(5),

    },
    cartItemLength: {
        color: "black",
        fontSize: 12,
        fontWeight: "700",
        backgroundColor: Colors.primary,
        padding: moderateScale(2),
        textAlign: "center",
        borderRadius: moderateScale(100),
        width: moderateScale(20),
        height: moderateScale(20),
        position: "absolute",
        bottom: moderateScale(14),
        left: moderateScale(10),
        zIndex: 99
    }
})