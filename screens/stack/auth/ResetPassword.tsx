import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardEvent,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../customs/CustomInput";
import Colors from "../../../utils/Color";
import { moderateScale } from "../../../components/Matrix/Responsive";
import Toast from "react-native-toast-message";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../../utils/ApiService";
import CustomButton from "../../../customs/CustomButton";

// =====================
// Validation Schema
// =====================
const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("New password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm your password"),
});

// =====================
// Component
// =====================
const ResetPassword = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const [loading, setLoading] = useState(false);
  // You should pass this email from previous screen
  const email = route?.params?.email;

  const translateY = useSharedValue(0);

  // =====================
  // Keyboard Handling
  // =====================
  useEffect(() => {
    const handleKeyboardShow = (e: KeyboardEvent) => {
      translateY.value = withTiming(-e.endCoordinates.height / 2.8, {
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // =====================
  // API Handler
  // =====================
  const handleResetPassword = async (values: { newPassword: string }) => {
    setLoading(true);
    try {
      const response: any = await api({
        method: "POST",
        url: "/user/auth/temp-reset-password",
        data: {
          email,
          password: values.newPassword,
        },
      });

      console.log("------- response  in the reset password-----", response)

      if (response?.message === 'Password reset successfully') {
        Toast.show({
          type: "success",
          text1: "Password Updated",
          text2: "Login with your new password",
        });

        navigation.navigate("Login");
      } else {
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: response?.message || "Something went wrong",
        });
      }
    } catch (err) {
      console.log("Reset Password Error:", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to reset password",
      });
    }
    finally {
      setLoading(false);
    }
  };

  // =====================
  // Render UI
  // =====================
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.box, animatedStyle]}>
            <Formik
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validationSchema={resetPasswordSchema}
              onSubmit={handleResetPassword}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <Text style={styles.title}>Reset Password</Text>

                  {/* ===== NEW PASSWORD ===== */}
                  <CustomInput
                    text="New Password"
                    placeholder="Enter new password"
                    isPassword
                    value={values.newPassword}
                    handleChangeText={handleChange("newPassword")}
                  />
                  {touched.newPassword && errors.newPassword && (
                    <Text style={styles.error}>{errors.newPassword}</Text>
                  )}

                  {/* ===== CONFIRM PASSWORD ===== */}
                  <CustomInput
                    text="Confirm Password"
                    placeholder="Re-enter password"
                    isPassword
                    value={values.confirmPassword}
                    handleChangeText={handleChange("confirmPassword")}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}

                  {/* ===== SUBMIT BUTTON ===== */}
                  <CustomButton
                    title="Update Password"
                    loading={loading}
                    disabled={loading}
                    onPress={handleSubmit}
                    customStyle={{ marginTop: moderateScale(10) }}
                  />
                  {/* <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
                    <Text style={styles.btnText}>Update Password</Text>
                  </TouchableOpacity> */}
                </>
              )}
            </Formik>
          </Animated.View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

// =====================
// Styles
// =====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: moderateScale(24),
  },
  box: {
    backgroundColor: Colors.white,
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    elevation: 3,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: moderateScale(20),
    color: Colors.primary,
  },
  error: {
    color: Colors.error,
    fontSize: moderateScale(12),
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(4),
  },
  btn: {
    backgroundColor: Colors.primary,
    marginTop: moderateScale(20),
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(8),
  },
  btnText: {
    textAlign: "center",
    color: Colors.white,
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
});
