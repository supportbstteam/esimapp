import { Pressable, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import CustomText from '../CustomText';
import FlagContainer from '../../components/FlagContainer';
import { globalStyle } from '../../utils/GlobalStyle';
import { moderateScale, screenHeight, screenWidth } from '../../components/Matrix/Responsive';
import Colors from '../../utils/Color';
import CustomIcon from '../CustomIcon';
import { useAppDispatch } from '../../redux/Store';
import { fetchCart, removeCartItem, updateCartItem } from '../../redux/slice/CartSlice';
import { debounce } from 'lodash';
import Toast from 'react-native-toast-message';
import DeleteModal from '../../components/Modals/DeleteModal';
const CartCard = ({ item, onDelete }: any) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    // Local state for instant UI updates
    const [quantity, setQuantity] = useState<number>(item?.quantity || 1);
    const [open, setOpen] = useState(false);

    // ✅ Debounced API call (to avoid excessive requests)
    const debouncedUpdate = useCallback(
        debounce(async (cartItemId: string, newQuantity: number) => {
            // console.log("---- calling loasdh debounce ----");
            const response = await dispatch(updateCartItem({ cartItemId, quantity: newQuantity }));


            // console.log("----- response in the dispatch update cart ----", response);
            if (response?.type === 'cart/updateCartItem/rejected') {
                ToastAndroid.show("Failed to upate cart item", ToastAndroid.SHORT);
            }
            else {
                await dispatch(fetchCart());
            }

        }, 600),
        [] // memoized once
    );

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        let newQty = quantity;
        if (type === 'inc') newQty += 1;
        else if (type === 'dec' && newQty > 1) newQty -= 1;

        setQuantity(newQty);
        debouncedUpdate(item?.id, newQty);
    };

    // console.log("00000 item ----", item);

    const arrayData = [
        { label: 'Data Plan', value: item?.plan?.name },
        { label: 'Data Allowance', value: item?.plan?.data },
        { label: 'Validity', value: `${item?.plan?.validityDays} Days` },
    ];

    const handleCartItemRemove = async () => {
        setLoading(true)
        const response = await dispatch(removeCartItem(item?.id));
        if (response?.type === 'cart/removeCartItem/fulfilled') {
            ToastAndroid.show("Item removed!", ToastAndroid.SHORT);
            await dispatch(fetchCart());
            setOpen(false);
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>

            <Pressable onPress={() => {
                setOpen(true);
            }} style={{ position: "absolute", top: moderateScale(10), right: moderateScale(10) }} >
                <CustomIcon size={18} type='Feather' color={Colors.cross} name='trash-2' />
            </Pressable>

            {/* Country and Flag */}
            <View style={[globalStyle.row]}>
                <FlagContainer country={item?.plan?.country} />
                <CustomText
                    weight="600"
                    size={18}
                    text={item?.plan?.country?.name}
                    customStyle={{ marginLeft: moderateScale(5) }}
                />
            </View>

            {/* Dynamic Plan Info */}
            <View style={{ marginTop: moderateScale(10) }}>
                {arrayData.map((data, index) => (
                    <View
                        key={index}
                        style={[globalStyle.betweenCenter, { marginVertical: moderateScale(5) }]}
                    >
                        <CustomText text={data.label} color={Colors.gray_font} weight="500" />
                        <CustomText text={data.value || '-'} weight="600" />
                    </View>
                ))}
            </View>

            {/* Divider */}
            <View
                style={{
                    width: screenWidth * 0.9,
                    height: 1,
                    backgroundColor: '#cccccc',
                    marginVertical: moderateScale(5),
                    alignSelf: 'center',
                }}
            />

            {/* Quantity Controller */}
            <View style={[globalStyle.betweenCenter, { marginVertical: moderateScale(15) }]}>
                <CustomText text="Quantity" weight="600" size={18} color={Colors.text_secondary} />
                <View style={[globalStyle.row]}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.btn, { marginRight: moderateScale(10) }, globalStyle.center]}
                        onPress={() => handleQuantityChange('dec')}
                    >
                        <CustomIcon type="Feather" name="minus" size={18} color={Colors.white} />
                    </TouchableOpacity>

                    <CustomText weight="600" size={20} text={quantity.toString()} />

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.btn, { marginLeft: moderateScale(10) }, globalStyle.center]}
                        onPress={() => handleQuantityChange('inc')}
                    >
                        <CustomIcon type="Feather" color={Colors.white} name="plus" size={18} />
                    </TouchableOpacity>
                </View>
            </View>

            <DeleteModal
                title="E-sim"
                open={open}
                loading={loading}
                onClose={() => {
                    setOpen(false)
                }}
                onDelete={handleCartItemRemove}
            />
        </View>
    );
};

export default CartCard;

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.9,
        backgroundColor: '#fff',
        elevation: 2,
        marginHorizontal: moderateScale(10),
        marginBottom: moderateScale(10),
        padding: moderateScale(12),
        borderRadius: moderateScale(10),
    },
    btn: {
        width: moderateScale(30),
        height: moderateScale(30),
        backgroundColor: Colors.primary,
        borderRadius: moderateScale(30),
    },
});
