import React, { ReactNode } from 'react';
import { StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from './Matrix/Responsive';
import Colors from '../utils/Color';

interface ContainerProps {
    children: ReactNode;
    customStyle?: ViewStyle;
    status?: string;
    isTopPadding?: boolean;
}

const Container: React.FC<ContainerProps> = ({
    children,
    customStyle,
    status = Colors.white,
    //   isTopPadding = true,
}) => {
    return (
        <SafeAreaView
            style={[
                styles.container,
                customStyle,
            ]}
            edges={['top', 'left', 'right']} // include safe area edges
        >
            <StatusBar backgroundColor={status} barStyle="dark-content" />
            {children}
        </SafeAreaView>
    );
};

export default Container;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: moderateScale(10),
    },
});
