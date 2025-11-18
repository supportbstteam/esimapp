import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import FastImage, { ImageStyle as FastImageStyle } from 'react-native-fast-image';
import { globalStyle } from '../../utils/GlobalStyle';
import { Images } from '../../utils/Images';
import { moderateScale } from '../../components/Matrix/Responsive';
import LottieView from "lottie-react-native";
import CustomText from '../CustomText';
import Colors from '../../utils/Color';

interface EmptyCardProps {
    text: string
}

const NotFound: React.FC<EmptyCardProps> = ({ text = "" }) => {
    return (
        <View style={[globalStyle.center, { flex: 1 }]} >
            <LottieView
                source={Images.NotFound}
                autoPlay
                loop
                style={styles.animation}
            />
            {
                text && <CustomText text={text} color={Colors.lightGray} weight="500" size={16} customStyle={{ marginTop: moderateScale(10) }} />
            }
        </View>
    );
};

export default NotFound;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    animation: {
        width: moderateScale(150),
        height: moderateScale(150),
    },
});
