import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "../../../redux/Store";
import { verifyOtp, signupUser, fetchUserDetails } from "../../../redux/slice/UserSlice";
import Toast from "react-native-toast-message";
import Colors from "../../../utils/Color";
import { moderateScale } from "../../../components/Matrix/Responsive";
import Container from "../../../components/Container";
import CustomOtpInput from "../../../customs/CustomOtp";
import CustomButton from "../../../customs/CustomButton";
import { api } from "../../../utils/ApiService";

const OtpVerification = () => {
    const dispatch = useAppDispatch();
    const navigation: any = useNavigation();
    const [forgetLoading, setForgetLoading] = useState(false);
    const { loading } = useAppSelector(state => state?.user);
    const route = useRoute();
    const { email, lastName, firstName, password, isForget } = route.params as { email: string, firstName: string, lastName: string, password: string, isForget: boolean };

    const [otpCode, setOtpCode] = useState<string>(""); // ✅ Always initialize empty

    console.log("---- is forget -----", isForget);
    // ====================
    // Handle Verify OTP
    // ====================
    const handleVerify = async () => {

        if (otpCode.length !== 6) {
            Toast.show({ type: "error", text1: "Invalid OTP", text2: "Please enter all 6 digits." });
            return;
        }

        if (isForget) {
            setForgetLoading(true);
            try {
                const response: any = await api({
                    method: "POST",
                    url: "/user/auth/verify-password-otp",
                    data: {
                        email,
                        otp: otpCode
                    }
                });

                if (response?.message === "OTP verified successfully. You can now reset your password.") {
                    console.log("hello");

                    Toast.show({
                        type: "success",
                        text1: "OTP verification successfull",
                        text2: response?.message
                    });

                    navigation.navigate("ResetPassword", {
                        email
                    });

                }

                console.log("----- response in otp verification -----", response);
                return;
            }
            catch (err) {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Something went wrong while verifying OTP.",
                });
                return;
            }
            finally {
                setForgetLoading(false);
                return;
            }

        }
        else {
            try {
                const res: any = await dispatch(verifyOtp({ email, otp: otpCode }));

                if (res?.type === "user/verifyOtp/fulfilled") {
                    Toast.show({
                        type: "success",
                        text1: "Account Verified!",
                        text2: "You can now log in.",
                    });
                    await dispatch(fetchUserDetails());
                    navigation.navigate("Login");
                } else {
                    Toast.show({
                        type: "error",
                        text1: "Verification Failed",
                        text2: res?.payload || "Invalid OTP. Please try again.",
                    });
                }
            } catch (err) {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Something went wrong while verifying OTP.",
                });
            }

        }

    };

    // ====================
    // Handle Resend OTP
    // ====================
    const handleResend = async () => {

        if (isForget) {
            const response: any = await api({
                method: "POST",
                url: "user/auth/forget-password",
                data: {
                    email: email,
                    // isForget:true
                }
            });

            if (response?.message === 'OTP sent to your registered email address') {
                Toast.show({
                    type: "success",
                    text1: "Reset Link Sent",
                    text2: "Check your email to reset your password.",
                });
            }
        }
        else {
            try {
                const res: any = await dispatch(signupUser({ email, firstName, lastName, password }));

                console.log("----- res in the sign up ----", res);

                if (res?.type === "user/signup/fulfilled") {
                    Toast.show({
                        type: "success",
                        text1: "OTP Resent!",
                        text2: "Please check your email again.",
                    });
                } else {
                    Toast.show({
                        type: "error",
                        text1: "Resend Failed",
                        text2: res?.payload || "Unable to resend OTP.",
                    });
                }
            } catch (err) {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Could not resend OTP.",
                });
            }
        }
    };

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    extraScrollHeight={Platform.OS === "ios" ? 30 : 80}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.header}>Verify OTP</Text>
                    <Text style={styles.subHeader}>Enter the 6-digit OTP sent to your email</Text>

                    <View style={{ marginVertical: moderateScale(30) }}>
                        <CustomOtpInput code={otpCode} setCode={setOtpCode} />
                    </View>

                    {/* <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={handleVerify}
                    >
                        <Text style={styles.buttonText}>Verify</Text>
                    </TouchableOpacity> */}
                    <CustomButton
                        title="Verify"
                        loading={loading || forgetLoading}
                        disabled={loading || forgetLoading}
                        onPress={handleVerify}
                    />

                    <TouchableOpacity
                        style={styles.resendBtn}
                        onPress={handleResend}
                    >
                        <Text style={styles.resendText}>Resend OTP</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </Container>
    );
};

export default OtpVerification;

// ====================
// Styles
// ====================
const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: moderateScale(5),
        paddingBottom: moderateScale(40),
    },
    header: {
        fontSize: moderateScale(24),
        fontWeight: "700",
        textAlign: "center",
        color: Colors.black,
        marginBottom: moderateScale(10),
    },
    subHeader: {
        fontSize: moderateScale(14),
        color: Colors.gray_font,
        textAlign: "center",
        marginBottom: moderateScale(10),
    },
    button: {
        backgroundColor: Colors.primary,
        marginTop: moderateScale(24),
        paddingVertical: moderateScale(14),
        borderRadius: moderateScale(8),
    },
    buttonText: {
        textAlign: "center",
        color: Colors.white,
        fontSize: moderateScale(16),
        fontWeight: "600",
    },
    resendBtn: {
        marginTop: moderateScale(20),
        alignSelf: "center",
    },
    resendText: {
        color: Colors.primary,
        fontWeight: "500",
        fontSize: moderateScale(14),
    },
});
