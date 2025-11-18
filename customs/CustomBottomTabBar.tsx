import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import CustomText from "./CustomText";
import CustomIcon from "./CustomIcon";
import { moderateScale } from "../components/Matrix/Responsive";
import Colors from "../utils/Color";

const CustomBottomTabBar = ({ state, descriptors, navigation }: any) => {
  const scaleValues = React.useRef(
    state.routes.map((_: any, index: number) =>
      useSharedValue(state.index === index ? 1 : 1)
    )
  ).current;

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === index;
        const params = descriptors[route.key]?.route?.params || {};

        // icon data from route params
        const iconType = params.iconType;
        const iconName = params.iconName;

        React.useEffect(() => {
          scaleValues[index].value = withTiming(isFocused ? 1.25 : 1, {
            duration: 400,
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
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={[
              styles.tabItem,
              {
                backgroundColor: isFocused ? Colors.primary : undefined,
                borderRadius: isFocused ? moderateScale(20) : undefined,
                flex: isFocused ? 1 : 0.5,
              },
            ]}
          >
            <Animated.View style={animatedStyle}>
              {iconType && iconName && (
                <CustomIcon
                  size={22}
                  type={iconType}
                  color={isFocused ? "#fff" : "#000"}
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
                  color: Colors.secondary,
                  marginLeft: moderateScale(3),
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: moderateScale(60),
    backgroundColor: "#fff",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    elevation: 6,
    borderTopWidth: 1,
    borderColor: Colors.secondary,
    width: "95%",
    alignSelf: "center",
    borderRadius: moderateScale(30),
    position: "absolute",
    bottom: moderateScale(20),
    overflow: "hidden",
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: moderateScale(5),
  },
});
