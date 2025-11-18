import { StyleSheet, View } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '../../components/Matrix/Responsive'
import { Images } from '../../utils/Images'

const BwComponents = () => {
    return (
        <View
            style={{
                width: screenWidth,
                height: screenHeight * 0.45, // or 1 for full screen
                alignSelf: "center",
            }}
        >
            <Images.MonoTour
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
            />
        </View>
    )
}

export default BwComponents

const styles = StyleSheet.create({})
