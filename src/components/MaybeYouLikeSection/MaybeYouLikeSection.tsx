import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CategoryItem from '../CategoryItem/CategoryItem';
import Colors from '../../constants/Colors';

const MaybeYouLikeSection = () => {
  const categories = [
    { id: '1', image: require('../../assets/images/haircut.png'), label: 'Haircut' },
    { id: '2', image: require('../../assets/images/nails.png'), label: 'Nails' },
    { id: '3', image: require('../../assets/images/facial.png'), label: 'Facial' },
    { id: '4', image: require('../../assets/images/facial.png'), label: 'Facial' },
    { id: '5', image: require('../../assets/images/haircut.png'), label: 'Haircut' },
    { id: '6', image: require('../../assets/images/nails.png'), label: 'Nails' },
    { id: '7', image: require('../../assets/images/nails.png'), label: 'Nails' },
    { id: '8', image: require('../../assets/images/nails.png'), label: 'Nails' },

  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Salons</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <FlatList
        data={categories}
        numColumns={4}
        key={4}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryItem
            image={item.image}
            label={item.label}
            onPress={() => console.log(`Pressed on ${item.label}`)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: Colors.gold,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.gold,
  },
  list: {
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
});

export default MaybeYouLikeSection;
