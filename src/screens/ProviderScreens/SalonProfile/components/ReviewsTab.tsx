import React from 'react';
import {FlatList} from 'react-native';
import styles from '../SalonProfile.styles';
import ReviewCard from '../../../../components/ReviewCard/ReviewCard';
import { useTranslation } from '../../../../contexts/TranslationContext';
interface Review {
  id: number;
  user_id: number;
  rate: number;
  message: string;
  created_at: string;
}

interface ReviewsTabProps {
  reviews: Review[];
}
const ReviewsTab: React.FC<ReviewsTabProps> = ({reviews}) => {
  const { isRTL } = useTranslation();
  return (
    <FlatList
      data={reviews || []}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <ReviewCard
          reviewerName={`User ${item.user_id}`}
          rating={item.rate}
          review={item.message}
          time={item.created_at || 'N/A'}
        />
      )}
      contentContainerStyle={styles.reviewsList}
    />
  );
};

export default ReviewsTab; 