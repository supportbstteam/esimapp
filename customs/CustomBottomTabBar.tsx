import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import { moderateScale } from "../components/Matrix/Responsive";
import Colors from "../utils/Color";
import { BlurView } from "@react-native-community/blur";

const CustomBottomTabBar = ({ state, descriptors, navigation }: any) => {
  const scaleValues = React.useRef(
    state.routes.map((_: any, index: number) =>
      useSharedValue(state.index === index ? 1 : 1)
    )
  ).current;

  return (
    <View style={styles.wrapper}>
      {/* GLASS BACKGROUND */}
      {Platform.OS === "ios" ? (
        <BlurView blurType="light" blurAmount={25} style={styles.container}>
          {renderTabs()}
        </BlurView>
      ) : (
        <View style={[styles.container, styles.androidGlass]}>
          {renderTabs()}
        </View>
      )}
    </View>
  );

  function renderTabs() {
    return state.routes.map((route: any, index: number) => {
      const { options } = descriptors[route.key];
      const label = options.tabBarLabel ?? options.title ?? route.name;
      const isFocused = state.index === index;

      const params = descriptors[route.key]?.route?.params || {};
      const iconType = params.iconType;
      const iconName = params.iconName;

      React.useEffect(() => {
        scaleValues[index].value = withTiming(isFocused ? 1.25 : 1, {
          duration: 350,
        });
      }, [isFocused]);

      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scaleValues[index].value }],
      }));

      const onPress = () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
          canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      return (
        <TouchableOpacity
          key={index}
          onPress={onPress}
          style={[
            styles.tabItem,
            {
              backgroundColor: isFocused ? "rgba(255,255,255,.75)" : "transparent",
              // backgroundColor: "red",
              borderRadius: moderateScale(20),
              flex: isFocused ? 1 : 0.5,
            },
          ]}
          activeOpacity={0.8}
        >
          <Animated.View style={animatedStyle}>
            {iconType && iconName && (
              <CustomIcon
                size={22}
                type={iconType}
                color={isFocused ? Colors.primary : "#333"}
                name={iconName}
              />
            )}
          </Animated.View>

          {isFocused && (
            <CustomText
              text={` ${label}`}
              size={12}
              weight="700"
              customStyle={{
                fontFamily: "Nexa-Heavy",
                color: Colors.primary,
                marginLeft: moderateScale(3),
              }}
            />
          )}
        </TouchableOpacity>
      );
    });
  }
};

export default CustomBottomTabBar;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: moderateScale(20),
    width: "100%",
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
    height: moderateScale(60),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    width: "95%",
    borderRadius: moderateScale(30),

    // iOS FLOATING EFFECT
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 8,
  },

  // ANDROID glass simulation
  androidGlass: {
    backgroundColor: "rgba(255,255,255,0.75)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(6),
    // paddingHorizontal: moderateScale(10),
    marginHorizontal: moderateScale(4),

  },
});
