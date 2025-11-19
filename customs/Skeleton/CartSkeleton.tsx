import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { moderateScale, screenWidth } from "../../components/Matrix/Responsive";

const Shimmer = ({ width, height, radius, style }: any) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.5, 1], [0.3, 1, 0.3]);
    return { opacity };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: "#e3e3e3",
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

const CartCardSkeleton = () => {
  return (
    <View style={styles.container}>

      {/* Trash Icon */}
      <View style={styles.trashIcon}>
        <Shimmer height={20} width={20} radius={20} />
      </View>

      {/* Country Row */}
      <View style={styles.row}>
        <Shimmer height={40} width={40} radius={10} />
        <Shimmer height={20} width={120} radius={6} style={{ marginLeft: 10 }} />
      </View>

      {/* Plan Info */}
      <View style={{ marginTop: 15, gap: 12 }}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.infoRow}>
            <Shimmer height={16} width={100} radius={6} />
            <Shimmer height={16} width={130} radius={6} />
          </View>
        ))}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Quantity Section */}
      <View
        style={[
          styles.row,
          { marginTop: moderateScale(15), justifyContent: "space-between" },
        ]}
      >
        <Shimmer height={20} width={90} radius={6} />

        <View style={styles.qtyRow}>
          <Shimmer height={30} width={30} radius={50} />
          <Shimmer
            height={20}
            width={20}
            radius={4}
            style={{ marginHorizontal: moderateScale(10) }}
          />
          <Shimmer height={30} width={30} radius={50} />
        </View>
      </View>

    </View>
  );
};

export default CartCardSkeleton;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    backgroundColor: "#fff",
    elevation: 2,
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
    alignSelf: "center",
  },
  trashIcon: {
    position: "absolute",
    top: moderateScale(10),
    right: moderateScale(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e4e4e4",
    marginVertical: moderateScale(15),
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
