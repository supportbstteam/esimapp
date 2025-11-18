import { View, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { useState, useMemo } from 'react'
import Container from '../../../components/Container'
import { horizontalScale, moderateScale, verticalScale } from '../../../components/Matrix/Responsive'
import Colors from '../../../utils/Color'
import { globalStyle } from '../../../utils/GlobalStyle'
import CustomIcon from '../../../customs/CustomIcon'
import { useAppSelector } from '../../../redux/Store'
import CountryCard from '../../../customs/Cards/CountryCard'
import CustomText from '../../../customs/CustomText'

const Search = () => {
  const { countries } = useAppSelector((state) => state?.country);

  const [searchText, setSearchText] = useState("");

  // --------------------------
  // Filtering Logic (Fast & Clean)
  // --------------------------
  const filteredCountries = useMemo(() => {
    if (!searchText.trim()) return countries; // show all if no search

    const query = searchText.toLowerCase().trim();

    return countries.filter((c:any) =>
      c?.name?.toLowerCase().includes(query) ||
      c?.isoCode?.toLowerCase().includes(query) ||
      c?.iso3Code?.toLowerCase().includes(query)
    );
  }, [searchText, countries]);

  return (
    <Container>

      <View style={{ marginTop: verticalScale(20) }} />

      {/* SEARCH BAR */}
      <View style={[globalStyle.row, styles.inputView]} >
        <CustomIcon
          type='AntDesign'
          name='search1'
          color={Colors.primary}
        />

        <TextInput
          style={[styles.input]}
          placeholderTextColor={Colors.gray_font}
          placeholder='Choose your destination'
          autoCapitalize='none'
          autoFocus={true}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={{
          gap: moderateScale(10),
          marginTop: moderateScale(10),
          paddingBottom: moderateScale(30),
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CountryCard item={item} width="100%" />
        )}
        ListEmptyComponent={
          <View style={{ marginTop: moderateScale(40), alignItems: "center" }}>
            <CustomIcon
              type="Feather"
              name="search"
              color={Colors.gray_font}
              size={30}
            />
            <CustomText text='No Countries found' color='#ccc' customStyle={{marginTop:moderateScale(10)}} />
            {/* <Text style={{ color: Colors.gray_font, marginTop: 10 }}>
              No countries found
            </Text> */}
          </View>
        }
      />

    </Container>
  )
}

export default Search

const styles = StyleSheet.create({
  input: {
    color: "black",
    fontSize: 16,
    paddingHorizontal: horizontalScale(10)
  },
  inputView: {
    borderWidth: 1,
    height: moderateScale(50),
    borderRadius: moderateScale(10),
    borderColor: Colors.primary,
    paddingHorizontal: horizontalScale(5),
    alignItems: "center"
  }
})
