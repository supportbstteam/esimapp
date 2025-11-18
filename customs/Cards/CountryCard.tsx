import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, screenWidth, verticalScale } from '../../components/Matrix/Responsive';
import { globalStyle } from '../../utils/GlobalStyle';
import CustomText from '../CustomText';
import Colors from '../../utils/Color';
import { useNavigation } from '@react-navigation/native';
import FlagContainer from '../../components/FlagContainer';

const CountryCard = ({ item, width = screenWidth * .7 }: any) => {
    const navigation: any = useNavigation();
    // console.log("----- item in the country item -----", item);
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("CountryPlans", {
                id: item?.id
            })
        }} activeOpacity={.7} style={[globalStyle.row, styles.container, { width: width }]} >
            <FlagContainer
                country={item}
            />
            <View style={{ flex: .4, marginLeft: moderateScale(5) }} ><CustomText weight="600" size={18} text={item?.name} /></View>
            <View style={{ flex: .6 }} >
                <CustomText text='Starting from' weight="500" size={12} color={Colors.gray_font} />
                <CustomText weight="700" text={`${item?.currency === "USD" ? "$" : item?.currency} ${parseFloat(item?.price).toFixed(2)}`} size={14} color={Colors.primary} />
            </View>
        </TouchableOpacity>
    )
}

export default CountryCard

const styles = StyleSheet.create({
    container: {
        width: screenWidth * .7,
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        height: verticalScale(80),
        // backgroundColor:"red",
        borderRadius: moderateScale(10),
        elevation: 3,
        backgroundColor: "white",
        // margin: moderateScale,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    flag: {
        height: moderateScale(60),
        width: moderateScale(60),
        borderRadius: moderateScale(150),
        backgroundColor: Colors.activeBlur,
        marginRight: moderateScale(5),
        // flex: .05
    }
})