import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Platform,
  KeyboardEvent,
  useWindowDimensions,
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
import { Images } from "../../../utils/Images";
import { useAppDispatch } from "../../../redux/Store";
import { loginUser } from "../../../redux/slice/UserSlice";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

// =====================
// Validation Schema
// =====================
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// =====================
// Component
// =====================
const Login = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const translateY = useSharedValue(0);
  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  // =====================
  // Handle Keyboard Animations
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

  // =====================
  // Animated Styles
  // =====================
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // =====================
  // Handle Submit
  // =====================
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await dispatch(loginUser({
        email: values?.email,
        password: values?.password
      }));

      if (response?.type === 'user/login/rejected') {
        Toast.show({
          type: "error",
          text1: "Login Failed"
        });
      }
      else if (response?.type === 'user/login/fulfilled') {
        Toast.show({
          type: "success",
          text1: "Login Successfully",
          text2: "You can access our products"
        });

      }
      console.log("------ response in the login user ----", response);
    }
    catch (err) {
      console.error("Error in the Login User:", err);

    }
  };

  // =====================
  // Render
  // =====================
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.formContainer, animatedContainerStyle]}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  {/* ===== LOGO ===== */}
                  <View style={styles.logoContainer}>
                    <Images.Logo
                      width={moderateScale(200)}
                      height={moderateScale(100)}
                      style={{ alignSelf: "center" }}
                    />
                  </View>

                  {/* ===== EMAIL ===== */}
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

                  {/* ===== PASSWORD ===== */}
                  <CustomInput
                    text="Password"
                    placeholder="Enter your password"
                    isPassword
                    value={values.password}
                    handleChangeText={handleChange("password")}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  {/* ===== FORGOT PASSWORD ===== */}
                  <TouchableOpacity onPress={() => {
                    navigation.navigate("ForgetPassword");
                  }} style={styles.forgotContainer}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>

                  {/* ===== LOGIN BUTTON ===== */}
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>

                  {/* ===== FOOTER ===== */}
                  <View style={styles.footerTextContainer}>
                    <Text style={styles.footerText}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => {
                      navigation.navigate("SignUp");
                    }} >
                      <Text style={styles.footerLink}>Sign up</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </Animated.View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

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
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  logoContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: moderateScale(10),
  },
  errorText: {
    color: Colors.error,
    fontSize: moderateScale(12),
    marginTop: moderateScale(4),
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(4),
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginTop: moderateScale(4),
  },
  forgotText: {
    color: Colors.primary,
    fontSize: moderateScale(13),
    fontWeight: "500",
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
  footerTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: moderateScale(20),
  },
  footerText: {
    color: Colors.gray_font,
    fontSize: moderateScale(13),
  },
  footerLink: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: moderateScale(13),
  },
});
