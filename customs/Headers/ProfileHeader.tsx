import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Store'
import CustomText from '../CustomText';
import { moderateScale } from '../../components/Matrix/Responsive';
import CustomIcon from '../CustomIcon';
import { globalStyle } from '../../utils/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/Color';
import { logout } from '../../redux/slice/UserSlice';

const ProfileHeader = () => {
    const dispatch = useAppDispatch();
    const navigation: any = useNavigation();
    const { user } = useAppSelector(state => state?.user);
    const { cart } = useAppSelector(state => state?.cart);

    // console.log("--- user in the custom header ----", cart);
    return (
        <View style={[styles.container, globalStyle.betweenCenter, { marginBottom: moderateScale(5) }]} >
            <CustomText weight="600" size={18} text={`Hello! ${user?.firstName + " " + user?.lastName}`} />
            <Pressable onPress={() => navigation.openDrawer()}>
                <CustomIcon
                    type='Feather'
                    name='menu'
                    color='#000'
                    size={28}
                />
            </Pressable>


        </View>
    )
}

export default ProfileHeader

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