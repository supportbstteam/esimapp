import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { Images } from '../utils/Images'
import { moderateScale } from '../components/Matrix/Responsive'
import LottieView from "lottie-react-native";

const Loader = ({
    size = moderateScale(50)
}) => {
    return (
        <LottieView
            source={Images.LoadingAnimation}
            autoPlay
            loop
            style={[styles.animation, { width: size, height: size }]}
        />
    )
}

export default Loader

const styles = StyleSheet.create({
    animation: {
        alignSelf: "center"
    }
})