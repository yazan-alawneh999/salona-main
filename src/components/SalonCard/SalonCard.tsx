import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './SalonCard.styles';
interface SalonCardProps {
  image: any; 
  name: string; 
  location: string; 
  distance: string; 
  onPress: () => void; 
}

const SalonCard: React.FC<SalonCardProps> = ({ image, name, location, distance, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image source={image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardSubtitle}>{location} {distance}</Text>
      </View>
    </TouchableOpacity>
  );
};


export default SalonCard;
