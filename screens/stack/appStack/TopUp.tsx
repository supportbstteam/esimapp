import { FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Container from '../../../components/Container'
import { useAppDispatch } from '../../../redux/Store'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { api } from '../../../utils/ApiService'
import Loader from '../../../customs/Loader'
import { globalStyle } from '../../../utils/GlobalStyle'
import { moderateScale, screenWidth } from '../../../components/Matrix/Responsive'
import Header from '../../../customs/Headers/Header'
import SimCard2 from '../../../customs/Cards/SimCard2'
import CustomText from '../../../customs/CustomText'
import Colors from '../../../utils/Color'
import Toast from 'react-native-toast-message'
import CustomButton from '../../../customs/CustomButton'

const TopUp = () => {
    const route = useRoute();
    const navigation: any = useNavigation();
    const [loading, setLoading] = useState(false);
    const { country, sim }: any = route?.params;
    const [topup, setTopup] = useState<[]>([]);
    const [esim, setEsim] = useState(null);
    const [selectDays, setSelectDays] = useState('');
    const [selectTopup, setSelectedTopUp] = useState(null);

    const fetchPlanTopUps = async () => {
        setLoading(true)
        try {
            const response: any = await api({
                url: `/user/top-up?simId=${sim}`,
                method: "GET"
            });

            if (response?.status) {
                setTopup(response?.data);
                setEsim(response?.esim)
            }
            // console.log("response in the top up plans ", response);

        }
        catch (err) {
            console.error("Error in the getting top up plans", err);
        }
        finally {
            setLoading(false);
        }
    }

    // console.log("top up listing", topup);


    useFocusEffect(useCallback(() => {
        fetchPlanTopUps();
    }, []))
    return (
        <Container>
            <Header
                title='Top Up'
            />

            {
                loading && (
                    <View style={[globalStyle.center, { flex: 1 }]}>
                        <Loader size={moderateScale(100)} />
                    </View>
                )
            }

            {
                topup && esim && (
                    <>


                        <FlatList
                            data={topup}
                            keyExtractor={(item: any) => item?.id}
                            contentContainerStyle={{
                                rowGap: moderateScale(5),
                                paddingBottom: moderateScale(120),

                            }}

                            ListHeaderComponent={() => {
                                // console.log("--- top up itme ====", topup)
                                const daysMap = [...new Set(topup.map((item: any) => item?.validityDays))];
                                // console.log("unique validity days:", daysMap);


                                return (
                                    <View style={{ marginHorizontal: moderateScale(10), flex: 1 }} >
                                        <CustomText customStyle={{ textAlign: "center", paddingHorizontal: moderateScale(2), marginTop: moderateScale(5) }} text='Recharge your eSIM in seconds and keep exploring without interruption.' weight="500" color={Colors.lightGray} />
                                        <SimCard2
                                            item={esim}
                                        />

                                        <CustomText text='Select Days' weight="600" customStyle={{ marginTop: moderateScale(10) }} />
                                        <FlatList
                                            data={daysMap}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{
                                                paddingVertical: moderateScale(10),
                                                columnGap: moderateScale(10),
                                                width: "100%",
                                                // backgroundColor: "red"
                                            }}
                                            keyExtractor={({ item }) => item}
                                            renderItem={({ item }) => {

                                                const isSelected = item === selectDays;
                                                return <TouchableOpacity onPress={() => {
                                                    setSelectDays(item);
                                                }} style={[styles.daysContainer, globalStyle.center, { backgroundColor: isSelected ? Colors.primary : "#e7e7e7" }]} >
                                                    <CustomText color={isSelected ? "#fff" : "#000"} text={`${item} days`} weight={isSelected ? "600" : "500"} />
                                                </TouchableOpacity>
                                            }}
                                        />
                                    </View>
                                )
                            }}

                            renderItem={({ item }) => {

                                const isSelected = selectTopup === item;
                                const filterItem = selectDays === item?.validityDays && item

                                if (filterItem) {
                                    return (
                                        <Pressable onPress={() => {
                                            if (!selectDays) {
                                                Toast.show({
                                                    type: "error",
                                                    text1: "Please Select Days first"
                                                });
                                                return
                                            }
                                            setSelectedTopUp(item)
                                        }} style={[styles.listingContainer, globalStyle.betweenCenter, {
                                            backgroundColor: isSelected ? Colors.primary : "#f7f7f7"
                                        }]} >

                                            <CustomText
                                                color={isSelected ? "#fff" : "#000"}
                                                weight="600" size={18}
                                                text={`${item?.dataLimit} GB`}
                                            />
                                            <CustomText
                                                color={isSelected ? "#fff" : "#000"}
                                                text={`${item?.currency === "USD" ? "$" : item?.currency} ${item?.price}`}
                                                weight="600" size={18}
                                            />

                                        </Pressable>
                                    )
                                }
                                else {
                                    return <></>
                                }
                            }}
                        />

                        <CustomButton
                            radius={10}
                            customStyle={{
                                position: "absolute",
                                bottom: moderateScale(20),
                                alignSelf: "center",

                            }}
                            title='Recharge Now'
                            onPress={() => {
                                if (!selectTopup) {
                                    Toast.show({ type: "error", text1: "Please select TopUp first", text2: "Select and continue to recharge your E-Sim" })
                                    return;
                                }

                                navigation.navigate("TopUpOrder", {
                                    topup: selectTopup,
                                    sim: esim
                                })
                            }}
                        />

                    </>
                )
            }



        </Container>
    )
}

export default TopUp

const styles = StyleSheet.create({
    daysContainer: {
        paddingHorizontal: moderateScale(20),
        paddingVertical: moderateScale(5),
        borderRadius: moderateScale(5),
        backgroundColor: "#e7e7e7",
        width: screenWidth * .3
    },
    listingContainer: {
        width: "100%",
        alignSelf: "center",
        backgroundColor: "#e3e3e3",
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(5)

    }
})