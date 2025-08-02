import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

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
    container: {
      flex: 1,
      backgroundColor: Colors.black,
    },
    containerRTL: {
      direction: 'rtl',
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 50,
    },
    contentContainerRTL: {
      direction: 'rtl',
    },
    header: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gold,
    },
    headerRTL: {
      flexDirection: 'row',
    },
    backButton: {
      padding: 8,
    },
    backButtonRTL: {
      transform: [{ scaleX: -1 }],
    },
    headerTitle: {
      fontSize: 20,
      color: Colors.white,
      marginLeft: 16,
      fontFamily: Fonts.semiBold,
      
    },
    headerTitleRTL: {
      marginLeft: 0,
      marginRight: 16,
    },
    tabContainer: {
      flexDirection: 'row-reverse',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gold,
    },
    tabContainerRTL: {
      flexDirection: 'row',
    },
    tab: {
      flex: 1,
      paddingVertical: 8,
      alignItems: 'center',
    },
    tabRTL: {
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.gold,
    },
    tabText: {
      color: Colors.white,
      fontSize: 16,
      fontFamily: Fonts.regular,
    },
    tabTextRTL: {
      textAlign: 'right',
    },
    activeTabText: {
      color: Colors.gold,
      fontFamily: Fonts.medium,
    },
    listContainer: {
      padding: 16,
    },
    listContainerRTL: {
      direction: 'rtl',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingContainerRTL: {
      direction: 'rtl',
    },
    loadingText: {
      color: Colors.white,
      fontSize: 16,
      marginTop: 16,
      fontFamily: Fonts.regular,
    },
    loadingTextRTL: {
      textAlign: 'right',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    emptyContainerRTL: {
      direction: 'rtl',
    },
    emptyText: {
      color: Colors.white,
      fontSize: 16,
      textAlign: 'center',
      fontFamily: Fonts.regular,
    },
    emptyTextRTL: {
      textAlign: 'right',
    },
    section: {
      marginTop: 20,
      marginBottom: 10,
    },
  });

  export default styles;