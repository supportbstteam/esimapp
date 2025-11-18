import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyle } from '../../utils/GlobalStyle'
import { moderateScale, screenHeight, screenWidth, verticalScale } from '../../components/Matrix/Responsive';
import Colors from '../../utils/Color';
import CustomText from '../CustomText';
import CustomButton from '../CustomButton';
import { handleAddToCart } from '../../utils/GlobalFunction';
import { useAppDispatch } from '../../redux/Store';
import { useNavigation } from '@react-navigation/native';
import FlagContainer from '../../components/FlagContainer';

const FeatureCard = ({ item }: any) => {
    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();
    // console.log("----- item in feature plans ----", item);
    return (
        <TouchableOpacity activeOpacity={.7} onPress={() => {
            navigation.navigate("CountryPlans", {
                id: item?.country?.id
            })
        }} style={styles.container} >
            <View style={[globalStyle.between, {
                flex: .7, paddingTop: moderateScale(10)
            }]} >
                <View style={[globalStyle.flex]} >
                    <FlagContainer country={item?.country} />
                    <CustomText weight="700" size={17} text={item?.country?.name} />

                </View>
                <View>
                    <CustomText weight="600" text={`${item?.currency === "USD" ? "$" : item?.currency} ${item?.price}`} />
                </View>
            </View>
            <View style={[globalStyle.between, { flex: .3, marginBottom: moderateScale(10) }]} >
                <View>
                    <CustomText text='Starter' color={Colors.gray_font} />
                    {
                        item?.data && <CustomText color={Colors.primary} weight="700" text={`${item?.data}GB/ ${item?.validityDays}days`} />
                    }

                </View>
                <Pressable onPress={() => {
                    handleAddToCart(item, dispatch);
                }} style={[globalStyle.center, { backgroundColor: Colors.primary, paddingHorizontal: moderateScale(10), borderRadius: moderateScale(5) }]} >
                    <CustomText text='Buy Now' color='white' weight="600" />
                </Pressable>

            </View>
        </TouchableOpacity>
    )
}

export default FeatureCard

const styles = StyleSheet.create({
    container: {
        width: screenWidth * .7,
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        height: screenHeight * .18,
        // backgroundColor:"red",
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
        elevation: 3,
        marginHorizontal: moderateScale(5),
        marginBottom: moderateScale(5)
    },
    flag: {
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(150),
        backgroundColor: Colors.activeBlur,
        marginRight: moderateScale(5),
        // flex: .05
    }
})