import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'Maitree-Medium',
      color: Colors.gold,
    },
    profilePictureContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    profilePicture: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    inputContainer: {
      marginTop: 40,
    },
    input: {
      backgroundColor: Colors.black,
      borderColor: Colors.white,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 15,
      color: Colors.white,
      fontFamily: 'Maitree-Regular',
    },
    updateButton: {
      backgroundColor: Colors.gold,
      paddingVertical: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 80,
    },
    updateButtonText: {
      color: Colors.black,
      fontSize: 16,
      fontFamily: 'Maitree-Medium',
    },
  });
  export default styles;