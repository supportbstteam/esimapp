import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import Container from '../../components/Container';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import Header from '../../customs/Headers/Header';
import { Formik } from 'formik';
import CustomInput from '../../customs/CustomInput';
import CustomText from '../../customs/CustomText';
import Colors from '../../utils/Color';
import { moderateScale, verticalScale } from '../../components/Matrix/Responsive';
import CustomButton from '../../customs/CustomButton';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { api } from '../../utils/ApiService';
import Toast from 'react-native-toast-message';
import { fetchUserDetails } from '../../redux/slice/UserSlice';
import { globalStyle } from '../../utils/GlobalStyle';
import * as yup from 'yup'

const userEditSchema = yup.object().shape({
  firstName: yup.string().required("*required"),
  lastName: yup.string().required("*required"),
  email: yup.string().email("Invalid email format").required("*required"),
  phone: yup.string().required("*required"),
  country: yup.string().required("*required"),
});

// 🌍 Fetch Countries API
const fetchCountries = async () => {
  try {
    const response = await axios.get("https://www.apicountries.com/countries");
    const data = await response?.data;

    if (response?.status === 200) {
      return data
        .map((item: any) => ({
          label: item?.name || "",
          value: item?.name || "",
          svg: item?.flag || ""
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label));
    }
  } catch (error) {
    console.log("Error fetching countries:", error);
    return [];
  }
};

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state?.user);
  const [countryList, setCountryList] = useState<any[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  // Load countries on mount
  useEffect(() => {
    const loadCountries = async () => {
      const list: any = await fetchCountries();
      setCountryList(list);
      setLoadingCountries(false);
    };
    loadCountries();
  }, []);

  // console.log("-=-=-=-= country list  -=--=-=-=-=",countryList);


  const userUpdate = async (values: any) => {
    try {
      const response = await api({
        url: "/user/update",
        data: values,
        method: "PUT"
      });

      if (response?.status === 'success') {
        Toast.show({
          type: "success",
          text1: response?.message
        });
        await dispatch(fetchUserDetails());
      }

    }
    catch (err: any) {
      console.error("Error in the Edit Profile:", err);

    }
  }

  return (
    <Container customStyle={{ paddingHorizontal: 0 }}>
      <Header title='Edit Profile' />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          <Formik
            initialValues={{
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              email: user?.email || "",
              phone: user?.phone || "",
              country: user?.country || "",
            }}
            validationSchema={userEditSchema}
            onSubmit={(values) => {
              userUpdate(values);
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
              <View style={styles.formWrapper}>
                {/* First Name */}
                <CustomInput
                  text="First Name"
                  isRequired
                  values={values.firstName}
                  placeholder="Enter first name"
                  handleChangeText={handleChange("firstName")}
                />
                {touched.firstName && errors.firstName && (
                  <CustomText text={errors.firstName} color="red" size={12} />
                )}

                {/* Last Name */}
                <CustomInput
                  text="Last Name"
                  isRequired
                  values={values.lastName}
                  placeholder="Enter last name"
                  handleChangeText={handleChange("lastName")}
                />
                {touched.lastName && errors.lastName && (
                  <CustomText text={errors.lastName} color="red" size={12} />
                )}

                {/* Email (non-editable) */}
                <CustomInput
                  text="Email ID"
                  isRequired
                  values={values.email}
                  editable={false}
                  placeholder="Email"
                  handleChangeText={() => { }}
                />

                {/* Phone */}
                <CustomInput
                  text="Contact No."
                  values={values.phone}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  isRequired={true}
                  handleChangeText={handleChange("phone")}
                />

                {/* 🌍 Country Dropdown */}
                <View style={{ marginTop: verticalScale(15) }}>
                  <View style={[globalStyle.row, { marginBottom: moderateScale(5) }]} >
                    <CustomText
                      text="Country"
                      size={15}
                      weight="500"
                    // customStyle={{ marginBottom: moderateScale(5) }}
                    />
                    <CustomText
                      text=" *"
                      size={15}
                      weight="500"
                      color='#ff0000'
                    // customStyle={{ marginBottom: moderateScale(5) }}
                    />

                  </View>
                  {loadingCountries ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : (
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholder}
                      selectedTextStyle={styles.selectedText}
                      data={countryList}
                      search
                      searchPlaceholder="Search country"
                      labelField="label"
                      valueField="value"
                      placeholder="Select country"
                      value={values.country}
                      onChange={(item) => setFieldValue("country", item.value)}
                    />
                  )}
                </View>

                {touched.country && errors.country && (
                  <CustomText text={errors.country} color="red" size={12} />
                )}

                {/* Save Button */}
                <CustomButton
                  title="Save Changes"
                  radius={10}
                  loading={false}
                  disabled={false}
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

export default EditProfile;

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: moderateScale(15),
    paddingBottom: verticalScale(80),
  },
  formWrapper: {
    paddingBottom: moderateScale(150),
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderColor: Colors.gray,
    backgroundColor: "#fff",
  },
  placeholder: {
    color: Colors.gray,
    fontSize: 14,
  },
  selectedText: {
    color: Colors.text_primary,
    fontSize: 15,
  },
  button: {
    marginTop: verticalScale(30),
    position: "absolute",
    bottom: moderateScale(20),
    alignSelf: "center",
    width: "100%",
  },
});
