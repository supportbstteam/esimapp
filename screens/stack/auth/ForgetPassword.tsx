import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Platform,
    KeyboardEvent,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../../customs/CustomInput";
import Colors from "../../../utils/Color";
import { moderateScale } from "../../../components/Matrix/Responsive";
import { Images } from "../../../utils/Images";
import { api } from "../../../utils/ApiService";
import CustomButton from "../../../customs/CustomButton";

// =====================
// Validation Schema
// =====================
const forgetSchema = Yup.object().shape({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
});

// =====================
// Component
// =====================
const ForgetPassword = () => {
    const navigation: any = useNavigation();
    const translateY = useSharedValue(0);
    const [loading, setLoading] = useState(false);
    // =====================
    // Keyboard Animation
    // =====================
    useEffect(() => {
        const handleKeyboardShow = (e: KeyboardEvent) => {
            const keyboardHeight = e.endCoordinates.height;
            translateY.value = withTiming(-keyboardHeight / 2.5, {
                duration: 400,
                easing: Easing.out(Easing.exp),
            });
        };

        const handleKeyboardHide = () => {
            translateY.value = withTiming(0, {
                duration: 400,
                easing: Easing.out(Easing.exp),
            });
        };

        const showSub = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
            handleKeyboardShow
        );
        const hideSub = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
            handleKeyboardHide
        );

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    // =====================
    // Submit Handler
    // =====================
    const handleSubmitForm = async (values: { email: string }) => {
        setLoading(true)
        try {

            const response: any = await api({
                method: "POST",
                url: "user/auth/forget-password",
                data: {
                    email: values?.email,
                    // isForget:true
                }
            });

            if (response?.message === 'OTP sent to your registered email address') {
                Toast.show({
                    type: "success",
                    text1: "Reset Link Sent",
                    text2: "Check your email to reset your password.",
                });

                return navigation.navigate("OtpVerification", {
                    email: response?.email,
                    isForget: true
                })
            }

            console.log("------ response in the user forget password ----", response);

            // call your API here


            //   navigation.goBack();
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Something went wrong",
            });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View style={[styles.card, animatedStyles]}>
                        {/* Logo */}
                        <View style={styles.logoContainer}>
                            <Images.Logo
                                width={moderateScale(180)}
                                height={moderateScale(90)}
                            />
                        </View>

                        <Text style={styles.title}>Forgot Password?</Text>
                        <Text style={styles.subtitle}>
                            Enter your email and we’ll send you a reset link.
                        </Text>

                        <Formik
                            initialValues={{ email: "" }}
                            validationSchema={forgetSchema}
                            onSubmit={handleSubmitForm}
                        >
                            {({ handleChange, handleSubmit, values, errors, touched }) => (
                                <>
                                    {/* EMAIL */}
                                    <CustomInput
                                        text="E-mail"
                                        placeholder="Enter your email"
                                        value={values.email}
                                        handleChangeText={handleChange("email")}
                                        keyboardType="email-address"
                                    />
                                    {touched.email && errors.email && (
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    )}

                                    {/* RESET BTN */}
                                    {/* <TouchableOpacity
                                        style={styles.button}
                                        activeOpacity={0.8}
                                        onPress={() => handleSubmit()}
                                    >
                                        <Text style={styles.buttonText}>Send Reset Link</Text>
                                    </TouchableOpacity> */}
                                    <CustomButton
                                        title="Send Reset Link"
                                        onPress={handleSubmit}
                                        loading={loading}
                                        customStyle={{ marginTop: moderateScale(10) }}
                                        disabled={loading}
                                    />

                                    {/* Back To Login */}
                                    <TouchableOpacity
                                        style={styles.backLoginContainer}
                                        onPress={() => navigation.goBack()}
                                    >
                                        <Text style={styles.backLogin}>Back to Login</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>
                    </Animated.View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ForgetPassword;

// =====================
// Styles
// =====================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: moderateScale(24),
        paddingVertical: moderateScale(40),
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        padding: moderateScale(22),
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: moderateScale(10),
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: "700",
        color: Colors.black,
        textAlign: "center",
        marginTop: moderateScale(10),
    },
    subtitle: {
        textAlign: "center",
        color: Colors.gray_font,
        fontSize: moderateScale(13),
        marginVertical: moderateScale(10),
        paddingHorizontal: moderateScale(10),
    },
    errorText: {
        color: Colors.error,
        fontSize: moderateScale(12),
        marginTop: moderateScale(2),
        marginBottom: moderateScale(8),
        marginLeft: moderateScale(4),
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: moderateScale(14),
        borderRadius: moderateScale(8),
        marginTop: moderateScale(20),
    },
    buttonText: {
        textAlign: "center",
        color: Colors.white,
        fontSize: moderateScale(15),
        fontWeight: "600",
    },
    backLoginContainer: {
        marginTop: moderateScale(20),
        alignItems: "center",
    },
    backLogin: {
        fontSize: moderateScale(13),
        color: Colors.primary,
        fontWeight: "600",
    },
});
