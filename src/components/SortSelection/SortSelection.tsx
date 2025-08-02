import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './SortSelection.styles';

interface SortSelectionSectionProps {
  title: string;
  options: string[];
}

const SortSelectionSection: React.FC<SortSelectionSectionProps> = ({
  title,
  options,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    console.log(`Selected: ${option}`);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => handleOptionPress(option)}>
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedOptionText,
              ]}>
              {option}
            </Text>
            <View
              style={[
                styles.checkbox,
                selectedOption === option && styles.selectedCheckbox,
              ]}>
              {selectedOption === option && (
                <Icon name="check" size={16} color={Colors.black} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};



export default SortSelectionSection;
