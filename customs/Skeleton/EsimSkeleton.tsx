import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import {
  moderateScale,
  screenWidth,
} from "../../components/Matrix/Responsive";
import Colors from "../../utils/Color";

const EsimCardSkeleton = () => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, []);

  const shimmer = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.card}>
      {/* TOP ROW */}
      <View style={styles.topRow}>
        {/* Flag */}
        <Animated.View style={[styles.flag, shimmer]} />

        {/* Country Name + Plan Name */}
        <View style={{ flex: 1, marginLeft: moderateScale(10) }}>
          <Animated.View style={[styles.line16, shimmer]} />
          <Animated.View style={[styles.line12, shimmer, { marginTop: 4 }]} />
        </View>

        {/* Status Pill */}
        <Animated.View style={[styles.statusPill, shimmer]} />
      </View>

      {/* ICCID BLOCK */}
      <View style={{ marginTop: moderateScale(15) }}>
        <Animated.View style={[styles.line12, shimmer, { width: 80 }]} />
        <Animated.View
          style={[styles.line16, shimmer, { marginTop: 6, width: 150 }]}
        />
      </View>

      {/* DATA USAGE */}
      <View style={{ marginTop: moderateScale(15) }}>
        <Animated.View style={[styles.line12, shimmer, { width: 100 }]} />

        <View style={styles.usageRow}>
          <Animated.View
            style={[styles.line12, shimmer, { width: 120, marginTop: 5 }]}
          />
        </View>

        {/* PROGRESS BAR */}
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, shimmer, { width: "40%" }]}
          />
        </View>
      </View>

      {/* DATES */}
      <View style={[styles.dateRow]}>
        <Animated.View style={[styles.line12, shimmer, { width: 120 }]} />
        <Animated.View style={[styles.line12, shimmer, { width: 120 }]} />
      </View>

      {/* RECHARGE BUTTON */}
      <Animated.View style={[styles.rechargeBtn, shimmer]} />
    </View>
  );
};

export default EsimCardSkeleton;

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.9,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    elevation: 3,
    marginVertical: moderateScale(8),
    borderWidth: 1,
    borderColor: "#eee",
    alignSelf: "center",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  flag: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(50),
    backgroundColor: "#e5e5e5",
  },

  line16: {
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
  },

  line12: {
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
  },

  statusPill: {
    width: moderateScale(60),
    height: moderateScale(20),
    backgroundColor: "#eee",
    borderRadius: 20,
  },

  usageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(5),
  },

  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    marginTop: moderateScale(6),
  },

  progressFill: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(15),
  },

  rechargeBtn: {
    width: "100%",
    height: moderateScale(42),
    backgroundColor: "#dcdcdc",
    borderRadius: moderateScale(8),
    marginTop: moderateScale(20),
  },
});
