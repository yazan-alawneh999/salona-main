import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {styles} from './CustomButton.styles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onPress,
  backgroundColor = '#FFD700',
  textColor = '#000',
  borderRadius = 25,
  style,
  textStyle,
  loading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor, borderRadius},
        style,
        (loading || disabled) && {opacity: 0.7},
      ]}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.buttonText, {color: textColor}, textStyle]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
