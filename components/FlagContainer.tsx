import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import SvgUri from 'react-native-svg-uri';
import { moderateScale } from './Matrix/Responsive';
import Colors from '../utils/Color';

const CONTINENT_FLAGS: any = {
  asia: "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_of_Asia_%28political%29.svg",
  europe: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Europe_blank_map_%28continent%29.svg",
  africa: "https://upload.wikimedia.org/wikipedia/commons/8/86/Africa_satellite_image_with_country_outlines.png",
  oceania: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Oceania_laea_location_map.svg",
  americas: "https://upload.wikimedia.org/wikipedia/commons/2/26/Americas.svg",
};

const INVALID_ISO_CODES = ["EU", "EUE", "WORLD"];

const FlagContainer = ({ country }: any) => {
  if (!country) return <View style={styles.container} />;

  const name = country?.name?.toLowerCase();
  const iso2 = country?.isoCode?.toUpperCase() || country?.iso2?.toUpperCase();

  // 1️⃣ Continent flag first
  if (CONTINENT_FLAGS[name]) {
    return (
      <View style={styles.container}>
        <SvgUri width="100%" height="100%" source={{ uri: CONTINENT_FLAGS[name] }} />
      </View>
    );
  }

  // 2️⃣ Skip invalid ISO codes like "EU", "EUE"
  if (iso2 && !INVALID_ISO_CODES.includes(iso2)) {
    const flagUrl = `https://flagcdn.com/w80/${iso2.toLowerCase()}.png`;
    return (
      <View style={styles.container}>
        <FastImage style={styles.img} source={{ uri: flagUrl }} resizeMode="cover" />
      </View>
    );
  }

  // 3️⃣ Fallback: get flag by name (works for ALL countries)
  if (country?.name) {
    const fallbackUrl = `https://countryflagsapi.com/png/${encodeURIComponent(country.name)}`;
    return (
      <View style={styles.container}>
        <FastImage style={styles.img} source={{ uri: fallbackUrl }} resizeMode="cover" />
      </View>
    );
  }

  // 4️⃣ Default empty container
  return <View style={styles.container} />;
};

export default FlagContainer;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: 100,
    backgroundColor: Colors.activeBlur,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
