import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from '../../../components/Footer/Footer';
import { useNavigation } from '@react-navigation/native';
import { useGetFavoritesQuery, useToggleFavoriteSalonMutation } from '../../../redux/api/salonApi';
import { useTranslation } from '../../../contexts/TranslationContext';
import styles from './Favorites.styles';

interface FavoriteSalon {
  id: number;
  name: string;
  image_url: string | null;
  about: string;
  average_rating: string;
  ratings_received: any[];
  type: string;
}

interface FavoritesResponse {
  salons: FavoriteSalon[];
  success: boolean;
}

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { t, isRTL } = useTranslation();
  const { data: favoritesResponse, isLoading, error } = useGetFavoritesQuery();
  const [toggleFavorite] = useToggleFavoriteSalonMutation();

  React.useEffect(() => {
    console.log('Favorites data in component:', favoritesResponse);
    console.log('Favorites loading state:', isLoading);
    if (error) {
      console.error('Favorites error:', error);
    }
  }, [favoritesResponse, isLoading, error]);

  const handleFavoritePress = async (salonId: number) => {
    try {
      console.log('Removing favorite with ID:', salonId);
      await toggleFavorite({ salon_id: salonId }).unwrap();
      console.log('Successfully removed favorite with ID:', salonId);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleSalonPress = (salon: FavoriteSalon) => {
    navigation.navigate('SalonProfileScreen', {
      salon: {
        id: salon.id,
        name: salon.name,
        image: salon.image_url || '',
      },
      initialTab: 'Services'
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.gold} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{t.favorites.error}</Text>
      </View>
    );
  }

  const favorites = favoritesResponse?.salons || [];

  const renderSalonItem = ({ item }: { item: FavoriteSalon }) => (
    <TouchableOpacity 
      style={[localStyles.salonCard, isRTL && localStyles.salonCardRTL]}
      onPress={() => handleSalonPress(item)}
    >
      <Image
        source={item.image_url ? { uri: item.image_url } : require('../../../assets/images/alia-ahmad.png')}
        style={localStyles.salonImage}
      />
      <View style={[localStyles.salonInfo, isRTL && localStyles.salonInfoRTL]}>
        <Text style={localStyles.salonName}>{item.name}</Text>
        <View style={[localStyles.ratingContainer, isRTL && localStyles.ratingContainerRTL]}>
          <Icon name="star" size={16} color={Colors.gold} />
          <Text style={localStyles.ratingText}>{parseFloat(item.average_rating).toFixed(1)}</Text>
          <Text style={localStyles.reviewsText}>({item.ratings_received?.length || 0} {t.favorites.reviews})</Text>
        </View>
        <Text style={localStyles.salonType}>{item.type || 'Salon'}</Text>
      </View>
      <TouchableOpacity 
        style={localStyles.favoriteButton}
        onPress={() => handleFavoritePress(item.id)}
      >
        <Icon name="favorite" size={24} color={Colors.gold} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, !isRTL && styles.headerRTL]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.favorites.title}</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSalonItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t.favorites.noFavorites}</Text>
          </View>
        )}
      />
      <Footer />
    </View>
  );
};

const localStyles = StyleSheet.create({
  salonCard: {
    flexDirection: 'row',
    backgroundColor: Colors.black,
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  salonCardRTL: {
    flexDirection: 'row-reverse',
  },
  salonImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  salonInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  salonInfoRTL: {
    marginLeft: 0,
    marginRight: 12,
  },
  salonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainerRTL: {
    flexDirection: 'row-reverse',
  },
  ratingText: {
    marginLeft: 4,
    color: Colors.white,
    fontWeight: '500',
  },
  reviewsText: {
    marginLeft: 4,
    color: Colors.white,
    fontSize: 12,
  },
  salonType: {
    color: Colors.white,
    fontSize: 14,
  },
  favoriteButton: {
    padding: 8,
    justifyContent: 'center',
  },
});

export default FavoritesScreen;

