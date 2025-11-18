import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

interface CustomTextProps {
  text: string;
  customStyle?: StyleProp<TextStyle>;
  weight?: TextStyle["fontWeight"]; 
  size?: number;
  color?: string;
  family?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  text,
  customStyle,
  weight = "400",
  size = 15,
  color = "#000",
  family,
}) => {
  return (
    <Text
      style={[
        customStyle,
        {
          fontWeight: weight,
          fontSize: size,
          fontFamily: family,
          color: color,
        },

      ]}
    >
      {text}
    </Text>
  );
};

export default CustomText;
