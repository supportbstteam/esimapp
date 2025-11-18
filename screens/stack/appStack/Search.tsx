import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import Container from '../../../components/Container'
import { horizontalScale, moderateScale, verticalScale } from '../../../components/Matrix/Responsive'
import Colors from '../../../utils/Color'
import { globalStyle } from '../../../utils/GlobalStyle'
import CustomIcon from '../../../customs/CustomIcon'

const Search = () => {
  return (
    <Container>
      <View style={{ marginTop: verticalScale(20) }} />
      <View style={[globalStyle.row, styles.inputView]} >
        <CustomIcon
          type='AntDesign'
          name='search1'
          color={Colors.primary}
        />
        <TextInput
          style={[styles.input,{fontSize:16}]}
          
          placeholderTextColor={Colors.gray_font}
          placeholder='Choose your destination'
          autoCapitalize='sentences'
          autoFocus={true}
        />
      </View>
    </Container>
  )
}

export default Search

const styles = StyleSheet.create({

  input: {
    color: "black",
  },
  inputView: {
    borderWidth: 1,
    color: "black",
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    borderColor: Colors.primary,
    paddingHorizontal:horizontalScale(5),
    fontSize:20
  }
})