// import React, { useCallback } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Icon } from 'react-native-elements';
// import { Colors } from '../../constants/Colors';

// const OurSalons = () => {
//   const navigation = useNavigation();

//   const renderSalonItem = ({ item }: { item: Salon }) => {
//     const salon = mappedSalons.find(s => s.id === item.id);
//     const distance = salon?.distance || 'N/A';
//     const duration = salon?.duration || 'N/A';

//     return (
//       <TouchableOpacity
//         style={styles.salonWrapper}
//         onPress={() => navigation.navigate('SalonDetail', { salonId: item.id })}
//       >
//         <View style={styles.salonCard}>
//           <View style={styles.imageContainer}>
//             <Image
//               source={{ uri: item.image }}
//               style={styles.salonImage}
//             />
//             <View style={styles.ratingOverlay}>
//               <Icon name="star" size={12} color="#FFD700" />
//               <Text style={styles.ratingOverlayText}>{item.rating}</Text>
//             </View>
//           </View>
//           <View style={styles.salonInfo}>
//             <Text style={styles.salonName} numberOfLines={1}>
//               {item.name}
//             </Text>
//             <View style={styles.locationContainer}>
//               <Icon name="map-marker" size={12} color={Colors.white} style={styles.locationIcon} />
//               <Text style={styles.locationText} numberOfLines={1}>
//                 {distance} • {duration}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Render your salon items here */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   salonWrapper: {
//     width: '48%',
//     marginBottom: 16,
//   },
//   salonCard: {
//     backgroundColor: Colors.black,
//     borderRadius: 12,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.1)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   salonImage: {
//     width: '100%',
//     height: 140,
//     resizeMode: 'cover',
//   },
//   salonInfo: {
//     padding: 12,
//     backgroundColor: Colors.black,
//   },
//   salonName: {
//     fontSize: 14,
//     fontFamily: 'Maitree-Regular',
//     color: Colors.white,
//     marginBottom: 6,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 16,
//   },
//   locationIcon: {
//     marginTop: 2,
//   },
//   locationText: {
//     fontSize: 12,
//     fontFamily: 'Maitree-Regular',
//     color: Colors.white,
//     marginLeft: 4,
//     marginRight: 4,
//     flex: 1,
//     opacity: 0.9,
//   },
//   ratingOverlay: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     borderWidth: 0.5,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   ratingOverlayText: {
//     fontSize: 12,
//     fontFamily: 'Maitree-Regular',
//     color: '#FFFFFF',
//     marginLeft: 4,
//   },
// });

// export default OurSalons; 