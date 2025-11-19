import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useCallback, useState } from 'react';
import Container from '../../components/Container';
import Header from '../../customs/Headers/Header';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import CustomText from '../../customs/CustomText';
import { moderateScale } from '../../components/Matrix/Responsive';
import Colors from '../../utils/Color';
import RenderHTML from 'react-native-render-html';
import { globalStyle } from '../../utils/GlobalStyle';
import Loader from '../../customs/Loader';
import { postUploadQuery } from '../../utils/GlobalFunction';
import ContactFormScreen from '../../components/forms/ContactUsForm';

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [queryLoading, querySetLoading] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);
  const { width } = useWindowDimensions();

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const response = await axios.get("https://esim-backend-w7ox.onrender.com/api/user/cms/contacts");
      const contentResponse = await axios.get("https://esim-backend-w7ox.onrender.com/api/user/cms/content/contact");

      if (response?.status === 200) {
        setContacts(response.data || []);
      }

      if (contentResponse?.status === 200) {
        setContent(contentResponse.data || {});
      }
    } catch (err) {
      console.error("Error fetching contact data:", err);
    }
    finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, [])
  );


  const handleQuery = async (data: any) => {
    await postUploadQuery({ querySetLoading, data });
  }

  if (loading) {
    return (
      <View style={[globalStyle.center, { flex: 1, backgroundColor: "#fff" }]} >
        <Loader size={moderateScale(80)} />
      </View>
    )
  }

  return (
    <Container>
      <Header title='Contact Us' />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* MAIN CONTENT CARD */}
          <View style={styles.card}>
            <CustomText text={content?.title || "Contact Us"} weight="600" size={18} />

            {/* Render the HTML content */}
            {content?.html ? (
              <RenderHTML
                contentWidth={width - moderateScale(20)}
                source={{ html: content.html }}
              />
            ) : (
              <CustomText
                text="No content available"
                color={Colors.lightGray}
                size={14}
              />
            )}
          </View>

          {/* CONTACT LIST */}
          {contacts.length > 0 && (
            <View style={[styles.card, { marginTop: moderateScale(15) }]}>
              <CustomText
                text="Contact Details"
                weight="600"
                size={18}
                customStyle={{ marginBottom: moderateScale(10) }}
              />

              {contacts.map((item, index) => (
                <View key={index} style={styles.contactRow}>
                  <CustomText
                    weight="600"
                    size={15}
                    text={`${item?.type || "Type"}:`}
                  />
                  <CustomText
                    size={15}
                    text={item?.value || "-"}
                    customStyle={{ marginLeft: moderateScale(5) }}
                  />
                  {item?.position ? (
                    <CustomText
                      size={12}
                      color={Colors.lightGray}
                      customStyle={{ marginLeft: moderateScale(5) }}
                      text={`(${item.position})`}
                    />
                  ) : null}
                </View>
              ))}
            </View>
          )}

          <ContactFormScreen />
          <View
            style={{ paddingBottom: moderateScale(100) }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.lightGray,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: "#fff",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(8),
  },
});
