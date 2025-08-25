import React , {useState, useEffect, useRef} from 'react';
import {View, Image, FlatList, TouchableOpacity, Text, Alert, Dimensions, StatusBar } from 'react-native';
import styles from '../SalonProfile.styles';
import Colors from '../../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {useSalonAssets} from '../hooks/useSalonAssets';
import { useTranslation } from '../../../../contexts/TranslationContext';
import ImageView from 'react-native-image-viewing';

interface PortfolioTabProps {
  assets: Array<{id: number; file_path: string}>;
  onAssetsUpdated?: () => void;
}

const PortfolioTab: React.FC<PortfolioTabProps> = ({assets, onAssetsUpdated}) => {
  const {user, token} = useSelector((state: RootState) => state.auth);
  const salonId = user?.id;
  const {handleUploadImages} = useSalonAssets(salonId!);
  const { t, isRTL } = useTranslation();
  
  // Instagram-style grid constants
  const numColumns = 3;
  const screenWidth = Dimensions.get('window').width;
  const imageSize = (screenWidth - 32) / numColumns; // Account for container padding

  // Image viewer state - useState for initial open index, useRef for live tracking
  const [isViewerVisible, setViewerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);

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
        
        // Close viewer if it's open
        if (isViewerVisible) {
          setViewerVisible(false);
        }
      } else {
        Alert.alert(t.salonProfile.portfolio.uploadError, t.salonProfile.portfolio.deleteError);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      Alert.alert(t.salonProfile.portfolio.uploadError, t.salonProfile.portfolio.deleteError);
    }
  };

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    currentIndexRef.current = index; // Sync both state and ref
    setViewerVisible(true);
  };

  const handleImageIndexChange = (index: number) => {
    currentIndexRef.current = index; // Fast, no re-render
  };

  const handleDeleteCurrentImage = () => {
    const assetId = assets[currentIndexRef.current]?.id;
    if (assetId) {
      handleDeleteImage(assetId);
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <TouchableOpacity 
        style={[styles.portfolioItem, { width: imageSize, height: imageSize }]}
        onPress={() => openViewer(index)}
      >
        <Image
          source={{uri: `https://spa.dev2.prodevr.com/${item.file_path}`}}
          style={[styles.portfolioImage, { width: imageSize, height: imageSize }]}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={[styles.deleteButton, isRTL && styles.deleteButtonRTL]}
          onPress={() => handleDeleteImage(item.id)}>
          <Icon name="delete" size={20} color={Colors.white} />
        </TouchableOpacity>
      </TouchableOpacity>
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

  const renderImageViewerHeader = () => (
    <View style={styles.viewerHeader}>
      <TouchableOpacity 
        style={styles.viewerDeleteButton}
        onPress={handleDeleteCurrentImage}
      >
        <Icon name="delete" size={24} color={Colors.white} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.viewerCloseButton}
        onPress={() => setViewerVisible(false)}
      >
        <Icon name="close" size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.portfolioContainer, isRTL && styles.portfolioContainerRTL]}>
      <StatusBar 
        backgroundColor={Colors.white} 
        barStyle="light-content" 
      />
      
      <FlatList
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={[styles.portfolioList, isRTL && styles.portfolioListRTL]}
        showsVerticalScrollIndicator={false}
      />

      <ImageView
        images={assets.map(img => ({uri: `https://spa.dev2.prodevr.com/${img.file_path}`}))}
        imageIndex={currentIndex}
        visible={isViewerVisible}
        onRequestClose={() => setViewerVisible(false)}
        onImageIndexChange={handleImageIndexChange}
        HeaderComponent={renderImageViewerHeader}
      />
    </View>
  );
};

export default PortfolioTab; 