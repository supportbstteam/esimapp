import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../CustomText'
import Colors from '../../utils/Color'
import { globalStyle } from '../../utils/GlobalStyle'
import { moderateScale } from '../../components/Matrix/Responsive'

const SubHeader = ({ title, onPress, isMore = true }: any) => {
    return (
        <View style={[globalStyle.betweenCenter, { marginTop: moderateScale(10) }]} >
            <CustomText text={title} weight="700" size={18} />
            {
                isMore && <Pressable onPress={onPress} >
                    <CustomText text='View all' color={Colors.lightGray} />
                </Pressable>
            }

        </View>
    )
}

export default SubHeader

const styles = StyleSheet.create({})