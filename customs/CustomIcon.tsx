import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

// ✅ Import all supported icon sets from react-native-vector-icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Zocial from 'react-native-vector-icons/Zocial';
// import Lucide from 'react-native-vector-icons/Luicide';

// ✅ Centralized icon registry
const iconSets = {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Foundation,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
  AntDesign,
} as const;

// ✅ Extract the literal union type
type IconType = keyof typeof iconSets;

// ✅ Optional helper to validate dynamic icon type strings
const isValidIconType = (type: string): type is IconType => {
  return Object.keys(iconSets).includes(type);
};

interface CustomIconProps {
  type: string; // can come dynamically (API, config, etc.)
  name: string;
  size?: number;
  color?: string;
  customStyle?: StyleProp<TextStyle>;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  type,
  name,
  size = 24,
  color = '#000',
  customStyle,
}) => {
  // ✅ Type-safe resolution (fallback to MaterialIcons if invalid)
  const IconComponent =
    isValidIconType(type) && iconSets[type]
      ? iconSets[type]
      : iconSets['MaterialIcons'];

  return (
    <IconComponent
      name={name}
      size={size}
      color={color}
      style={[customStyle, { padding: 0, margin: 0 }]}
    />
  );
};

export default CustomIcon;
