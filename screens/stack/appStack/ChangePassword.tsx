import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import Container from '../../../components/Container';
import Header from '../../../customs/Headers/Header';
import CustomText from '../../../customs/CustomText';
import CustomButton from '../../../customs/CustomButton';
import { moderateScale, verticalScale } from '../../../components/Matrix/Responsive';
import { api } from '../../../utils/ApiService';
import CustomInput from '../../../customs/CustomInput';
import { update } from 'lodash';
import { useNavigation } from '@react-navigation/native';

// 🔐 Validation Schema
const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required("*required"),
    newPassword: yup
        .string()
        .min(6, "Minimum 6 characters required")
        .required("*required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords do not match")
        .required("*required"),
});

const ChangePassword = () => {
    const navigation:any = useNavigation();
    const updatePassword = async (values: any) => {
        // console.log(values);
        // return;

        try {
            const response: any = await api({
                url: "/user/update",
                method: "PUT",
                data: {
                    currentPassword: values?.oldPassword,
                    password: values?.newPassword
                }
            });

            console.log("Password Change Response:", response);

            if (response?.status === "success") {
                Toast.show({
                    type: "success",
                    text1: response?.message || "Password updated successfully",
                });
                navigation.goBack();
                // resetForm();
            }

        } catch (error) {
            console.log("Error changing password:", error);
            Toast.show({
                type: "error",
                text1: "Error changing password",
            });
        }
    };

    return (
        <Container customStyle={{ paddingHorizontal: 0 }}>
            <Header title="Change Password" />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scroll}
                >

                    <Formik
                        initialValues={{
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                        }}
                        validationSchema={passwordSchema}
                        onSubmit={updatePassword}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <View style={styles.formWrapper}>

                                {/* Old Password */}
                                <CustomInput
                                    text="Old Password"
                                    isRequired
                                    isPassword={true}
                                    // 
                                    values={values.oldPassword}
                                    placeholder="Enter old password"
                                    handleChangeText={handleChange("oldPassword")}
                                />
                                {touched.oldPassword && errors.oldPassword && (
                                    <CustomText text={errors.oldPassword} color="red" size={12} />
                                )}

                                {/* New Password */}
                                <CustomInput
                                    text="New Password"
                                    isRequired
                                    isPassword={true}

                                    values={values.newPassword}
                                    placeholder="Enter new password"
                                    handleChangeText={handleChange("newPassword")}
                                />
                                {touched.newPassword && errors.newPassword && (
                                    <CustomText text={errors.newPassword} color="red" size={12} />
                                )}

                                {/* Confirm Password */}
                                <CustomInput
                                    text="Confirm Password"
                                    isRequired
                                    isPassword={true}

                                    values={values.confirmPassword}
                                    placeholder="Confirm new password"
                                    handleChangeText={handleChange("confirmPassword")}
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <CustomText text={errors.confirmPassword} color="red" size={12} />
                                )}

                                {/* Save Button */}
                                <CustomButton
                                    title="Update Password"
                                    radius={10}
                                    onPress={handleSubmit}
                                    customStyle={styles.button}
                                />

                            </View>
                        )}
                    </Formik>

                </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: moderateScale(15),
        paddingBottom: verticalScale(80),
    },
    formWrapper: {
        paddingBottom: moderateScale(150),
    },
    button: {
        marginTop: verticalScale(30),
        position: "absolute",
        bottom: moderateScale(20),
        alignSelf: "center",
        width: "100%",
    },
});
