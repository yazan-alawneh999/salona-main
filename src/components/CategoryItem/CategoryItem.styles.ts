import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 15,
    },
    imageContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    label: {
      marginTop: 8,
      fontSize: 14,
      fontFamily: 'Maitree-Regular',
      color: '#FFF',
      textAlign: 'center',
    },
  });

  export default styles;