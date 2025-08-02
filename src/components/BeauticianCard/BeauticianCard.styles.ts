import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
const styles = StyleSheet.create({
    cardContainer: {
      width: '50%',
      borderRadius: 10,
      backgroundColor: Colors.gold,
      overflow: 'hidden',
      marginBottom: 15,
      rowGap:5,
      
      justifyContent:'space-evenly',
    //   marginHorizontal: 2,
    },
    image: {
      width: '100%',
      height: 120,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    infoContainer: {
      padding: 10,
    },
    name: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.black,
      fontFamily: 'Maitree-Bold',
    },
    profession: {
      fontSize: 12,
      color: Colors.black,
      fontFamily: 'Maitree-Regular',
      marginTop: 5,
    },
    ratingContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.gold,
      borderRadius: 20,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    rating: {
      marginLeft: 5,
      fontSize: 12,
      fontWeight: 'bold',
      color: Colors.black,
    },
  });
export default styles;  