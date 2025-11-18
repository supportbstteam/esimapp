import 'react-native-reanimated';
import React from "react";
import { Provider } from "react-redux";
import { View } from "react-native";
import { store } from "./redux/Store";
import AppStack from "./screens/stack/appStack/AppStack";
import Container from "./components/Container";
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './screens/stack/AppNavigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import RNBootSplash from "react-native-bootsplash";
const Home = () => {
  // const dispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.user);

  return (
    <StripeProvider publishableKey="pk_test_51SIQgMFM5tPZt8ZRRL4Bo2HyRZWLa9upsTfpv4sEqpOV9K1LCIaV42k9Z14pZxAh1vVpRaRn7eBk6Y8bEHF4jVMV00I0kbI9bE">
      <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })} >
        <AppNavigation />
        <Toast />
      </NavigationContainer>
    </StripeProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
