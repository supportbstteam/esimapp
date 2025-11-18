import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { globalStyle } from '../../utils/GlobalStyle';
import { moderateScale } from '../../components/Matrix/Responsive';
import CustomIcon from '../CustomIcon';
import CustomText from '../CustomText';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// ✅ Define the navigation stack param list (replace "RootStackParamList" with your actual name)
type RootStackParamList = {
    Home: undefined;
    [key: string]: object | undefined; // generic fallback
};

// ✅ Define props type for Header
interface HeaderProps {
    title?: string;
    isBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = 'Home', isBack = true }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={[styles.container, globalStyle.betweenCenter]}>
            <View style={[globalStyle.row, { alignItems: 'center' }]}>
                {isBack && (
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={[globalStyle.center, { marginTop: moderateScale(2) }]}
                    >
                        <CustomIcon type="Feather" name="chevron-left" size={30} />
                    </Pressable>
                )}
                <CustomText size={28} weight="600" text={title} />
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: moderateScale(10),
    },
});
