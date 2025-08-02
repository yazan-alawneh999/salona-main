import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black,
    },
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      gap: 10,
      padding: 16,
      backgroundColor: Colors.black,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerRTL: {
      flexDirection: 'row',
    },
    headerTitle: {
      fontSize: 20,
      color: Colors.white,
      marginLeft: 16,
      fontFamily: 'Maitree-Medium',
    },
    listContainer: {
      padding: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      color: Colors.white,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Maitree-Regular',
    },
    errorText: {
      color: Colors.red,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'Maitree-Regular',
    },
  });

export default styles;  