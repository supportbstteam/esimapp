import React, { useCallback, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../redux/Store';
import { fetchSimDetailsByUser } from '../../../redux/slice/ESimSlice';
import Container from '../../../components/Container';
import Header from '../../../customs/Headers/Header';
import CustomText from '../../../customs/CustomText';
import { moderateScale, screenWidth } from '../../../components/Matrix/Responsive';
import QRCode from 'react-native-qrcode-svg';
import FlagContainer from '../../../components/FlagContainer';
import Colors from '../../../utils/Color';
import { globalStyle } from '../../../utils/GlobalStyle';
import { Images } from '../../../utils/Images';
import LottieView from "lottie-react-native";
import Loader from '../../../customs/Loader';
import EmptyCard from '../../../customs/Cards/EmptyCard';
import NotFound from '../../../customs/Cards/NotFound';
import NoData from '../../../customs/Cards/NoData';
import NetworkWrapper from '../../../customs/NetworkWrapper';
import CustomButton from '../../../customs/CustomButton';
import CustomRefundClaimModal from '../../../customs/Modals/CustomRefundClaimModal';
import moment from 'moment';
import { api } from '../../../utils/ApiService';


const SimDetails = () => {
    const route: any = useRoute();
    const dispatch = useAppDispatch();
    const { eSimDetails, loading } = useAppSelector((state) => state.esims);
    const [visible, setVisible] = useState(false);
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchSimDetailsByUser(route?.params?.id));
        }, [dispatch])
    );

    const esim = eSimDetails?.esims?.[0]; // your API returns array of 1 item
    const order = eSimDetails?.order;
    const user = eSimDetails?.user;

    if (loading)
        return (
            <View style={[globalStyle.center, { flex: 1, backgroundColor: Colors.white }]} >
                <Loader
                    size={moderateScale(120)}
                />
            </View>
        )

    if (!eSimDetails) {
        return (
            <NetworkWrapper blockContent={true} >
                <Container>
                    <View style={[globalStyle.center, { flex: 1, backgroundColor: Colors.white }]} >
                        <Header title="SIM Details" />
                        <NoData
                            text='No E-sim details'
                        />
                    </View>
                </Container>
            </NetworkWrapper>
        )
    }



    const currency =
        esim?.currency
            ? (esim.currency === "USD" ? "$" : esim.currency)
            : (eSimDetails?.country?.currency === "USD" ? "$" : eSimDetails?.country?.currency);





    return (
        <Container>
            <Header title="SIM Details" />
            <ScrollView contentContainerStyle={styles.content}>

                {/* 🌍 Flag + Country */}
                <View style={styles.card}>
                    <View style={[globalStyle.row, { alignItems: 'center' }]}>
                        <FlagContainer country={esim?.country} />

                        <View style={{ marginLeft: moderateScale(10) }}>
                            <CustomText size={18} weight="700" text={eSimDetails?.country?.name} />
                            <CustomText size={14} color={Colors.gray} text={esim?.productName} />
                        </View>
                    </View>

                    {/* ICCID */}
                    <View style={{ marginTop: moderateScale(15) }}>
                        <CustomText size={12} color={Colors.gray} text="ICCID" />
                        <CustomText size={16} weight="600" text={esim?.iccid || "N/A"} />
                    </View>

                    {/* Status */}
                    <View style={[styles.statusBox]}>
                        <CustomText
                            size={13}
                            weight="600"
                            color={esim?.isActive ? Colors.success : Colors.red}
                            text={esim?.isActive ? 'ACTIVE' : 'NOT ACTIVE'}
                        />
                    </View>
                </View>

                {/* 📡 Plan Info */}
                <View style={styles.card}>
                    <CustomText size={16} weight="700" text="Plan Details" />

                    <View style={styles.rowItem}>
                        <CustomText text="Data Amount" />
                        <CustomText weight="600" text={`${esim?.dataAmount || 0} GB`} />
                    </View>

                    <View style={styles.rowItem}>
                        <CustomText text="Validity" />
                        <CustomText weight="600" text={`${esim?.validityDays || 0} Days`} />
                    </View>

                    <View style={styles.rowItem}>
                        <CustomText text="Start Date" />
                        <CustomText weight="600" text={esim?.startDate || "N/A"} />
                    </View>

                    <View style={styles.rowItem}>
                        <CustomText text="End Date" />
                        <CustomText weight="600" text={esim?.endDate || "N/A"} />
                    </View>
                </View>

                {/* 🔗 Order Details */}
                <View style={styles.card}>
                    <CustomText size={16} weight="700" text="Order Details" />

                    <View style={styles.rowItem}>
                        <CustomText text="Order Code" />
                        <CustomText weight="600" text={eSimDetails?.orderCode} />
                    </View>

                    <View style={styles.rowItem}>
                        <CustomText text="Amount Paid" />
                        <CustomText
                            weight="600"
                            text={`${currency} ${eSimDetails?.totalAmount} `} />
                    </View>

                    <View style={styles.rowItem}>
                        <CustomText text="Status" />
                        <CustomText
                            weight="600"
                            color={eSimDetails?.status === 'COMPLETED' ? Colors.success : Colors.red}
                            text={eSimDetails?.status}
                        />
                    </View>
                </View>

                {/* 🧾 User Info */}
                <View style={styles.card}>
                    <CustomText size={16} weight="700" text="User Info" />
                    <CustomText text={`${eSimDetails?.name}`} />
                    <CustomText text={eSimDetails?.email} />
                </View>

                {/* 🔳 QR Code */}
                <View style={[styles.card, { alignItems: 'center' }]}>
                    <CustomText size={16} weight="700" text="Scan QR Code" />

                    <View style={{ marginTop: moderateScale(15) }}>
                        {
                            eSimDetails?.status === "COMPLETED" ? (
                                <View>
                                    <QRCode
                                        size={moderateScale(180)}
                                        color={"#000"}
                                        value={esim?.qrCodeUrl || 'NO_QR'}
                                    />
                                    <CustomText
                                        size={12}
                                        color={Colors.gray}
                                        customStyle={{ marginTop: moderateScale(10) }}
                                        text="Scan this QR to install your eSIM"
                                    />
                                </View>
                            ) : (
                                <View>
                                    <LottieView
                                        source={Images.NotFound}
                                        autoPlay
                                        loop
                                        style={styles.animation}
                                    />
                                </View>
                            )
                        }

                    </View>
                </View>

            </ScrollView>

            {
                eSimDetails?.status.toLowerCase() === "failed" && <CustomButton
                    customStyle={styles.btn}
                    title='Refund Request'
                    onPress={() => {
                        setVisible(true);
                    }}
                />
            }


            <CustomRefundClaimModal
                orderId={eSimDetails?.id}
                orderNo={eSimDetails?.orderCode}
                orderDate={moment(eSimDetails?.createAt).format("MMM Do YYYY")}
                visible={visible}
                // onSubmitRefund={handleRefund}
                orderStatus={eSimDetails?.status}
                onCancel={() => setVisible(false)}
                onDismiss={() => {
                    setVisible(false);
                }}
            />
        </Container>
    );
};

export default SimDetails;

const styles = StyleSheet.create({
    content: {
        padding: moderateScale(5),
        paddingBottom: moderateScale(100),
    },
    card: {
        backgroundColor: Colors.white,
        padding: moderateScale(15),
        borderRadius: moderateScale(12),
        marginBottom: moderateScale(15),
        elevation: 3,
        borderColor: '#eee',
        borderWidth: 1,
    },
    rowItem: {
        marginTop: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statusBox: {
        marginTop: moderateScale(10),
        alignSelf: 'flex-start',
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(4),
        borderRadius: moderateScale(20),
        backgroundColor: '#f7f7f7',
    },
    animation: {
        width: moderateScale(150),
        height: moderateScale(150),
    },
    btn: {
        position: "absolute",
        bottom: moderateScale(30),
        alignSelf: "center"
    }
});
