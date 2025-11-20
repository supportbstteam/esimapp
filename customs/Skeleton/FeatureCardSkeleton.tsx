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

const FeatureCardSkeleton = ({
  width = (screenWidth * .7)
}) => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, []);

  const shimmer = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, { width: width }]}>
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Flag */}
        <Animated.View style={[styles.flag, shimmer]} />

        {/* Country Name */}
        <Animated.View style={[styles.countryName, shimmer]} />

        {/* Price */}
        <Animated.View style={[styles.price, shimmer]} />
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        {/* Starter Label */}
        <Animated.View style={[styles.starterText, shimmer]} />

        {/* Data & Validity */}
        <Animated.View style={[styles.dataBox, shimmer]} />

        {/* Buy Button */}
        <Animated.View style={[styles.buyBtn, shimmer]} />
      </View>
    </View>
  );
};

export default FeatureCardSkeleton;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.7,
    height: screenHeight * 0.18,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    borderWidth: .5,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
    elevation: 3,
    marginHorizontal: moderateScale(5),
    marginBottom: moderateScale(5),
    justifyContent: "space-between",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(10),
  },

  flag: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(50),
    backgroundColor: "#e5e5e5",
  },

  countryName: {
    height: moderateScale(18),
    width: moderateScale(100),
    borderRadius: 6,
    backgroundColor: "#e6e6e6",
    marginLeft: moderateScale(5),
    flex: 0.4,
  },

  price: {
    height: moderateScale(16),
    width: moderateScale(60),
    borderRadius: 6,
    backgroundColor: "#dcdcdc",
    flex: 0.3,
    marginLeft: moderateScale(10),
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },

  starterText: {
    height: moderateScale(14),
    width: moderateScale(60),
    backgroundColor: "#e4e4e4",
    borderRadius: 6,
  },

  dataBox: {
    height: moderateScale(16),
    width: moderateScale(80),
    backgroundColor: "#dadada",
    borderRadius: 6,
  },

  buyBtn: {
    height: moderateScale(28),
    width: moderateScale(70),
    backgroundColor: "#cfcfcf",
    borderRadius: moderateScale(6),
  },
});
