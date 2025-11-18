import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../customs/CustomInput";
import Colors from "../../../utils/Color";
import { moderateScale } from "../../../components/Matrix/Responsive";
import Container from "../../../components/Container";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux/Store";
import { signupUser } from "../../../redux/slice/UserSlice";

// ====================
// Validation Schema
// ====================
const formSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});

const SignUp = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  // ====================
  // Handle Signup Submit
  // ====================
  const handleSignup = async (values: any) => {
    try {
      const response: any = await dispatch(signupUser(values));
      // console.log("----- response in the sign up ----",response);

      if (response?.type === "user/signup/fulfilled") {
        Toast.show({
          type: "success",
          text1: "OTP Sent!",
          text2: "Please verify your email to continue.",
        });

        // ✅ Navigate to OTP screen and pass email
        navigation.navigate("OtpVerification", { email: values.email, firstName: values?.firstName, lastName: values?.lastName, password: values?.password });
      } else {
        Toast.show({
          type: "error",
          text1: "Signup Failed",
          text2: response?.payload || "Something went wrong.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Signup failed, please try again.",
      });
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
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <>
                <Text style={styles.header}>Create Account</Text>

                <CustomInput
                  text="First Name"
                  placeholder="Enter your first name"
                  value={values.firstName}
                  autoCaptital="sentences"
                  handleChangeText={handleChange("firstName")}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}

                <CustomInput
                  text="Last Name"
                  autoCaptital="sentences"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  handleChangeText={handleChange("lastName")}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}

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

                <CustomInput
                  text="Confirm Password"
                  placeholder="Re-enter your password"
                  isPassword
                  value={values.confirmPassword}
                  handleChangeText={handleChange("confirmPassword")}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                <View style={styles.footerTextContainer}>
                  <Text style={styles.footerText}>Already have an account? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.footerLink}>Login</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default SignUp;

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
  errorText: {
    color: Colors.error,
    fontSize: moderateScale(12),
    marginVertical: moderateScale(4),
    marginLeft: moderateScale(4),
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
