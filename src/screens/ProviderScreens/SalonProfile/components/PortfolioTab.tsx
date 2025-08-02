import React , {useEffect} from 'react';
import {View, Image, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import styles from '../SalonProfile.styles';
import Colors from '../../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {useSalonAssets} from '../hooks/useSalonAssets';
import { useTranslation } from '../../../../contexts/TranslationContext';

interface PortfolioTabProps {
  assets: Array<{id: number; file_path: string}>;
  onAssetsUpdated?: () => void;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({assets, onAssetsUpdated}) => {
  const {user, token} = useSelector((state: RootState) => state.auth);
  const salonId = user?.id;
  const {handleUploadImages} = useSalonAssets(salonId!);
  const { t, isRTL } = useTranslation();
// useEffect(() => {
//   console.log('assets', assets);
// }, [assets]); 
  const handleDeleteImage = async (assetId: number) => {
    try {
      if (!token) {
        Alert.alert(t.salonProfile.portfolio.uploadError);
        return;
      }

      const response = await fetch(`https://spa.dev2.prodevr.com/api/salons/${assetId}/delete-asset`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ asset_id: assetId })
      });

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Show success message
        Alert.alert(t.salonProfile.portfolio.deleteSuccess);
        
        // Refetch assets after successful deletion
        if (onAssetsUpdated) {
          onAssetsUpdated();
        }
      } else {
        Alert.alert(t.salonProfile.portfolio.uploadError, t.salonProfile.portfolio.deleteError);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      Alert.alert(t.salonProfile.portfolio.uploadError, t.salonProfile.portfolio.deleteError);
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const isFullWidth = (index + 1) % 3 === 0;
    return (
      <View
        style={[
          styles.portfolioItem,
          isFullWidth && styles.portfolioItemFullWidth,
          isRTL && styles.portfolioItemRTL
        ]}>
        <Image
          source={{uri: `https://spa.dev2.prodevr.com/${item.file_path}`}}
          style={[styles.portfolioImage, isFullWidth && styles.portfolioImageFullWidth]}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={[styles.deleteButton, isRTL && styles.deleteButtonRTL]}
          onPress={() => handleDeleteImage(item.id)}>
          <Icon name="delete" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => (
    <TouchableOpacity
      style={[styles.uploadButton, isRTL && styles.uploadButtonRTL]}
      onPress={handleUploadImages}>
      <Icon name="add" size={24} color={Colors.gold} />
      <Text style={[styles.uploadText, isRTL && styles.uploadTextRTL]}>
        {t.salonProfile.portfolio.uploadImages}
      </Text>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={[styles.emptyContainer, isRTL && styles.emptyContainerRTL]}>
      <Text style={[styles.emptyText, isRTL && styles.emptyTextRTL]}>
        {t.salonProfile.portfolio.noImages}
      </Text>
    </View>
  );

  return (
    <View style={[styles.portfolioContainer, isRTL && styles.portfolioContainerRTL]}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        key={2}
        contentContainerStyle={[styles.portfolioList, isRTL && styles.portfolioListRTL]}
      />
    </View>
  );
};

export default PortfolioTab; 