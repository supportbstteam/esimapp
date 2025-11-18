import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useState } from 'react'
import Container from '../../components/Container'
import CustomText from '../../customs/CustomText'
import CustomIcon from '../../customs/CustomIcon'
import Colors from '../../utils/Color'
import { moderateScale, verticalScale } from '../../components/Matrix/Responsive'
import { globalStyle } from '../../utils/GlobalStyle'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import ProfileHeader from '../../customs/Headers/ProfileHeader'
import UserDetailHeader from '../../customs/Headers/UserDetailHeader'
import axios from 'axios'
import { api } from '../../utils/ApiService'

const Profile = () => {
  const navigation: any = useNavigation();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>([]);

  const fetchOrderSummary = async () => {
    setLoading(true);
    try {
      const response: any = await api({
        url: "user/sim/summary",
        method: "GET"
      });

      // console.log("-=-=-=-= response in the fetch order summary --=-=-=-=", response);

      if (response?.status === "success") {
        setStats(response?.data);
      }
    }
    catch (err: any) {
      console.error("Error in the fetch order summary:", err);
    }
    finally {
      setLoading(false);
    }
  }


  console.log("-=-=-=-=-= stats -=-=-=-=-=-=", stats);

  useFocusEffect(useCallback(() => {
    fetchOrderSummary();
  }, []));
  return (
    <Container>
      <View>
        <ProfileHeader />
        <UserDetailHeader />
        {
          stats && (
            <>
              {/* total esims */}
              <View style={[globalStyle.between, styles.planContainer]} >
                <View>
                  <CustomText text='Total Esims' weight="600" color={Colors.text_secondary} />
                  <CustomText text={stats?.totalSims || 0} size={20} weight="600" />
                </View>
                <View style={[globalStyle.center, styles.iconContainer]} >
                  <CustomIcon
                    type='Ionicons'
                    color={Colors.primary}
                    name='hardware-chip-outline'
                  />
                </View>
              </View>

              {/* total esims */}
              <View style={[globalStyle.between, styles.planContainer]} >
                <View>
                  <CustomText text='Total Data' weight="600" color={Colors.text_secondary} />
                  <CustomText text={`${stats?.totalData || 0} GB`} size={20} weight="600" />
                </View>
                <View style={[globalStyle.center, styles.iconContainer]} >
                  <CustomIcon
                    type='Feather'
                    name='wifi'
                    color={Colors.primary}
                  />
                </View>
              </View>

              {/* total esims */}
              <View style={[globalStyle.between, styles.planContainer]} >
                <View>
                  <CustomText text='Total Plans' weight="600" color={Colors.text_secondary} />
                  <CustomText text={stats?.planSummary ? stats?.planSummary.length : 0} size={20} weight="600" />
                </View>

                <View style={[globalStyle.center, styles.iconContainer]} >
                  <CustomIcon
                    type='Feather'
                    name='layers'
                    color={Colors.primary}
                  />
                </View>
              </View>

            </>
          )
        }



      </View>
    </Container>
  )
}

export default Profile

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "#ececec",
    marginBottom: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    marginHorizontal: moderateScale(5),
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    elevation: 2
  },
  planContainer: {
    width: "100%",
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(10),
    borderColor: Colors.lightGray,
    borderWidth: 1,
    marginBottom: moderateScale(10),
    height: verticalScale(100)
  },
  iconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.activeBlur
  }
})