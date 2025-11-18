import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../CustomText';
import Colors from '../../utils/Color';
import { moderateScale } from '../../components/Matrix/Responsive';

const TopUpSummaryCard = ({ topup }: any) => {
    const currency = topup?.currency === "USD" ? "$" : topup?.currency;
    const price = Number(topup?.price || 0).toFixed(2);

    return (
        <View style={styles.card}>
            {/* Title */}
            <CustomText
                text={topup?.title}
                size={20}
                weight="700"
                customStyle={{ marginBottom: moderateScale(8) }}
            />

            {/* Validity */}
            <View style={styles.row}>
                <CustomText text="Validity" color={Colors.gray} />
                <CustomText text={`${topup?.validityDays} Days`} weight="600" />
            </View>

            {/* Price */}
            <View style={styles.row}>
                <CustomText text="Price" color={Colors.gray} />
                <CustomText text={`${currency}${price}`} weight="600" />
            </View>

            {/* Plan Code */}
            {/* <View style={styles.row}>
                <CustomText text="Plan Code" color={Colors.gray} />
                <CustomText text={topup?.name} weight="600" customStyle={{ flex: 1, textAlign: "right" }} />
            </View> */}
        </View>
    );
};

export default TopUpSummaryCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        padding: moderateScale(15),
        borderRadius: moderateScale(12),
        marginTop: moderateScale(0),
        borderWidth: 1,
        borderColor: "#f0f0f0",
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: moderateScale(10),
    },
});
