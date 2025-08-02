import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.black,
    },
    scrollView: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: Colors.black,
      padding:10,
      height:'100%'
    },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      marginBottom: 20,
      // paddingHorizontal: 16,
    },
    tabsRTL: {
      flexDirection: 'row-reverse',
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      // backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    activeTab: {
      backgroundColor: Colors.gold,
    },
    tabText: {
      color: Colors.white,
      fontSize: 14,
      fontFamily: 'Maitree-Regular',
    },
    activeTabText: {
      color: Colors.black,
      fontFamily: 'Maitree-Bold',
    },
    content: {
      flex: 1,
      paddingBottom: 80,
    },
    aboutContainer: {
      padding: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 12,
    },
    row: {
      flexDirection: 'row-reverse',
      // justifyContent: 'space-between',
      marginBottom: 12,
      marginTop: 12,
      marginLeft: 12,
    },
    rowRTL: {
      flexDirection: 'row',
    },
    
    label: {
      color: Colors.gold,
      fontSize: 14,
      fontFamily: 'Maitree-Regular',
    },
    value: {
      color: Colors.white,
      fontSize: 14,
      fontFamily: 'Maitree-Medium',
      textTransform: 'capitalize',
    },
    description: {
      textTransform: 'capitalize',
      color: Colors.white,
      fontSize: 14,
      fontFamily: 'Maitree-Regular',
      marginLeft: 12,
      
    },
    readMore: {
      textTransform: 'capitalize',
      color: Colors.gold,
      fontFamily: 'Maitree-Bold',
      fontSize: 14,
    },
    icon: {
      color: Colors.white,
      fontSize: 14,
      fontFamily: 'Maitree-Regular',
    },
    iconRTL: {
      marginRight: 10,
      marginLeft: 0,

    },
    tabContent: {
      textTransform: 'capitalize',
      color: Colors.white,
      fontFamily: 'Maitree-Regular',
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 20,
    },
    portfolioList: {
      padding: 8, 
      gap: 10,
    },
    portfolioItem: {
      flex: 1,
      margin: 4,
      borderRadius: 8,
      borderColor: Colors.gold,
      borderWidth: 1,
      overflow: 'hidden',
    },
    fullWidthImage: {
      flex: 1,
    },
    image: {
      width: '100%',
      // height: 200,
      borderRadius: 8,
    },
    reviewsList: {
      padding: 16,
    },
    servicesContainer: {
      padding: 16,
    },
    continueButton: {
      backgroundColor: Colors.gold,
      padding: 16,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 20,
    },
    continueButtonText: {
      color: Colors.black,
      fontSize: 16,
      fontFamily: 'Maitree-Medium',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      color: Colors.white,
      fontSize: 16,
      fontFamily: 'Maitree-Regular',
    },
  });
  
  export default styles;