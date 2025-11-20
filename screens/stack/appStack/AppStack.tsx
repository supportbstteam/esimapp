import { View, Text } from 'react-native'
import React from 'react'
import Search from './Search';
import HomeBlank from './HomeBlank';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from './Cart';
import Checkout from './Checkout';
import CountryPlans from './CountryPlans';
import OrderStatus from './OrderStatus';
// import Orders from './Orders';
// import EditProfile from './EditProfile';
import OrderDetails from './OrderDetails';
import SimDetails from './SimDetails';
import TopUp from './TopUp';
import TopUpOrder from './TopUpOrder';
import AppDrawer from '../../drawer/AppDrawer';
import ChangePassword from './ChangePassword';
import PopularCountries from './PopularCountries';
import FeaturePlans from './FeaturePlans';
const Stack = createNativeStackNavigator();
const AppStack = () => {

  const authScreens = [
    { id: 0, name: "AppDrawer", component: AppDrawer },
    { id: 1, name: "Search", component: Search },
    { id: 2, name: "Cart", component: Cart },
    { id: 3, name: "Checkout", component: Checkout },
    { id: 4, name: "CountryPlans", component: CountryPlans },
    { id: 5, name: "OrderStatus", component: OrderStatus },
    // { id: 6, name: "Orders", component: Orders },
    // { id: 7, name: "EditProfile", component: EditProfile },
    { id: 8, name: "OrderDetails", component: OrderDetails },
    { id: 9, name: "SimDetails", component: SimDetails },
    { id: 10, name: "TopUp", component: TopUp },
    { id: 11, name: "TopUpOrder", component: TopUpOrder },
    { id: 12, name: "ChangePassword", component: ChangePassword },
    { id: 13, name: "PopularCountries", component: PopularCountries },
    { id: 14, name: "FeaturePlans", component: FeaturePlans },
  ];
  return (
    <View style={{flex:1, backgroundColor:"#fff"}} >
      <Stack.Navigator
        initialRouteName="AppDrawer"
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
    </View>
  )
}

export default AppStack