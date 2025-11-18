// components/NetworkWrapper.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import CustomText from "../customs/CustomText";
import { globalStyle } from "../utils/GlobalStyle";
import { Images } from "../utils/Images";
import LottieView from "lottie-react-native";
import { moderateScale } from "../components/Matrix/Responsive";

interface Props {
    children: React.ReactNode;
    blockContent?: boolean; // if true -> hide content when offline
}

const NetworkWrapper = ({ children, blockContent = false }: Props) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: any) => {
            setIsConnected(state.isConnected && state.isInternetReachable);
        });
        return () => unsubscribe();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {!isConnected && (
                <View style={[globalStyle.center, { flex: 1 }]} >
                    <LottieView
                        source={Images.Nodata}
                        autoPlay
                        loop
                        style={styles.animation}
                    />

                </View>
            )}

            {/* If blockContent = true → hide children when offline */}
            {(isConnected || !blockContent) && children}
        </View>
    );
};

export default NetworkWrapper;

const styles = StyleSheet.create({
    banner: {
        padding: 10,
        backgroundColor: "#FF3B30",
        margin: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    animation: {
        width: moderateScale(150),
        height: moderateScale(150),
    },
});
