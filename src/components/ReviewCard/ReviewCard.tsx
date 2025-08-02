import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from '../../contexts/TranslationContext';
interface ReviewCardProps {
  reviewerName: string;
  rating: number;
  review: string;
  time: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  rating,
  review,
  time,
}) => {
  const { isRTL } = useTranslation();
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="star"
        size={16}
        color={index < rating ? Colors.gold : Colors.softGray}
        style={styles.star}
      />
    ));
  };

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.header, { flexDirection: !isRTL ? 'row' : 'row-reverse' }]}>
        <Image
          source={require('../../assets/images/beautician1.png')}
          style={styles.profileImage}
        />
        <View style={[styles.nameAndRating, { marginLeft: !isRTL ? 10 : 0 }]}>
          <Text style={[styles.name, { textAlign: !isRTL ? 'left' : 'right' }]}>{reviewerName}</Text>
          <View style={[styles.starsContainer, { flexDirection: !isRTL ? 'row' : 'row-reverse' }]}>{renderStars()}</View>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text style={styles.reviewText}>{review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.black,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gold,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // marginRight: 10,
  },
  nameAndRating: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
  },
  name: {
    
    fontSize: 14,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
  },

  starsContainer: {
    flexDirection: 'row-reverse',
  },
  star: {
    // marginRight: 2,
  },
  time: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.gold,
  },
  reviewText: {
    fontSize: 13,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    lineHeight: 18,
  },
});

export default ReviewCard;
