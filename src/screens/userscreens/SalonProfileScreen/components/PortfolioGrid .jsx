import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Colors from '../../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - 32) / numColumns; // Account for container padding

const PortfolioGrid = ({data, tr}) => {
  const assets = data?.salons?.assets || [];
  const portfolioImages = assets.filter(asset => asset.type === 'portfolio');

  const [isViewerVisible, setViewerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openViewer = index => {
    setCurrentIndex(index);
    setViewerVisible(true);
  };

  const renderImageViewerHeader = () => (
    <View style={styles.viewerHeader}>
     
      <TouchableOpacity 
        style={styles.viewerCloseButton}
        onPress={() => setViewerVisible(false)}
      >
        <Icon name="close" size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>

  );



  if (!portfolioImages || portfolioImages.length === 0) {
    return (
      <View style={modalStyles.emptyContainer}>
        <Text style={modalStyles.emptyText}>
          {tr.salonProfile.portfolio.noImages}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.portfolioContainer}>
      <StatusBar 
        backgroundColor={isViewerVisible ?Colors.white : Colors.transparent} 
        barStyle={isViewerVisible ? "dark-content" : "light-content"} 
      />
      
      <FlatList
        data={portfolioImages}
        numColumns={numColumns}
        keyExtractor={(item, index) => `portfolio-${item.id}-${index}`}
        renderItem={({item, index}) => (
          <TouchableOpacity 
            style={[styles.portfolioItem, { width: imageSize, height: imageSize }]}
            onPress={() => openViewer(index)}
          >
            <Image
              source={{uri: item.image_url}}
              style={[styles.image, { width: imageSize, height: imageSize }]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      <ImageView
        images={portfolioImages.map(img => ({uri: img.image_url}))}
        imageIndex={currentIndex}
        visible={isViewerVisible}
        onRequestClose={() => setViewerVisible(false)}
        // onImageIndexChange={setCurrentIndex}
        HeaderComponent={renderImageViewerHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  portfolioContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  portfolioItem: {
    margin: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  viewerCloseButton: {
    backgroundColor: 'rgba(248, 244, 244, 0.8)',
    padding: 12,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const modalStyles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default PortfolioGrid;
