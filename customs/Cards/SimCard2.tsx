import { StyleSheet, View } from 'react-native'
import React from 'react'
import FlagContainer from '../../components/FlagContainer'
import CustomText from '../CustomText'
import Colors from '../../utils/Color'
import { moderateScale } from '../../components/Matrix/Responsive'
import { globalStyle } from '../../utils/GlobalStyle'
import moment from 'moment'

const SimCard2 = ({ item }: any) => {

    const country = item?.country;
    const price = Number(item?.price || 0).toFixed(2);
    const currency = item?.currency === "USD" ? "$" : item?.currency;

    return (
        <View style={styles.card}>
            {/* -------- Title -------- */}
            <CustomText
                text="Your Last Recharge Plan"
                size={16}
                weight="700"
                customStyle={{ marginBottom: moderateScale(10) }}
            />

            {/* -------- Country Row -------- */}
            <View style={[globalStyle.row, { alignItems: 'center' }]}>
                <FlagContainer country={country} />

                <CustomText
                    text={country?.name}
                    size={17}
                    weight="700"
                    customStyle={{ marginLeft: moderateScale(10) }}
                />
            </View>

            {/* -------- Info Rows -------- */}
            <View style={{ marginTop: moderateScale(12) }}>
                <View style={styles.infoRow}>
                    <CustomText text="Data Allowance" color={Colors.gray} />
                    <CustomText text={`${item?.dataAmount} GB`} weight="600" />
                </View>

                <View style={styles.infoRow}>
                    <CustomText text="Validity" color={Colors.gray} />
                    <CustomText text={`${item?.validityDays} Days`} weight="600" />
                </View>

                <View style={styles.infoRow}>
                    <CustomText text="Starting Date" color={Colors.gray} />
                    <CustomText
                        text={moment(item?.startDate).format("MMM DD")}
                        weight="600"
                    />
                </View>

                <View style={styles.infoRow}>
                    <CustomText text="Expire Date" color={Colors.gray} />
                    <CustomText
                        text={moment(item?.endDate).format("MMM DD")}
                        weight="600"
                    />
                </View>
            </View>

            {/* -------- Divider -------- */}
            <View style={styles.divider} />

            {/* -------- Total Amount -------- */}
            <View style={styles.infoRow}>
                <CustomText text="Total" weight="700" size={15} />
                <CustomText
                    text={`${currency}${price}`}
                    weight="700"
                    size={15}
                />
            </View>
        </View>
    )
}

export default SimCard2

const styles = StyleSheet.create({
    card: {
        width: "100%",
        // backgroundColor: "orange",
        backgroundColor: "#f7f7f7",
        borderRadius: moderateScale(15),
        padding: moderateScale(15),
        marginVertical: moderateScale(10),
        borderWidth: 1,
        borderColor: "#e3e3e3",
        elevation: 3,
        alignSelf:"center"
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(10),
    },
    divider: {
        height: 1,
        backgroundColor: "#eaeaea",
        marginVertical: moderateScale(15),
    }
});
