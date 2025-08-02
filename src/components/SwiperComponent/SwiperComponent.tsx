import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const data = [
  {
    image: require('../../assets/images/carouselImage.png'),
    offer: '25% Offer*',
    description: 'ON YOUR FIRST WEDDING PACKAGE',
    highlight: 'Hair-styling & Treatment',
  },
  {
    image: require('../../assets/images/carouselImage.png'),
    offer: '25% Offer*',
    description: 'ON YOUR FIRST WEDDING PACKAGE',
    highlight: 'Hair-styling & Treatment',
  },
  {
    image: require('../../assets/images/carouselImage.png'),
    offer: '25% Offer*',
    description: 'ON YOUR FIRST WEDDING PACKAGE',
    highlight: 'Hair-styling & Treatment',
  },
  {
    image: require('../../assets/images/carouselImage.png'),
    offer: '25% Offer*',
    description: 'ON YOUR FIRST WEDDING PACKAGE',
    highlight: 'Hair-styling & Treatment',
  },
  {
    image: require('../../assets/images/carouselImage.png'),
    offer: '25% Offer*',
    description: 'ON YOUR FIRST WEDDING PACKAGE',
    highlight: 'Hair-styling & Treatment',
  },
];

const SwiperComponent = () => {
  return (
    <View style={styles.swiperContainer}>
      <Swiper
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={true}
        loop={true}
        index={0}
        paginationStyle={styles.paginationContainer}
        dot={<View style={styles.dot} />}
        activeDot={
          <View style={styles.activeDotWrapper}>
            <View style={styles.activeDot} />
          </View>
        }>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* Left Side: Image */}
            
            <Image source={item.image} style={styles.image} resizeMode="cover" />

            {/* Right Side: Text and Button */}
            <View style={styles.textContainer}>
              <Text style={styles.offerText}>{item.offer}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.highlight}>
  <Text style={styles.highlightPink}>Hair-styling</Text>
  <Text style={styles.highlightBlack}> & Treatment</Text>
</Text>
              <TouchableOpacity style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Explore</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    height: 180,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.gold,
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
    // padding: 10,
    marginHorizontal:10
  },
  image: {
    width:135,
    height: 190,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  offerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    fontFamily: 'Maitree-Bold',
  },
  description: {
    fontSize: 7,
    color: Colors.black,
    fontFamily: 'Maitree-Regular',
    marginVertical: 5,
  },
  highlight: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: 'Astronauta-Script', // Works even if 'bold' doesn't exist
    marginBottom: 10,
  },
  exploreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    height: 35,
    width: 100,
    marginBottom: 30,
  },
  
  exploreButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 10,
  },
  highlightPink: {
    fontSize: 16,
    color: '#C41D6F', // Pink color for "Hair-styling"
    fontFamily: 'Astronauta-Script',
  },
  highlightBlack: {
    fontSize: 16,
    color: Colors.black, // Black color for "& Treatment"
    fontFamily: 'Astronauta-Script',
  },
  dot: {
    top:10,
    left:30,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginHorizontal: 4,
  },
  activeDotWrapper: {
    left:30,
    top:10,
    width: 22,
    height: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeDot: {
    // bottom:20,
    backgroundColor: Colors.black,
    width: 18,
    height: 6,
    borderRadius: 10,
  },
});

export default SwiperComponent;
