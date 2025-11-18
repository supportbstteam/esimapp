import React, { useCallback, useState } from "react";
import {
    Alert,
    StyleSheet,
    View,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import Toast from "react-native-toast-message";
import Container from "../../../components/Container";
import Header from "../../../customs/Headers/Header";
import { useAppDispatch, useAppSelector } from "../../../redux/Store";
import { clearCart, fetchCart } from "../../../redux/slice/CartSlice";
import FlagContainer from "../../../components/FlagContainer";
import CustomText from "../../../customs/CustomText";
import { globalStyle } from "../../../utils/GlobalStyle";
import { moderateScale } from "../../../components/Matrix/Responsive";
import Colors from "../../../utils/Color";
import CustomButton from "../../../customs/CustomButton";
import { api } from "../../../utils/ApiService";
import { waitForOrderCompletion } from "../../../utils/OrderStatusFunction";

const Checkout = () => {
    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();
    const cart: any = useAppSelector((state) => state?.cart?.cart);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [codLoading, setCodLoading] = useState(false);

    // fetch cart on focus
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchCart());
        }, [dispatch])
    );

    // Main Stripe handler (single function)
    const handleStripePayment = async () => {
        setLoading(true);
        try {
            // 1️⃣ Create PaymentIntent
            const res: any = await api({
                url: "/user/transactions/mobile/stripe/initiate",
                method: "POST",
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
            const order = await waitForOrderCompletion(transactionId);

            console.log("----- order -----", order);

            if (order?.status === "COMPLETED" || order?.status === "PARTIAL") {
                await dispatch(fetchCart());
                navigation.navigate("OrderStatus", { order });
            } else {
                await dispatch(fetchCart());
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


    // Totals
    const totalAmount =
        cart?.items?.length > 0
            ? cart.items.reduce(
                (a: number, b: any) =>
                    a + (parseFloat(b?.plan?.price) * b?.quantity || 0),
                0
            )
            : 0;

    const totalESim =
        cart?.items?.length > 0
            ? cart.items.reduce(
                (a: number, b: any) => a + (parseFloat(b?.quantity) || 0),
                0
            )
            : 0;


    // console.log("----- total amount ----",totalAmount);

    const handleCod = async () => {
        setCodLoading(true)
        try {
            const response: any = await api({
                url: "/user/transactions/cod",
                data: {
                    cartId: cart?.id
                },
                method: "POST"
            });

            if (response?.order?.status === "COMPLETED" || response?.order?.status === "PARTIAL") {
                await dispatch(fetchCart());
                await dispatch(clearCart());
                navigation.navigate("OrderStatus", { order: response?.order });
            } else {
                await dispatch(fetchCart());
                await dispatch(clearCart());
                navigation.navigate("OrderStatus", { order: response?.order });
            }

            // console.log("-=-=-=-=-=-=-= response -=-=-=-=-=-=", response);
        }
        catch (err) {
            console.error("Error in the handle COD", err);
        }
        finally {
            setCodLoading(false);
        }
    }

    // UI
    return (
        <Container>
            <Header title="Checkout" />
            <ScrollView style={{ flex: 0.8, paddingHorizontal: moderateScale(5) }} showsVerticalScrollIndicator={false}>
                {cart?.items?.length > 0 &&
                    cart.items.map((item: any, index: number) => (
                        <View
                            key={index}
                            style={[globalStyle.betweenCenter, styles.planContainer]}
                        >
                            <View style={[globalStyle.row]}>
                                <FlagContainer country={item?.plan?.country} />
                                <View>
                                    <CustomText
                                        customStyle={{ marginLeft: moderateScale(5) }}
                                        weight="700"
                                        size={16}
                                        text={`${item?.plan?.data} GB`}
                                    />
                                    <CustomText
                                        customStyle={{ marginLeft: moderateScale(5) }}
                                        weight="600"
                                        color={Colors.text_secondary}
                                        size={14}
                                        text={item?.plan?.country?.name.toUpperCase()}
                                    />
                                </View>
                            </View>

                            <View>
                                <CustomText
                                    customStyle={{ marginLeft: moderateScale(5) }}
                                    weight="700"
                                    size={16}
                                    text={`${item?.plan?.currency === "USD"
                                        ? "$"
                                        : item?.plan?.currency
                                        } ${(item?.plan?.price * item?.quantity).toFixed(2)}`}
                                />
                                <CustomText
                                    customStyle={{ marginLeft: moderateScale(5) }}
                                    weight="500"
                                    color={Colors.text_secondary}
                                    size={14}
                                    text={`${item?.quantity} Quantity`}
                                />
                            </View>
                        </View>
                    ))}

                {/* Summary */}
                <View style={{ marginTop: moderateScale(10) }}>
                    <View style={[globalStyle.betweenCenter]}>
                        <CustomText text="Total E-sim" size={18} weight="600" />
                        <CustomText
                            size={18}
                            weight="600"
                            color={Colors.primary}
                            text={totalESim}
                        />
                    </View>

                    <View style={[globalStyle.betweenCenter]}>
                        <CustomText text="Grand Total" size={18} weight="600" />
                        <CustomText
                            size={18}
                            weight="600"
                            color={Colors.primary}
                            text={`${cart?.items?.[0]?.plan?.currency === "USD"
                                ? "$"
                                : cart?.items?.[0]?.plan?.currency
                                } ${totalAmount.toFixed(2)}`}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Button */}
            <View style={{ marginTop: moderateScale(20), flex: 0.25 }}>
                <CustomButton title="Pay Now" loading={loading} disabled={loading || codLoading} onPress={handleStripePayment} />
                <CustomButton title="Pay Cash on Delivery" bg={Colors.secondary} customStyle={{ marginTop: moderateScale(10) }} loading={codLoading} disabled={codLoading || loading} onPress={handleCod} />
            </View>
        </Container>
    );
};

export default Checkout;

const styles = StyleSheet.create({
    planContainer: {
        width: "100%",
        backgroundColor: "#f2faf5",
        marginBottom: moderateScale(15),
        padding: moderateScale(5),
        borderRadius: moderateScale(10),
        elevation: 2,
    },
});
