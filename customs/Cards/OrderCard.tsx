import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import { moderateScale, screenHeight } from '../../components/Matrix/Responsive';
import moment from "moment";
import Colors from '../../utils/Color';
import { useNavigation } from '@react-navigation/native';
import Stamp from '../../components/Stamp';

const STATUS_COLORS: any = {
  completed: {
    bg: "#1eaf4b",
    border: "#0d802f",
    text: "#1eaf4b",
  },
  partial: {
    bg: "#f0ad4e",
    border: "#c37d21",
    text: "#f0ad4e",
  },
  failed: {
    bg: "#d9534f",
    border: "#b52b27",
    text: "#d9534f",
  },
  processing: {
    bg: "#6c757d",
    border: "#4b4f52",
    text: "#6c757d",
  },
  default: {
    bg: "#5bc0de",
    border: "#337f94",
    text: "#5bc0de",
  },
};

const OrderCard = ({ item }: any) => {

  const navigation: any = useNavigation();
  const colors =
    STATUS_COLORS[item?.status?.toLowerCase()] || STATUS_COLORS.default;

  return (
    <Pressable onPress={() => {
      navigation.navigate("OrderDetails", {
        id: item?.id
      })
    }} style={styles.container}>

      <View style={styles.rowBetween}>
        {/* LEFT: ORDER DETAILS */}
        <View>
          <CustomText text={item?.code || item?.orderCode} weight="700" size={20} />

          <CustomText
            text={moment(item?.createAt).format("MMM Do YYYY")}
            weight="500"
            color={Colors.gray}
            size={14}
            customStyle={{ marginTop: moderateScale(4) }}
          />
        </View>

        {/* RIGHT: AMOUNT */}
        <View style={{ alignItems: "flex-end" }}>
          <CustomText
            text={`$ ${item?.totalAmount}`}
            weight="800"
            size={20}
          />
          <CustomText
            text="Total Amount"
            weight="500"
            size={10}
            color={Colors.gray}
          />
        </View>
      </View>

      {/* STAMP STATUS */}
      <Stamp status={item?.status} colors={colors} size={90} textSize={9} />

    </Pressable>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    overflow: "hidden",
    minHeight: screenHeight * 0.16,
    marginBottom: moderateScale(15),

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusContainer: {
    width: moderateScale(85),
    height: moderateScale(85),
    borderRadius: moderateScale(100),

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
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(80),

    backgroundColor: "#fff",
    borderWidth: moderateScale(3),

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 4,
    elevation: 5,
  },
});
