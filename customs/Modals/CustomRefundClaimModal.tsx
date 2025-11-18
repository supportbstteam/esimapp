import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { moderateScale } from '../../components/Matrix/Responsive';
import { globalStyle } from '../../utils/GlobalStyle';
import CustomModal from '../CustomModal';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import Colors from '../../utils/Color';
import { api } from '../../utils/ApiService';
import Toast from 'react-native-toast-message';

// -------------- Validation Schema --------------
const RefundSchema = Yup.object().shape({
    comment: Yup.string()
        .min(3, 'Comment is too short')
        .required('Comment is required'),
});

const CustomRefundClaimModal = ({
    orderId,
    orderNo,
    orderDate,
    orderStatus,
    onSubmitRefund,
    visible,
    onDismiss
}: any) => {
    const [loading, setLoading] = useState(false);
    const handleRefund = async (values: any) => {
        setLoading(true)
        try {
            const response: any = await api({
                url: "/user/claim",
                method: "POST",
                data: {
                    orderId: orderId,
                    message: values?.comment
                }
            });

            if (response.status === 'success') {
                Toast.show({
                    type: "success",
                    text1: "Request raised successfully",
                    text2: "Out team shall contact you soon"
                });
                onDismiss();
            }

            // console.log("-=-=--=-=-=-= response -=-=-=-=-=0", response);
        }
        catch (err) {
            console.error("Error in the handle Refund", err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <CustomModal iscenter={true} visible={visible} onDismiss={onDismiss} >
            <Formik
                initialValues={{ comment: '' }}
                validationSchema={RefundSchema}
                onSubmit={values => {
                    handleRefund(values);
                }}>
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <View style={styles.container}>
                        {/* ---- Title ---- */}
                        {/* <Text style={styles.title}>Claim Refund Request</Text> */}
                        <CustomText text='Claim Refund Request' size={18} customStyle={{ textAlign: "center" }} weight="500" />

                        <View style={styles.divider} />

                        {/* ---- Order No ---- */}
                        <View style={styles.row}>
                            <CustomText text='Order No' color={Colors.lightGray} weight="500" />
                            <CustomText text={orderNo} weight="700" />
                        </View>

                        {/* ---- Order Date ---- */}
                        <View style={styles.row}>
                            <CustomText text='Order Date' color={Colors.lightGray} weight="500" />
                            <CustomText text={orderDate} weight="700" />
                        </View>

                        {/* ---- Order Status ---- */}
                        <View style={styles.row}>
                            <CustomText text='Order Status' color={Colors.lightGray} weight="500" />
                            <CustomText weight="700" text={orderStatus} color={orderStatus.toLowerCase() === "failed" ? "red" : "green"} />
                        </View>

                        {/* ---- Add Comment ---- */}
                        {/* <Text style={styles.commentLabel}>Add Comment</Text> */}
                        <CustomText text='Add Comment' weight="600" />

                        <TextInput
                            style={[
                                styles.textArea,
                                errors.comment && touched.comment ? { borderColor: 'red' } : {},
                            ]}
                            placeholder="Write your comment"
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={4}
                            value={values.comment}
                            onChangeText={handleChange('comment')}
                        />

                        {errors.comment && touched.comment && (
                            <Text style={styles.errorText}>{errors.comment}</Text>
                        )}

                        {/* ---- Buttons ---- */}
                        <View style={[globalStyle.betweenCenter]}>
                            {/* <CustomButton
                                title='Cancel'
                                onPress={onDismiss}
                                
                                customStyle={{ marginTop: moderateScale(10), width:"35%" }}
                            /> */}

                            <CustomButton
                                loading={loading}
                                disabled={loading}
                                title='Send Claim Refund Request'
                                onPress={handleSubmit}
                                customStyle={{ marginTop: moderateScale(10) }}
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </CustomModal>
    );
};

export default CustomRefundClaimModal;

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
    container: {
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(10),
    },

    title: {
        fontSize: moderateScale(15),
        fontWeight: '600',
    },

    divider: {
        height: 1,
        backgroundColor: '#eaeaea',
        marginVertical: moderateScale(10),
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: moderateScale(8),
    },
    label: {
        fontSize: moderateScale(13),
        color: '#646464',
    },
    value: {
        fontSize: moderateScale(13),
        fontWeight: '500',
        color: '#000',
    },

    commentLabel: {
        marginTop: moderateScale(10),
        marginBottom: moderateScale(5),
        fontWeight: '600',
        fontSize: moderateScale(13),
    },

    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: moderateScale(6),
        padding: moderateScale(10),
        height: moderateScale(100),
        fontSize: moderateScale(13),
        textAlignVertical: 'top',
    },

    errorText: {
        color: 'red',
        fontSize: moderateScale(11),
        marginTop: moderateScale(4),
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(20),
    },

    cancelBtn: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(18),
        borderRadius: moderateScale(6),
    },
    cancelText: {
        color: '#000',
        fontWeight: '500',
    },

    submitBtn: {
        backgroundColor: '#3BC852',
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(18),
        borderRadius: moderateScale(6),
    },
    submitText: {
        color: '#fff',
        fontWeight: '600',
    },
});
