import {
    ActivityIndicator,
    Animated,
    FlatList,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/Store';
import { fetchPlans } from '../../../redux/thunk/planThunk';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Container from '../../../components/Container';
import CustomText from '../../../customs/CustomText';
import Header from '../../../customs/Headers/Header';
import { clearPlans } from '../../../redux/slice/PlanSlice';
import { globalStyle } from '../../../utils/GlobalStyle';
import Colors from '../../../utils/Color';
import { moderateScale } from '../../../components/Matrix/Responsive';
import CustomIcon from '../../../customs/CustomIcon';
import { addToCart } from '../../../redux/slice/CartSlice';
import Toast from 'react-native-toast-message';
import FastImage from 'react-native-fast-image';
import BwComponents from '../../../customs/Background/BwComponents';

const CountryPlans = ({ route }: any) => {
    const navigation:any = useNavigation();
    const { plans } = useAppSelector((state) => state?.plan);
    const { cart } = useAppSelector(state => state?.cart);
    const planArrayType = ['Fixed', 'Unlimited'];
    const [planType, setPlanType] = useState<string>(planArrayType[0]);
    const [selectedPlans, setSelectedPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isCheckout, setIsCheckout] = useState(false)
    const dispatch = useAppDispatch();

    // Animation refs
    const translateY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    const fetchCountryPlan = async () => {
        await dispatch(clearPlans());
        await dispatch(fetchPlans({ countryId: route?.params?.id }));
    };

    useFocusEffect(
        useCallback(() => {
            fetchCountryPlan();
        }, [dispatch])
    );

    // Animate Add to Cart button when selectedPlans changes
    useEffect(() => {
        if (selectedPlans.length > 0 || isCheckout) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [selectedPlans]);

    const handleAddToCart = async () => {
        if (selectedPlans.length === 0) return;

        setLoading(true);

        // 🔹 Transform to match backend format
        const formattedPlans = selectedPlans.map((plan) => ({
            planId: plan.id,        // backend expects this
            id: plan.id,            // redundant but required by thunk type
            quantity: 1,            // default quantity
        }));

        const response = await dispatch(addToCart(formattedPlans));

        // console.log("---- response in the add to cart ----", response);

        if (response?.type === 'cart/addToCart/rejected') {
            Toast.show({
                text1: 'Failed to add to cart',
                text2: 'Try again later',
                type: 'error',
            });
        } else {
            Toast.show({
                text1: 'Added to cart successfully',
                type: 'success',
            });
            setSelectedPlans([]);
            setIsCheckout(true);
        }

        setLoading(false);
    };


    // console.log("----- selectedPlans ----", selectedPlans);

    // Group and filter plans by validityDays
    const renderPlansByDays = () => {
        if (!plans || plans.length === 0) return null;

        // Filter by Fixed or Unlimited
        const filteredPlans = plans.filter((item) =>
            planType === 'Unlimited' ? item.isUnlimited : !item.isUnlimited
        );

        // Group by validityDays
        const groupedPlans: Record<string, any[]> = {};
        filteredPlans.forEach((plan) => {
            const days = plan.validityDays || 0;
            if (!groupedPlans[days]) groupedPlans[days] = [];
            groupedPlans[days].push(plan);
        });

        // Sort days ascending
        const sortedDays = Object.keys(groupedPlans)
            .map(Number)
            .sort((a, b) => a - b);

        return (
            <FlatList
                data={sortedDays}
                keyExtractor={(item) => item.toString()}
                contentContainerStyle={{
                    gap: moderateScale(15),
                    paddingTop: moderateScale(10),
                    paddingBottom: moderateScale(80),
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: day }) => (
                    <View key={day}>
                        {/* Section Header */}

                        <View style={[globalStyle.betweenCenter, { marginBottom: moderateScale(10) }]} >
                            <CustomText
                                text={`${day} Days`}

                                weight="700"
                                color={Colors.secondary}
                                size={18}
                                customStyle={{
                                    position: "absolute",
                                    // backgroundColor:"#fff",
                                    zIndex: 999,
                                    textAlign: "center",
                                    right: 0,
                                    left: 0
                                }}
                            />
                            <View style={{ width: "38%", alignSelf: "center", height: moderateScale(1), backgroundColor: Colors.lightGray }} />
                            <View style={{ width: "38%", alignSelf: "center", height: moderateScale(1), backgroundColor: Colors.lightGray }} />
                        </View>

                        {/* Plans under this day */}
                        {groupedPlans[day].map((plan) => {
                            const isSelected = selectedPlans.some(
                                (p) => p.id === plan.id
                            );

                            return (
                                <TouchableOpacity
                                    key={plan.id}
                                    onPress={() => {
                                        setSelectedPlans((prev) => {
                                            if (
                                                prev.some(
                                                    (p) => p.id === plan.id
                                                )
                                            ) {
                                                return prev.filter(
                                                    (p) => p.id !== plan.id
                                                );
                                            } else {
                                                return [...prev, plan];
                                            }
                                        });
                                    }}
                                    activeOpacity={0.7}
                                    style={[
                                        globalStyle.betweenCenter,
                                        styles.planContainer,
                                        {
                                            backgroundColor: isSelected
                                                ? Colors.primary
                                                : '#e3e3e3',
                                        },
                                    ]}
                                >
                                    {plan?.isFeatured && (
                                        <View
                                            style={[
                                                globalStyle.center,
                                                styles.popContainer,
                                            ]}
                                        >
                                            <CustomIcon
                                                type="FontAwesome6"
                                                name="fire-flame-curved"
                                                size={16}
                                                color={Colors.orange}
                                            />
                                        </View>
                                    )}

                                    <CustomText
                                        weight={
                                            isSelected ? '600' : '500'
                                        }
                                        color={isSelected ? '#fff' : '#000'}
                                        text={`${plan?.title}`}
                                    />
                                    <CustomText
                                        weight={
                                            isSelected ? '600' : '500'
                                        }
                                        color={isSelected ? '#fff' : '#000'}
                                        text={`${plan?.currency === 'USD'
                                            ? '$'
                                            : plan?.currency
                                            } ${plan?.price}`}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            />
        );
    };

    return (
        <Container>
            <Header title="Plans" />

            {/* Country info */}
            <View
                style={{
                    marginBottom: moderateScale(10),
                    width: '100%',
                    padding: moderateScale(10),
                    position:"relative"
                }}
            >
                {/* <BwComponents/> */}

                <CustomText
                    text={plans[0]?.country?.name}
                    size={22}
                    weight="600"
                />
                <CustomText
                    color="#909090"
                    text={plans[0]?.country?.description}
                    weight="500"
                />
            </View>

            {/* Plan type toggle */}
            <View
                style={[
                    globalStyle.row,
                    {
                        backgroundColor: '#e3e3e3',
                        marginBottom: moderateScale(10),
                    },
                    styles.selected,
                ]}
            >
                {planArrayType.map((item, index) => (
                    <Pressable
                        onPress={() => {
                            setPlanType(item);
                            setSelectedPlans([]); // clear selections when switching tab
                        }}
                        style={[
                            globalStyle.center,
                            {
                                flex: 1,
                                backgroundColor:
                                    planType === item
                                        ? Colors.primary
                                        : '#e3e3e3',
                                padding: moderateScale(10),
                                overflow: 'hidden',
                            },
                        ]}
                        key={index}
                    >
                        <CustomText
                            color={planType === item ? '#fff' : '#000'}
                            text={item}
                            weight="600"
                            size={16}
                        />
                    </Pressable>
                ))}
            </View>

            {/* Grouped Plans */}
            {renderPlansByDays()}

            {/* Animated Add to Cart Button */}
            <Animated.View
                style={{
                    transform: [{ translateY }],
                    opacity,
                    position: 'absolute',
                    bottom: moderateScale(20),
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                }}
            >
                {
                    isCheckout ? (
                        <TouchableOpacity
                            style={[styles.atcBtn, globalStyle.center, { backgroundColor: Colors.secondary }]}
                            activeOpacity={0.85}
                            onPress={() => {
                                navigation.navigate("Cart");
                            }}
                        >
                            <CustomText
                                size={18}
                                customStyle={{
                                    marginRight: moderateScale(5),
                                }}
                                text="Go to Checkout"
                                weight="600"
                                color="#fff"
                            />
                            <CustomIcon
                                type="Feather"
                                name="shopping-cart"
                                color="#fff"
                                size={18}
                            />
                        </TouchableOpacity>
                    ) :
                        loading ? (
                            <ActivityIndicator
                                size="small"
                                color="#fff"
                                style={[
                                    styles.atcBtn,
                                    globalStyle.center,
                                    { padding: moderateScale(15) },
                                ]}
                            />
                        ) : (
                            <TouchableOpacity
                                style={[styles.atcBtn, globalStyle.center]}
                                activeOpacity={0.85}
                                onPress={handleAddToCart}
                            >
                                <CustomText
                                    size={18}
                                    customStyle={{
                                        marginRight: moderateScale(5),
                                    }}
                                    text="Add to Cart"
                                    weight="600"
                                    color="#fff"
                                />
                                <CustomIcon
                                    type="Feather"
                                    name="shopping-cart"
                                    color="#fff"
                                    size={18}
                                />
                            </TouchableOpacity>
                        )}

            </Animated.View>
        </Container>
    );
};

export default CountryPlans;

const styles = StyleSheet.create({
    selected: {
        borderRadius: moderateScale(10),
        overflow: 'hidden',
    },
    planContainer: {
        padding: moderateScale(10),
        backgroundColor: '#e3e3e3',
        borderRadius: moderateScale(5),
        marginVertical: moderateScale(3),
    },
    atcBtn: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: Colors.primary,
        padding: moderateScale(15),
        flexDirection: 'row',
        borderRadius: moderateScale(10),
    },
    popContainer: {
        flexDirection: 'row',
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(10),
        paddingVertical: moderateScale(1),
        position: 'absolute',
        top: -moderateScale(10),
        right: -moderateScale(10),
    },

});
