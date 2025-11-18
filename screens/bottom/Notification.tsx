import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import CustomText from '../../customs/CustomText'
import NoData from '../../customs/Cards/NoData'
import Header from '../../customs/Headers/Header'
import { moderateScale } from '../../components/Matrix/Responsive'

const Notification = () => {
  return (
    <Container>
      {/* <Header title='Notifications' /> */}
      <CustomText text='Notifications' weight='700' size={22} customStyle={{marginTop:moderateScale(10)}} />
      <NoData text='No Notifications' />
    </Container>
  )
}

export default Notification

const styles = StyleSheet.create({})