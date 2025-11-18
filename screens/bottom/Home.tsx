import React, { useCallback, useState, useRef } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    ScrollView,
    Animated,
    Easing,
    Dimensions,
} from 'react-native';
import Container from '../../components/Container';
import UserHeader from '../../customs/Headers/UserHeader';
import SearchNavigate from '../../customs/Headers/SearchNavigate';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { fetchCountries } from '../../redux/thunk/thunk';
import { featurePlans } from '../../redux/thunk/planThunk';
import CountryCard from '../../customs/Cards/CountryCard';
import { moderateScale } from '../../components/Matrix/Responsive';
import CustomText from '../../customs/CustomText';
import FeatureCard from '../../customs/Cards/FeatureCard';
import { fetchCart } from '../../redux/slice/CartSlice';
import Loader from '../../customs/Loader';
import CustomIcon from '../../customs/CustomIcon';
import Colors from '../../utils/Color';
import { fetchOrdersByUser } from '../../redux/slice/OrderSlice';
import { fetchSimsByUser } from '../../redux/slice/ESimSlice';
import EsimCard from '../../customs/Cards/EsimCard';
import NetworkWrapper from '../../customs/NetworkWrapper';
import { fetchUserDetails } from '../../redux/slice/UserSlice';


const { width } = Dimensions.get('window');

const Home = () => {
    const dispatch = useAppDispatch();
    const { countries } = useAppSelector((state) => state?.country);
    const { featured } = useAppSelector((state) => state?.plan);
    const { esims } = useAppSelector((state) => state?.esims);
    const [refreshing, setRefreshing] = useState(false);
    const pullAnim = useRef(new Animated.Value(0)).current; // 👈 for pull distance

    const fetchData = async () => {
        setRefreshing(true);
        try {
            await dispatch(fetchCountries());
            // await dispatch(fetchUserDetails());
            await dispatch(featurePlans());
            await dispatch(fetchSimsByUser());
            await dispatch(fetchCart());
            await dispatch(fetchOrdersByUser());
        } finally {
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [dispatch])
    );

    const onRefresh = async () => {
        if (refreshing) return;
        setRefreshing(true);
        Animated.timing(pullAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
        await fetchData();
    };

    // Animated icon rotation
    const rotate = pullAnim.interpolate({
        inputRange: [-150, 0],
        outputRange: ['360deg', '0deg'],
        extrapolate: 'clamp',
    });

    const translateY = pullAnim.interpolate({
        inputRange: [-150, 0],
        outputRange: [80, 0],
        extrapolate: 'clamp',
    });

    const scale = pullAnim.interpolate({
        inputRange: [-100, 0],
        outputRange: [1.5, 0],
        extrapolate: 'clamp',
    });


    // console.log("-=-=-=-= esims-=-=-=-=", esims);


    return (
        <NetworkWrapper blockContent={false} >
            <Container>
                <UserHeader />

                {refreshing && <Loader />} {/* 👈 your custom loader */}

                <Animated.View
                    style={[
                        styles.pullIndicator,
                        {
                            transform: [{ translateY }, { scale }],
                        },
                    ]}
                >
                    <Animated.View style={{ transform: [{ rotate }] }}>
                        <CustomIcon
                            type="Ionicons"
                            name='refresh'
                            size={30}
                            color={Colors.primary}
                        />
                        {/* <Ionicons name="refresh" size={30} color="#0085FF" /> */}
                    </Animated.View>
                    <CustomText
                        text="Pull to Refresh"
                        weight="600"
                        size={14}
                        customStyle={{ marginTop: 5, color: Colors.primary }}
                    />
                </Animated.View>

                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={(e) => {
                        const offsetY = e.nativeEvent.contentOffset.y;
                        pullAnim.setValue(offsetY); // 👈 track pull amount
                        if (offsetY < -150 && !refreshing) {
                            onRefresh();
                        }
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <SearchNavigate />
                    {countries && (
                        <View style={{ marginTop: moderateScale(20) }}>
                            <CustomText text="Popular Country" weight="700" size={18} />
                            <FlatList
                                data={countries.slice(0,5)}
                                keyExtractor={(item) => item?.id?.toString()}
                                horizontal
                                contentContainerStyle={{
                                    gap: moderateScale(10),
                                    marginTop: moderateScale(10),
                                }}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => <CountryCard item={item} />}
                            />
                        </View>
                    )}

                    {featured && (
                        <View style={{ marginTop: moderateScale(20) }}>
                            <CustomText text="Feature Plans" weight="700" size={18} />
                            <FlatList
                                data={featured.slice(0, 5)}
                                horizontal
                                contentContainerStyle={{
                                    gap: moderateScale(10),
                                    marginTop: moderateScale(10),
                                }}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item?.id?.toString()}
                                renderItem={({ item }) => <FeatureCard item={item} />}
                            />
                        </View>
                    )}

                    {esims && esims.length > 0 && (
                        <View style={{ marginTop: moderateScale(20) }}>
                            <CustomText text="Your E-Sims" weight="700" size={18} />
                            <FlatList
                                data={esims.slice(0, 5)}
                                horizontal
                                contentContainerStyle={{
                                    gap: moderateScale(10),
                                    marginTop: moderateScale(10),
                                }}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item: any) => item?.id?.toString()}
                                renderItem={({ item }: any) => {
                                    const status = item?.order?.status?.toLowerCase();
                                    if (status !== "failed") {
                                        return <EsimCard item={item} />;
                                    }
                                    return null;
                                }}

                            />
                        </View>
                    )}

                    <View
                        style={{ marginBottom: moderateScale(120) }}
                    />
                </ScrollView>
            </Container>
        </NetworkWrapper>
    );
};

export default Home;

const styles = StyleSheet.create({
    pullIndicator: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
    },
});
