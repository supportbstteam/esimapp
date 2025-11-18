import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../../components/Matrix/Responsive'

const FooterMargin = () => {
    return (
        <View
            style={{ marginBottom: moderateScale(120) }}
        />
    )
}

export default FooterMargin

const styles = StyleSheet.create({})