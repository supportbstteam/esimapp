import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import CustomText from '../CustomText';
import Colors from '../../utils/Color';
import { moderateScale, screenWidth } from '../../components/Matrix/Responsive';
import FlagContainer from '../../components/FlagContainer';
import { globalStyle } from '../../utils/GlobalStyle';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const EsimCard = ({ item }: any) => {
  const navigation: any = useNavigation();
  const usedGB = 0; // if you have usage, replace
  const totalGB = item?.dataAmount || 1;

  const percentage = (usedGB / totalGB) * 100;

  // console.log("------ esim card -----", item);

  return (
    <Pressable onPress={() => {
      navigation.navigate("SimDetails", {
        id: item?.id
      })
    }} style={styles.card}>
      {/* TOP ROW */}
      <View style={[globalStyle.row, { alignItems: 'center' }]}>
        <FlagContainer country={item?.country} />

        <View style={{ marginLeft: moderateScale(10), flex: 1 }}>
          <CustomText size={16} weight="700" text={item?.country?.name} />
          <CustomText size={13} color={Colors.gray} text={item?.productName} />
        </View>

        {/* STATUS PILL */}
        <View style={[styles.statusPill, {
          backgroundColor: item?.order?.status !== "COMPLETED" ? "#ff000020" : "#FFF5D6"
        }]}>
          <CustomText size={11} weight="600" color={item?.order?.status !== "COMPLETED" ? "#ff0000" : '#b38a00'} text={item?.order?.status !== "COMPLETED" ? "FAILED" : item?.isActive ? "ACTIVE" : "INACTIVE"} />
        </View>
      </View>

      {/* ICCID */}
      <View style={{ marginTop: moderateScale(15) }}>
        <CustomText size={12} color={Colors.gray} text={"ICCID No."} />
        <CustomText
          size={15}
          weight="600"
          text={item?.iccid}
        />
      </View>

      {/* DATA USAGE */}
      <View style={{ marginTop: moderateScale(15) }}>
        <CustomText size={12} color={Colors.gray} text="Data Usage" />

        <View style={styles.usageRow}>
          <CustomText size={13} text={`${usedGB} GB / ${totalGB} GB`} />
        </View>

        {/* PROGRESS BAR */}
        <View style={[styles.progressTrack, {
          backgroundColor: item?.order?.status !== "COMPLETED" ? "#ff0000" : "#e3e3e3"
        }]}>
          <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: item?.order?.status !== "COMPLETED" ? "#ff0000" : Colors.primary }]} />
        </View>
      </View>

      {/* DATES */}
      <View style={[globalStyle.row, { marginTop: moderateScale(15) }]}>
        <View style={{ flex: 1 }}>
          <CustomText size={11} color={Colors.gray} text={`Start: ${item?.startDate || "N/A"}`} />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <CustomText size={11} color={Colors.gray} text={`End: ${item?.endDate || "N/A"}`} />
        </View>
      </View>

      {/* BOTTOM BUTTON (ONLY RECHARGE) */}

      {
        item?.order?.status === "COMPLETED" && <Pressable onPress={() => {
          navigation.navigate("TopUp", {
            country: {
              id: item?.country?.id,
              iso2: item?.country?.isoCode,
              iso3: item?.country?.iso3Code,
              name: item?.country?.name
            },
            sim: item?.id,
            iccid: item?.iccid
          })
        }} style={styles.rechargeBtn}>
          <CustomText size={15} weight="600" color={Colors.white} text="Recharge" />
        </Pressable>
      }


    </Pressable>
  );
};

export default EsimCard;

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.9,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    elevation: 3,
    marginVertical: moderateScale(8),
    borderWidth: 1,
    borderColor: '#eee',
  },

  statusPill: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(3),
    backgroundColor: '#FFF5D6',
    borderRadius: moderateScale(20),
  },

  usageRow: {
    marginTop: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  progressTrack: {
    width: '100%',
    height: 6,
    borderRadius: 10,
    backgroundColor: '#e3e3e3',
    marginTop: 5,
  },

  progressFill: {
    height: 6,
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },

  rechargeBtn: {
    marginTop: moderateScale(20),
    backgroundColor: Colors.primary,
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
