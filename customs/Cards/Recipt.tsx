import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "../CustomText";
import { moderateScale } from "../../components/Matrix/Responsive";
import moment from "moment";
import Stamp from "../../components/Stamp";

/* STATUS COLORS */
const STATUS_COLORS: any = {
    completed: { bg: "#1eaf4b", border: "#0d802f", text: "#1eaf4b" },
    partial: { bg: "#f0ad4e", border: "#c37d21", text: "#f0ad4e" },
    failed: { bg: "#d9534f", border: "#b52b27", text: "#d9534f" },
    processing: { bg: "#6c757d", border: "#4b4f52", text: "#6c757d" },
    default: { bg: "#5bc0de", border: "#337f94", text: "#5bc0de" },
};

const Receipt = ({ data }: any) => {
    if (!data) return null;

    const transaction = data?.transaction || {};
    const country = data?.country || {};
    const esims = data?.esims || [];

    const colors =
        STATUS_COLORS[data?.status?.toLowerCase()] || STATUS_COLORS.default;

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* RECEIPT HEADER */}
            <View style={{ position: "relative" }}>
                <CustomText
                    text="ORDER RECEIPT"
                    weight="800"
                    size={22}
                    customStyle={{ textAlign: "center", marginBottom: 10 }}
                />
            </View>

            {/* Order Code */}
            <CustomText
                text={`Order: ${data?.orderCode}`}
                weight="700"
                size={18}
                customStyle={{ textAlign: "center", marginTop: 4 }}
            />

            {/* Date */}
            <CustomText
                text={moment(data?.createdAt).format("MMM Do YYYY, h:mm A")}
                weight="500"
                size={13}
                customStyle={{ textAlign: "center", color: "#666" }}
            />

            <View style={styles.dash} />

            {/* CUSTOMER DETAILS */}
            <Section title="Customer Info">
                <Row label="Name" value={data?.name} />
                <Row label="Email" value={data?.email} />
                {data?.phone ? <Row label="Phone" value={data?.phone} /> : null}
            </Section>

            <View style={styles.dash} />

            {/* COUNTRY INFO */}
            <Section title="Country Info">
                <Row label="Country" value={country?.name} />
                <Row label="ISO Code" value={country?.isoCode} />
                <Row label="Phone Code" value={`+${country?.phoneCode}`} />
            </Section>

            <View style={styles.dash} />

            {/* TRANSACTION DETAILS */}
            <Section title="Payment Details">
                <Row label="Gateway" value={transaction?.paymentGateway} />
                <Row
                    label="Transaction ID"
                    value={`${(transaction?.id || "").slice(0, 15)}...`}
                />
                <Row label="Payment Status" value={transaction?.status} />
                <Row label="Source" value={transaction?.source} />
            </Section>

            <View style={styles.dash} />

            {/* ESIM DETAILS */}
            <Section title="ESIM Details">
                <Row label="Total ESIMs" value={esims?.length} />
                {/* You can map esim details here */}
            </Section>

            <View style={styles.dash} />

            {/* TOTAL AMOUNT */}
            <View style={styles.totalBlock}>
                <CustomText text="TOTAL AMOUNT" weight="800" size={18} />
                <CustomText
                    text={`$ ${data?.totalAmount}`}
                    weight="900"
                    size={22}
                />
            </View>

            <View style={styles.dash} />

            {/* FOOTER */}
            <CustomText
                text="Thank you for your purchase!"
                weight="600"
                size={14}
                customStyle={{ textAlign: "center", marginTop: 10 }}
            />
            <View style={{ marginTop: moderateScale(100) }} >
                <Stamp
                    status={data?.status}
                    colors={colors}
                    size={95}
                    textSize={10}
                />
            </View>
            <View style={{ marginBottom: moderateScale(60) }} />

        </ScrollView>
    );
};

export default Receipt;

/*------------------------------------------
  SMALL COMPONENTS
-------------------------------------------*/

const Row = ({ label, value }: any) => (
    <View style={styles.rowItem}>
        <CustomText text={label} weight="600" size={14} color="#444" />
        <CustomText text={String(value)} weight="500" size={14} color="#000" />
    </View>
);

const Section = ({ title, children }: any) => (
    <View style={{ marginBottom: moderateScale(12) }}>
        <CustomText text={title} weight="700" size={16} />
        <View style={{ marginTop: 6 }}>{children}</View>
    </View>
);

/*------------------------------------------
  STYLES
-------------------------------------------*/

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "95%",
        alignSelf: "center",
        marginTop: 20,
        padding: moderateScale(20),
        borderRadius: 12,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },

    dash: {
        width: "100%",
        height: 1,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: moderateScale(14),
    },

    rowItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 4,
    },

    totalBlock: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: moderateScale(6),
    },
});
