import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { fetchUserDetails } from '../../redux/slice/UserSlice';
import AppStack from './appStack/AppStack';
import AuthStack from './auth/AuthStack';
import { globalStyle } from '../../utils/GlobalStyle';
import { moderateScale, screenHeight, screenWidth } from '../../components/Matrix/Responsive';
import { Images } from '../../utils/Images';
import Loader from '../../customs/Loader';

const AppNavigation = () => {

  const dispatch = useAppDispatch();
  const { user, isAuth, loading, error } = useAppSelector(state => state?.user);
  const fetchUserLogin = async () => {
    await dispatch(fetchUserDetails());
  }
  useEffect(() => {
    fetchUserLogin();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={[globalStyle.center, { flex: 1, backgroundColor: "#fff" }]} >
        {/* <Images.Logo
          width={screenWidth * .5}
          height={screenHeight * .5}
        /> */}
        <Loader size={moderateScale(100)} />
      </View>
    )
  }
  // console.log("----- user -----", user);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }} >
      {
        isAuth ? <AppStack /> : <AuthStack />
      }
    </View>
  )
}

export default AppNavigation;