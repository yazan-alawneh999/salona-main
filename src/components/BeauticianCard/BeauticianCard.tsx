import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';

interface BeauticianCardProps {
  image: any; // Image source
  name: string; // Beautician's name
  profession: string; // Profession (e.g., Beautician)
  rating: number; // Rating
  onPress: () => void; // Card press action
  style?: ViewStyle;
}

const BeauticianCard: React.FC<BeauticianCardProps> = ({
  image,
  name,
  profession,
  rating,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.profession} numberOfLines={1}>
          {profession}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color={Colors.gold} />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
    overflow: 'hidden',
    width: '48%',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    marginBottom: 4,
  },
  profession: {
    color: Colors.softGray,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: Colors.white,
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
  },
});

export default BeauticianCard;

