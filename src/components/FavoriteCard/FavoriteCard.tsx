import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface FavoriteCardProps {
  image: any;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  onFavoritePress: () => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  image,
  name,
  category,
  rating,
  reviews,
  onFavoritePress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={require('../../assets/icons/star.png')}
              style={[
                styles.starIcon,
                index + 1 > Math.round(rating) && styles.inactiveStar,
              ]}
            />
          ))}
          <Text style={styles.reviews}>({reviews})</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onFavoritePress}>
      <Image source={require('../../assets/icons/redheart.png')} style={styles.favoriteIcon} />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGray,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: Colors.gold,
  },
  category: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.gold,
    marginVertical: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 14,
    height: 14,
    marginRight: 2,
  },
  inactiveStar: {
    tintColor: Colors.softGray,
  },
  reviews: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    marginLeft: 5,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
  },
});

export default FavoriteCard;
