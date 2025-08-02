import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

// Font family mapping for Maitree weights
const Fonts = {
  extraLight: 'Maitree-ExtraLight',
  light: 'Maitree-Light',
  regular: 'Maitree-Regular',
  medium: 'Maitree-Medium',
  semiBold: 'Maitree-SemiBold',
  bold: 'Maitree-Bold',
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.black,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.hardGray,
      marginBottom: 15,
      shadowColor: Colors.black,
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 2,
      gap:10,
      position: 'relative',
    },
    cardContainerRTL: {
      flexDirection: 'row-reverse',
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 10,
    },
    infoContainer: {
      flex: 1,
      paddingVertical: 5,
      alignItems: 'flex-end',
    },
    infoContainerRTL: {
      alignItems: 'flex-start',
    },
    name: {
      fontSize: 14,
      fontFamily: Fonts.semiBold,
      color: Colors.gold,
    },
    details: {
      fontSize: 14,
      fontFamily: Fonts.regular,
      color: Colors.white,
    },
    time: {
      fontSize: 10,
      fontFamily: Fonts.regular,
      color: Colors.white,
    },
    detailButton: {
      backgroundColor: Colors.black,
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 8,
      borderColor: Colors.gold,
      borderWidth: 1,
      width: 80,
      // marginTop: 100,
    },
    detailButtonText: {
      color: Colors.gold,
      fontSize: 14,
      fontFamily: Fonts.medium,
    },  imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      unreadIndicator: {
        position: 'absolute',
        top: -10,
        right: -8,
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: Colors.green,
        borderWidth: 2,
        borderColor: Colors.black,
        zIndex: 1,
      },
  });
  export default styles;