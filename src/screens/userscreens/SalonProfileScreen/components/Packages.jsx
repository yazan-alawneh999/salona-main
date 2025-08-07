import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import ImageView from 'react-native-image-viewing';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns;

const PackagesList = ({data, tr, renderPackages}) => {
  const assets = data?.salons?.assets || [];
  const portfolioImages = assets.filter(asset => asset.type === 'portfolio');

  const [isViewerVisible, setViewerVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openViewer = index => {
    setCurrentIndex(index);
    setViewerVisible(true);
  };

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
      <FlatList
        data={portfolioImages}
        // numColumns={numColumns}
        keyExtractor={(item, index) => `portfolio-${item.id}-${index}`}
        renderItem={renderPackages}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  portfolioContainer: {
    flex: 1,
    paddingVertical: 8,
  },
  image: {
    width: imageSize,
    height: imageSize,
    margin: 1,
    backgroundColor: '#eee',
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

export default PackagesList;
