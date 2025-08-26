import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from '../../contexts/TranslationContext';
interface ProfileHeaderProps {
  image: any; // Profile image
  name: string; // Name of the profile
  title?: string; // Profile title
  rating?: number; // Rating (out of 5)
  reviews?: number; // Number of reviews
  email?: string;
  favorite?: boolean; // Is this profile a favorite?
  back?: boolean;
  onBackPress?: () => void; // Back button callback
  onFavoritePress?: () => void; // Favorite button callback
  isProvider?: boolean;
  isUser?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  image,
  name,
  title,
  rating,
  reviews,
  email,
  onBackPress,
  onFavoritePress,
  favorite,
  isProvider = true,
  back = true,
  isUser = false,
  onShare,
}) => {
  const {t, isRTL} = useTranslation();
  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity
          onPress={onBackPress}
          style={[
            styles.backButton,
            isRTL ? styles.backButtonRTL : styles.backButtonLTR,
          ]}>
          <Icon
            name={isRTL ? 'arrow-forward' : 'arrow-back'}
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
      )}
      {/* 
      <TouchableOpacity
        onPress={onShare}
        style={[
          styles.shareButton,
          isRTL ? styles.backButtonRTL : styles.backButtonLTR,
        ]}>
        <Icon name="ios-share" size={24} color={Colors.white} />
      </TouchableOpacity> */}
      {isProvider && !isUser && (
        <TouchableOpacity
          onPress={onFavoritePress}
          style={[
            styles.favoriteButton,
            isRTL ? styles.favoriteButtonRTL : styles.favoriteButtonLTR,
          ]}>
          <Icon
            name={favorite ? 'favorite' : 'favorite-border'}
            size={24}
            color={favorite ? Colors.red : Colors.white}
          />
        </TouchableOpacity>
      )}

      <View style={styles.profileImageWrapper}>
        <Image
          source={
            !isProvider
              ? require('../../assets/images/prettyLogo.png')
              : typeof image === 'string'
              ? {uri: image}
              : image
          }
          style={styles.profileImage}
        />
      </View>

      <Text style={styles.name}>{name}</Text>
      {email && <Text style={styles.email}>{email}</Text>}

      {title && <Text style={styles.title}>{title}</Text>}

      {rating !== undefined && reviews !== undefined && (
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{'⭐'.repeat(Math.round(rating))}</Text>
          <Text style={styles.reviews}>{`(${reviews} Reviews)`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    zIndex: 2,
  },
  shareButton: {
    position: 'absolute',
    top: 20,
    start: 60,
    zIndex: 2,
  },
  backButtonLTR: {
    left: 20,
  },
  backButtonRTL: {
    right: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    zIndex: 2,
  },
  favoriteButtonLTR: {
    right: 20,
  },
  favoriteButtonRTL: {
    left: 20,
  },
  profileImageWrapper: {
    marginTop: 60,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.black,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 21,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
    // marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
    // marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 5,
  },
  rating: {
    fontSize: 12,
    color: Colors.gold,
    fontFamily: 'Maitree-Bold',
    marginRight: 5,
  },
  reviews: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
  },
});

export default ProfileHeader;
