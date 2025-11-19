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
  screenWidth,
  verticalScale,
} from "../../components/Matrix/Responsive";
import Colors from "../../utils/Color";

const CountryCardSkeleton = ({ width = screenWidth * 0.7 }) => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800 }),
      -1,
      true
    );
  }, []);

  const shimmer = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, { width }]}>

      {/* Flag */}
      <Animated.View
        style={[styles.flag, shimmer]}
      />

      {/* Country Name */}
      <View style={{ flex: 0.4, marginLeft: moderateScale(10) }}>
        <Animated.View
          style={[styles.title, shimmer]}
        />
      </View>

      {/* Price Section */}
      {/* <View style={{ flex: 0.6 }}>
        <Animated.View style={[styles.smallText, shimmer]} />
        <Animated.View style={[styles.price, shimmer]} />
      </View> */}

    </View>
  );
};

export default CountryCardSkeleton;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(80),
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: "#fff",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.primary,
    alignItems: "center",
    elevation: 2,
    alignSelf: "center",
  },

  flag: {
    height: moderateScale(55),
    width: moderateScale(55),
    borderRadius: moderateScale(130),
    backgroundColor: "#e5e5e5",
  },

  title: {
    height: moderateScale(18),
    width: moderateScale(120),
    borderRadius: 6,
    backgroundColor: "#e8e8e8",
  },

  smallText: {
    height: moderateScale(12),
    width: moderateScale(80),
    borderRadius: 4,
    backgroundColor: "#e8e8e8",
    marginBottom: moderateScale(5),
  },

  price: {
    height: moderateScale(16),
    width: moderateScale(60),
    borderRadius: 6,
    backgroundColor: "#dcdcdc",
  },
});
