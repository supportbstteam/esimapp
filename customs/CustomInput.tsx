import React, { useRef, useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
    StyleProp,
    ViewStyle,
} from 'react-native';
import CustomText from './CustomText';
import CustomIcon from './CustomIcon';
import { horizontalScale, moderateScale, verticalScale } from '../components/Matrix/Responsive';
import Colors from '../utils/Color';

// Define prop types for CustomInput
interface CustomInputProps extends TextInputProps {
    text?: string;
    values?: string;
    placeholder?: string;
    multiline?: boolean;
    numOfLine?: number;
    maxLength?: number;
    keyboardType?: TextInputProps['keyboardType'];
    onBlur?: () => void;
    handleChangeText: (text: string) => void;
    textColor?: string;
    autoCaptital?: TextInputProps['autoCapitalize'];
    borderColor?: string;
    editable?: boolean;
    isRequired?: boolean;
    customStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    isSecure?: boolean; // old prop, still supported
    showCross?: boolean;
    color?: string;
    isPassword?: boolean; // 👁️ new prop for password fields
}

const CustomInput: React.FC<CustomInputProps> = ({
    text,
    values,
    placeholder,
    isRequired = false,
    multiline = false,
    numOfLine = 4,
    maxLength,
    keyboardType,
    color = "#000",
    onBlur,
    handleChangeText,
    textColor = "#000",
    autoCaptital = 'none',
    editable = true,
    customStyle,
    isSecure = false,
    showCross = false,
    inputStyle,
    isPassword = false, // 👁️ default false
    ...props
}) => {
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false); // 👁️ toggle state

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        setIsFocused(false);
        if (onBlur) onBlur();
    };

    const clearInput = () => {
        if (handleChangeText) handleChangeText('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={[styles.container, customStyle]}>
            {(text || isRequired) && (
                <View style={{ flexDirection: 'row', marginBottom: moderateScale(3) }}>
                    <CustomText
                        text={text || ""}
                        size={15}
                        weight="500"
                        color={color}
                    />
                    {isRequired && (
                        <CustomText
                            text=" *"
                            size={15}
                            weight="500"
                            color="red"
                        />
                    )}
                </View>
            )}

            <View style={styles.inputWrapper}>
                <TextInput
                    multiline={multiline}
                    autoCapitalize={autoCaptital}
                    numberOfLines={multiline ? numOfLine : 1}
                    secureTextEntry={isPassword ? !showPassword : isSecure}
                    editable={editable}
                    ref={inputRef}
                    style={[
                        styles.input,
                        {
                            borderColor: isFocused ? Colors.primary : Colors.gray,
                            color: textColor,
                            textAlignVertical: multiline ? 'top' : 'auto',
                            borderWidth: isFocused ? 1 : 0,
                        },
                        inputStyle,
                    ]}
                    placeholderTextColor={Colors.gray}
                    onChangeText={handleChangeText}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    value={values}
                    {...props}
                />

                {/* ❌ Clear Input Button */}
                {values && showCross && (
                    <TouchableOpacity style={[styles.iconButton, { right: 50 }]} onPress={clearInput}>
                        <CustomIcon name="cross" type="Entypo" size={20} color="#999" />
                    </TouchableOpacity>
                )}

                {/* 👁️ Password Visibility Toggle */}
                {isPassword && (
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={[styles.iconButton, { right: 15 }]}
                    >
                        <CustomIcon
                            name={showPassword ? "eye" : "eye-off"}
                            type="Feather"
                            size={20}
                            color={Colors.gray_font}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(15),
    },
    inputWrapper: {
        position: 'relative',
    },
    input: {
        paddingHorizontal: moderateScale(15),
        color: Colors.text_primary,
        borderWidth: 0.5,
        backgroundColor: '#fff',
        borderRadius: horizontalScale(8),
        textAlign: 'auto',
        elevation: 2,
        fontSize: 15,
        height: moderateScale(50),
    },
    iconButton: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -10 }],
        padding: 4,
        zIndex: 10,
    },
});

export default CustomInput;
