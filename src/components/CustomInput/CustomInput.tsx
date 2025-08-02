import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import {useTranslation} from '../../contexts/TranslationContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CustomInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  isPassword?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  secureTextEntry = false,
  isPassword = false,
  ...props
}) => {
  const {isRTL} = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isPassword && styles.passwordInput]}
          placeholder={placeholder}
          placeholderTextColor={Colors.softGray}
          secureTextEntry={isPassword ? !showPassword : secureTextEntry}
          {...props}
          textAlign={isRTL ? 'right' : 'left'}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}>
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={24}
              color={Colors.gold}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.customBlack,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.softGray,
    borderRadius: 12,
    backgroundColor: Colors.black,
  },
  input: {
    flex: 1,
    padding: 10,
    color: Colors.white,
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    padding: 10,
    position: 'absolute',
    right: 0,
  },
});

export default CustomInput;
