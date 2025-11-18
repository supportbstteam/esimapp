import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Keyboard, Platform } from "react-native";
import CustomBottomTabBar from "./CustomBottomTabBar";
import { moderateScale } from "../components/Matrix/Responsive";
import Home from "../screens/bottom/Home";
import Data from "../screens/bottom/Data";
import Notification from "../screens/bottom/Notification";
import Colors from "../utils/Color";
import AppDrawer from "../screens/drawer/AppDrawer";
import Profile from "../screens/bottom/Profile";

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  const TabArr = [
    {
      id: 0,
      route: "Home",
      label: "Home",
      iconType: "Octicons",
      iconName: "home",
      component: Home,
    },
    {
      id: 1,
      route: "Data",
      label: "Data",
      iconType: "MaterialIcons",
      iconName: "cell-tower",
      component: Data,
    },
    {
      id: 2,
      route: "Notification",
      label: "Notification",
      iconType: "Feather",
      iconName: "bell",
      component: Notification,
    },
    {
      id: 3,
      route: "AppDrawer",
      label: "Profile",
      iconType: "Feather",
      iconName: "user",
      component: Profile,
    },
  ];

  const [tabBarVisible, setTabBarVisible] = React.useState(true);

  React.useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      () => setTabBarVisible(false)
    );

    const hideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => setTabBarVisible(true)
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { padding: moderateScale(10) },
      }}
      tabBar={(props) =>
        tabBarVisible ? <CustomBottomTabBar {...props} colors={Colors} /> : null
      }
    >
      {TabArr.map((item) => (
        <Tab.Screen
          key={item.id}
          name={item.route}
          component={item.component}
          options={{
            tabBarLabel: item.label,
          }}
          initialParams={{
            iconType: item.iconType,
            iconName: item.iconName,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
