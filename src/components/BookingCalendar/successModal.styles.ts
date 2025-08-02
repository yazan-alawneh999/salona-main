import Colors from "../../constants/Colors";
import { StyleSheet } from "react-native";
const successModalStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: 380,
      alignSelf: 'center',
    },
    modalContent: {
    //   width: '80%',
    //   backgroundColor: Colors.black,
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    icon: {
      fontSize: 18,
      color: '#000',
    },
    title: {
      fontSize: 18,
      color: Colors.gold,
      fontFamily: 'Maitree-Medium',
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 14,
      color: Colors.gold,
      fontFamily: 'Maitree-Medium',
      textAlign: 'center',
      marginBottom: 20,
    },
    
    homeButton: {
      backgroundColor: Colors.gold,
      padding: 12,
      borderRadius: 30,
      width: '80%',
      alignItems: 'center',
    },
    homeButtonText: {
      fontSize: 16,
      color: Colors.black,
      fontFamily: 'Maitree-Medium',
    },
  });

    export default successModalStyles;