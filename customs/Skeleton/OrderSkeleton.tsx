import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import {
    moderateScale,
    screenHeight,
    screenWidth,
} from "../../components/Matrix/Responsive";
import Colors from "../../utils/Color";

const OrderCardSkeleton = () => {
    const opacity = useSharedValue(0.4);

    useEffect(() => {
        opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
    }, []);

    const shimmer = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <View style={styles.container}>
            {/* Top row */}
            <View style={styles.rowBetween}>
                {/* Left side */}
                <View>
                    <Animated.View
                        style={[styles.line20, { width: 130, marginBottom: 8 }, shimmer]}
                    />
                    <Animated.View
                        style={[styles.line14, { width: 90 }, shimmer]}
                    />
                </View>

                {/* Right side */}
                <View style={{ alignItems: "flex-end" }}>
                    <Animated.View
                        style={[styles.line20, { width: 80, marginBottom: 5 }, shimmer]}
                    />
                    <Animated.View
                        style={[styles.line10, { width: 70 }, shimmer]}
                    />
                </View>
            </View>

            {/* Stamp Skeleton */}
            <Animated.View style={[styles.stamp, shimmer]} />
        </View>
    );
};

export default OrderCardSkeleton;

const styles = StyleSheet.create({
    container: {
        width: "95%",
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: moderateScale(15),
        borderRadius: moderateScale(12),
        minHeight: screenHeight * 0.16,
        marginBottom: moderateScale(15),
        elevation: 5,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",
        justifyContent: "space-between",
        overflow: "hidden"
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    line20: {
        height: 20,
        backgroundColor: "#e0e0e0",
        borderRadius: 6,
    },

    line14: {
        height: 14,
        backgroundColor: "#e0e0e0",
        borderRadius: 6,
    },

    line10: {
        height: 10,
        backgroundColor: "#ddd",
        borderRadius: 6,
    },

    stamp: {
        width: moderateScale(90),
        height: moderateScale(90),
        borderRadius: moderateScale(100),
        backgroundColor: "#e5e5e5",
        position: "absolute",
        bottom: -moderateScale(20),
        right: -moderateScale(10),
    },
});
