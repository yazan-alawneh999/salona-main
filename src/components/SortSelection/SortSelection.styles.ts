import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    sectionContainer: {
      marginBottom: 20,
    },
    title: {
      fontSize: 16,
      color: Colors.gold,
      fontFamily: 'Maitree-SemiBold',
      marginBottom: 10,
    },
    optionsContainer: {
      marginTop: 10,
    },
    optionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
    optionText: {
      fontSize: 14,
      color: '#73777B',
      fontFamily: 'Maitree-Regular',
    },
    selectedOptionText: {
      color: Colors.gold,
      fontFamily: 'Maitree-Medium',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: Colors.gold,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedCheckbox: {
      backgroundColor: Colors.gold,
    },
  });

export default styles;