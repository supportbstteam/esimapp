import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../bottom/Home";
import Data from "../../bottom/Data";
import Profile from "../../bottom/Profile";
import Colors from "../../../utils/Color";
import CustomBottomTabBar from "../../../customs/CustomBottomTabBar";
import { View } from "react-native";
import { BottomTabs } from "../../../customs/CustomBottom";

const Tab = createBottomTabNavigator();

const HomeBlank = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }} >
            <BottomTabs />
        </View>
    );
};

export default HomeBlank;
