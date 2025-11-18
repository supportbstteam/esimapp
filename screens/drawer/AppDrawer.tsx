import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Orders from './Orders';
import LogoutModal from '../../customs/LogoutModal';
import CustomDrawerContent from '../../customs/CustomDrawer';
import ContactUs from './ContactUs';
import HomeBlank from '../stack/appStack/HomeBlank';
import EditProfile from './EditProfile';

const Drawer: any = createDrawerNavigator();

const AppDrawer = () => {
  const [logoutVisible, setLogoutVisible] = useState(false);

  return (
    <>
      <Drawer.Navigator
        id="ProfileDrawerRoot"           // optional but fine to keep
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          swipeEnabled: false,
          drawerPosition: "right",   // <-- HERE (IMPORTANT)
        }}
        // <-- pass the drawer props into your custom drawer component
        drawerContent={(props: any) => (
          <CustomDrawerContent {...props} setLogoutVisible={setLogoutVisible} />
        )}
      >
        {/* Drawer screens */}
        <Drawer.Screen name="HomeBlank" component={HomeBlank} />
        <Drawer.Screen name="EditProfile" component={EditProfile} />
        <Drawer.Screen name="Orders" component={Orders} />
        <Drawer.Screen name="ContactUs" component={ContactUs} />
      </Drawer.Navigator>

      <LogoutModal visible={logoutVisible} setVisible={setLogoutVisible} />
    </>
  );
};

export default AppDrawer;
