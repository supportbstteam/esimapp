import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../../components/Container'
import Header from '../../../customs/Headers/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import SimCard2 from '../../../customs/Cards/SimCard2'
import CustomText from '../../../customs/CustomText'
import { moderateScale } from '../../../components/Matrix/Responsive'
import Colors from '../../../utils/Color'
import CustomButton from '../../../customs/CustomButton'
import TopUpSummaryCard from '../../../customs/Cards/TopupSummaryCard'
import Toast from 'react-native-toast-message'
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native'
import { waitForOrderCompletion, waitForOrderTopUpCompletion } from '../../../utils/OrderStatusFunction'
import { api } from '../../../utils/ApiService'

const TopUpOrder = () => {
    const navigation: any = useNavigation();
    const router: any = useRoute();
    const sim = router?.params?.sim;
    const topup = router?.params?.topup;
    const [loading, setLoading] = useState(false);


    const handleStripePayment = async () => {
        setLoading(true);
        try {
            // 1️⃣ Create PaymentIntent
            const res: any = await api({
                url: "/user/transactions/mobile/top-up/stripe/initiate",
                method: "POST",
                data: {
                    topupId: topup?.id,
                    esimId: sim?.id
                }
            });

            const clientSecret = res.clientSecret;
            const transactionId = res.transaction.id;

            // 2️⃣ Init PaymentSheet
            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: "SimAero",
                paymentIntentClientSecret: clientSecret,
            });
            if (initError) throw new Error(initError.message);

            // 3️⃣ Present PaymentSheet
            const { error: payError } = await presentPaymentSheet();
            if (payError) throw new Error(payError.message);

            Toast.show({ text1: "Payment successful!", type: "success" });

            // 4️⃣ Wait for backend to process webhook & create order
            const order = await waitForOrderTopUpCompletion(transactionId);

            console.log("----- top up trnasction -----", order);
 
            if (order?.status === "COMPLETED" || order?.status === "PARTIAL") {
                // await dispatch(fetchCart());
                navigation.navigate("OrderStatus", { order });
            } else {
                // await dispatch(fetchCart());
                navigation.navigate("OrderStatus", { order });
            }

        } catch (err: any) {
            console.error("❌ Stripe payment error:", err);
            Toast.show({
                text1: "Payment failed",
                text2: err.message,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Header title="Top Up Order" />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                {/* Existing Plan Info */}
                <SimCard2 item={sim} />

                {/* Selected Top Up */}
                <View style={{ marginTop: moderateScale(15) }}>
                    <CustomText
                        text="Selected Top Up"
                        weight="700"
                        size={18}
                        customStyle={{ marginBottom: moderateScale(8) }}
                    />

                    <TopUpSummaryCard topup={topup} />
                </View>
                <View
                    style={{ marginBottom: moderateScale(120) }}
                />
            </ScrollView>

            {/* Confirm Button */}
            <CustomButton
                loading={loading}
                disabled={loading}
                title="Proceed to Payment"
                radius={10}
                customStyle={{
                    marginTop: moderateScale(20),
                    borderRadius: moderateScale(10),
                    position: "absolute",
                    bottom: moderateScale(30),
                    alignSelf: "center"
                }}
                onPress={handleStripePayment}
            />
        </Container>
    );
};

export default TopUpOrder;

const styles = StyleSheet.create({});
