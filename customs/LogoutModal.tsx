import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomModal from './CustomModal'
import CustomText from './CustomText'
import CustomButton from './CustomButton'
import { useAppDispatch } from '../redux/Store'
import { logout } from '../redux/slice/UserSlice'
import { globalStyle } from '../utils/GlobalStyle'
import { moderateScale, screenHeight } from '../components/Matrix/Responsive'
import Colors from '../utils/Color'

const LogoutModal = ({
    visible,
    setVisible
}: any) => {


    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        await dispatch(logout());
        setVisible(false);
    }

    return (
        <CustomModal
            visible={visible}
            onDismiss={() => {
                setVisible(false)
            }}
            iscenter={true}
        >
            <View style={[{ height: screenHeight * .15 }]} >
                <CustomText text='Log Out' customStyle={{ textAlign: "center" }} weight="700" size={22} color={Colors.secondary} />
                <CustomText weight="600" customStyle={{ textAlign: "center" }} text='Are you sure, You want to log out?' />
                <View style={[globalStyle.betweenCenter, { marginTop: moderateScale(10) }]} >
                    <CustomButton
                        title='No'
                        onPress={() => {
                            setVisible(false)
                        }}
                        customStyle={{
                            width: "45%"
                        }}
                        bg={Colors.secondary}
                    />

                    <CustomButton
                        title='Yes'
                        onPress={handleLogout}
                        customStyle={{
                            width: "45%"
                        }}
                    />
                </View>
            </View>
        </CustomModal>
    )
}

export default LogoutModal

const styles = StyleSheet.create({})