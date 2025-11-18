import React from "react";
import { View, StyleSheet } from "react-native";
import { moderateScale } from "../components/Matrix/Responsive";
import CustomText from "../customs/CustomText";

const Stamp = ({ status, colors, size = 85, textSize = 10 }: any) => {
  return (
    <View
      style={[
        styles.statusContainer,
        {
          width: moderateScale(size),
          height: moderateScale(size),
          borderRadius: moderateScale(size),
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.statusSub,
          {
            width: moderateScale(size * 0.75),
            height: moderateScale(size * 0.75),
            borderRadius: moderateScale(size * 0.75),
            borderColor: colors.bg,
          },
        ]}
      >
        <CustomText
          text={(status || "").toUpperCase()}
          weight="800"
          size={textSize}
          color={colors.text}
        />
      </View>
    </View>
  );
};

export default Stamp;

const styles = StyleSheet.create({
  statusContainer: {
    position: "absolute",
    bottom: -moderateScale(25),
    right: -moderateScale(5),

    borderWidth: moderateScale(4),
    overflow: "hidden",

    transform: [{ rotate: "-8deg" }],

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,

    justifyContent: "center",
    alignItems: "center",
  },

  statusSub: {
    backgroundColor: "#fff",
    borderWidth: moderateScale(3),

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
