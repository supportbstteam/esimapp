import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAppSelector } from '../../redux/Store'
import CustomLottie from '../CustomLottie';
import { Images } from '../../utils/Images';
import { moderateScale, screenHeight } from '../../components/Matrix/Responsive';
import CustomText from '../CustomText';
import { globalStyle } from '../../utils/GlobalStyle';
import Colors from '../../utils/Color';

const UserDetailHeader = () => {
    const { user, loading } = useAppSelector(state => state?.user);
    return (
        <View style={[globalStyle.center, styles.container]} >
            <CustomLottie
                Image={Images.User}
            />
            <View style={[{ alignItems: "center" }]} >
                <CustomText size={24} weight="700" text={`${user?.firstName} ${user?.lastName}`} />
                <CustomText size={16} weight="500" color={Colors.lightGray} text={user?.email || ""} />
            </View>
        </View>
    )
}

export default UserDetailHeader

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: screenHeight * .2,
        // backgroundColor: "red",
        marginVertical: moderateScale(10),
        marginBottom:moderateScale(20)
    }
})