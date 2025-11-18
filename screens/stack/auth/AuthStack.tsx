import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import SignUp from "./SignUp";
import OtpVerification from "./OtpVerification";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const authScreens = [
    { id: 0, name: "Login", component: Login },
    { id: 1, name: "SignUp", component: SignUp },
    { id: 2, name: "OtpVerification", component: OtpVerification },
    { id: 3, name: "ForgetPassword", component: ForgetPassword },
    { id: 4, name: "ResetPassword", component: ResetPassword },
  ];

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {authScreens.map((item) => (
        <Stack.Screen
          key={item.id}
          name={item.name}
          component={item.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
