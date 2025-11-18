import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../CustomText'
import Colors from '../../utils/Color'
import CustomIcon from '../CustomIcon'
import { globalStyle } from '../../utils/GlobalStyle'
import { moderateScale } from '../../components/Matrix/Responsive'
import { useNavigation } from '@react-navigation/native'

const SearchNavigate = () => {
    const navigation: any = useNavigation();
    return (
        <Pressable onPress={() => {
            navigation.navigate('Search');
        }} style={styles.container} >
            <View style={{ flex: .7 }} >
                <CustomText size={16} text='Choose your destination' color={Colors.text_date} />
            </View>
            <View style={[globalStyle.center, { borderRadius: moderateScale(300), backgroundColor: Colors.primary, padding: moderateScale(10) }]} >
                <CustomIcon
                    type='AntDesign'
                    name='search1'
                    color='white'
                />
            </View>
        </Pressable>
    )
}

export default SearchNavigate

const styles = StyleSheet.create({
    container: {
        elevation: 3,
        borderRadius: moderateScale(50),
        alignSelf: "center",
        backgroundColor: "white",
        width: "100%",
        height: moderateScale(55),
        borderWidth: 1,
        borderColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: moderateScale(15),
        paddingRight: moderateScale(5)
        // paddingVertical:moderateScale(5)
    }
})