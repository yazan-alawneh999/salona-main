import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface CategoryItemProps {
  image: any;
  label: string;
  onPress: () => void;
}

const CategoryItem = ({ image, label, onPress }: CategoryItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 30,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Maitree-Regular',
  },
});

export default CategoryItem;
