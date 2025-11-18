import React from 'react';
import { View, Linking, Pressable, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import Colors from '../utils/Color';
import { moderateScale } from '../components/Matrix/Responsive';
import CustomText from './CustomText';
import CustomIcon from './CustomIcon';

// Accept DrawerContentComponentProps so navigation and state are available
const CustomDrawerContent = (props: DrawerContentComponentProps & { setLogoutVisible: (v: boolean) => void }) => {
    const { navigation, setLogoutVisible } = props;

    const webUrl = "https://esim-olive.vercel.app"

    const drawerItems = [
        {
            title: 'Edit Profile',
            icon: { type: 'Feather', name: 'user' },
            onPress: () => {
                navigation.navigate('EditProfile');
            },
        },
        {
            title: 'Orders',
            icon: { type: 'Feather', name: 'shopping-bag' },
            onPress: () => {
                navigation.navigate('Orders');
            },
        },
        {
            title: 'Contact Us',
            icon: { type: 'Feather', name: 'headphones' },
            onPress: () => {
                navigation.navigate('ContactUs');
            },
        },
        // {
        //     title: 'Visit Website',
        //     icon: { type: 'Feather', name: 'link' },
        //     onPress: () => Linking.openURL('https://esim-olive.vercel.app/'),
        // },
        // {
        //     title: 'About Us',
        //     icon: { type: 'Feather', name: 'info' },
        //     onPress: () => Linking.openURL(webUrl+"/about-us"),
        // },
        // {
        //     title: 'Terms & Conditions',
        //     icon: { type: 'Feather', name: 'alert-triangle' },
        //     onPress: () => Linking.openURL(webUrl+"/terms-and-conditions"),
        // },
        // {
        //     title: 'Privacy Policy',
        //     icon: { type: 'Feather', name: 'alert-triangle' },
        //     onPress: () => Linking.openURL(webUrl+"/privacy-policy"),
        // },
    ];

    return (
        <DrawerContentScrollView {...props} style={{ paddingHorizontal: 10 }}>
            {/* Optional profile header */}
            {/* <View style={{ marginVertical: 20 }}>
                <CustomText size={20} weight="700" text="Hello Kartik!" />
                <CustomText size={14} text="Welcome back 👋" color={Colors.lightGray} />
            </View> */}

            {/* Drawer links */}
            {drawerItems.map((item, index) => (
                <Pressable
                    key={index}
                    style={styles.item}
                    onPress={() => {
                        item.onPress();
                        // close drawer after navigation for better UX
                        navigation.closeDrawer();
                    }}
                >
                    <CustomIcon
                        type={(item.icon as any).type}
                        name={(item.icon as any).name}
                        size={22}
                        color={Colors.black}
                    />
                    <CustomText text={item.title} size={16} customStyle={{ marginLeft: 15 }} />
                </Pressable>
            ))}

            {/* LOGOUT */}
            <Pressable
                style={[styles.item, { marginTop: 30 }]}
                onPress={() => {
                    setLogoutVisible(true);
                    navigation.closeDrawer();
                }}
            >
                <CustomIcon type="AntDesign" name="logout" size={22} color="red" />
                <CustomText
                    text="Logout"
                    size={16}
                    color="red"
                    weight='600'
                    customStyle={{ marginLeft: 15 }}
                />
            </Pressable>
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateScale(12),
    }
});
