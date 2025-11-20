import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/Store';
import { useFocusEffect } from '@react-navigation/native';
import { fetchCountries } from '../../../redux/thunk/thunk';
import Container from '../../../components/Container';
import Header from '../../../customs/Headers/Header';
import { moderateScale, screenWidth } from '../../../components/Matrix/Responsive';
import CountryCard from '../../../customs/Cards/CountryCard';
import CountryCardSkeleton from '../../../customs/Skeleton/CountrySkeleton';

const PopularCountries = () => {
  const dispatch = useAppDispatch();
  const { countries, loading } = useAppSelector((state) => state?.country);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        await dispatch(fetchCountries());
      })();
    }, [dispatch])
  );


  if (loading) {
    return (
      <Container>
        <Header title='Countries' />
        <FlatList
          data={[1, 2, 3]}
          // horizontal
          contentContainerStyle={{
            gap: moderateScale(15),
            marginTop: moderateScale(10),
            alignSelf:"center"
          }}
          showsVerticalScrollIndicator={false}
          renderItem={() => <CountryCardSkeleton width={screenWidth * .9} />}
          keyExtractor={(i) => i.toString()}
        />

      </Container>
    )
  }

  return (
    <Container>
      <Header title='Countries' />
      <FlatList
        data={countries}
        keyExtractor={(item) => item?.id?.toString()}
        // horizontal
        contentContainerStyle={{
          gap: moderateScale(15),
          marginTop: moderateScale(10),
          alignSelf:"center"
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CountryCard width={screenWidth * .9} item={item} />}
      />
    </Container>
  )
}

export default PopularCountries

const styles = StyleSheet.create({})