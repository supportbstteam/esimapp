import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomText from "../../customs/CustomText";
import CustomInput from "../../customs/CustomInput";
import CustomButton from "../../customs/CustomButton";
import Colors from "../../utils/Color";
import { horizontalScale, moderateScale, verticalScale } from "../Matrix/Responsive";
import { postUploadQuery } from "../../utils/GlobalFunction";

// ----------------------------
// YUP VALIDATION
// ----------------------------
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    phone: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
});

const ContactFormScreen = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmitForm = async (values: any) => {
        await postUploadQuery({
            setLoading,
            data: values
        })
    };

    return (
        <View style={{ padding: moderateScale(10), borderWidth: 1, borderColor: Colors.lightGray, marginVertical: moderateScale(10), borderRadius: moderateScale(10) }} >

            {/* Title */}
            <CustomText
                text="Send Us a Message"
                size={24}
                weight="700"
                color={Colors.text_primary}
                customStyle={{ marginBottom: verticalScale(20) }}
            />

            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    message: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmitForm}
            >
                {({
                    handleChange,
                    handleSubmit,
                    setFieldTouched,
                    touched,
                    errors,
                    values,
                }) => (
                    <View>

                        {/* FIRST NAME */}
                        <CustomInput
                            text="First Name"
                            isRequired
                            values={values.firstName}
                            placeholder="John"
                            handleChangeText={handleChange("firstName")}
                            onBlur={() => setFieldTouched("firstName")}
                        />
                        {touched.firstName && errors.firstName && (
                            <CustomText text={errors.firstName} color="red" size={13} />
                        )}

                        {/* LAST NAME */}
                        <CustomInput
                            text="Last Name"
                            isRequired
                            values={values.lastName}
                            placeholder="Doe"
                            handleChangeText={handleChange("lastName")}
                            onBlur={() => setFieldTouched("lastName")}
                        />
                        {touched.lastName && errors.lastName && (
                            <CustomText text={errors.lastName} color="red" size={13} />
                        )}

                        {/* EMAIL */}
                        <CustomInput
                            text="Email"
                            isRequired
                            values={values.email}
                            placeholder="john.doe@example.com"
                            keyboardType="email-address"
                            handleChangeText={handleChange("email")}
                            onBlur={() => setFieldTouched("email")}
                        />
                        {touched.email && errors.email && (
                            <CustomText text={errors.email} color="red" size={13} />
                        )}

                        {/* PHONE */}
                        <CustomInput
                            text="Phone"
                            isRequired
                            values={values.phone}
                            placeholder="+1234567890"
                            keyboardType="phone-pad"
                            handleChangeText={handleChange("phone")}
                            onBlur={() => setFieldTouched("phone")}
                        />
                        {touched.phone && errors.phone && (
                            <CustomText text={errors.phone} color="red" size={13} />
                        )}

                        {/* MESSAGE */}
                        <CustomInput
                            text="Message"
                            isRequired
                            placeholder="Your message..."
                            multiline
                            numOfLine={5}
                            values={values.message}
                            handleChangeText={handleChange("message")}
                            onBlur={() => setFieldTouched("message")}
                            inputStyle={{ height: moderateScale(120) }}
                        />
                        {touched.message && errors.message && (
                            <CustomText text={errors.message} color="red" size={13} />
                        )}

                        {/* BUTTON */}
                        <CustomButton
                            loading={loading}
                            disabled={loading}
                            title="Send Message"
                            onPress={() => handleSubmit()}
                            customStyle={styles.button}
                            bg={Colors.primary}
                            radius={moderateScale(10)}
                            textColor="#fff"
                            size={16}
                        />

                    </View>
                )}
            </Formik>
        </View>
    );
};

export default ContactFormScreen;

// ----------------------------
// STYLES
// ----------------------------
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: horizontalScale(20),
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(40),
    },
    button: {
        marginTop: verticalScale(30),
        // paddingVertical: verticalScale(12),
    },
});
