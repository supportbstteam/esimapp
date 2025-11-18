import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { moderateScale } from '../components/Matrix/Responsive'

const CustomLottie = ({ Image, size = moderateScale(100) }: any) => {
    return (
        <LottieView
            source={Image}
            autoPlay
            loop
            style={[{ width: size, height: size, borderRadius: size, borderWidth: 1, borderColor: "red" }]}
        />
    )
}

export default CustomLottie

const styles = StyleSheet.create({
})