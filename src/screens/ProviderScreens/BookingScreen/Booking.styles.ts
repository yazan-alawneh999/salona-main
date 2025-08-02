import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
      paddingTop: 50,
      paddingBottom: 15,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Maitree-Bold',
      color: Colors.gold,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    tabContainerRTL: {
      flexDirection: 'row',
       paddingVertical: 15,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: Colors.gold,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 20,
      backgroundColor: Colors.black,
      borderWidth: 1,
      gap: 10,
      borderColor: Colors.gold,
    },
    activeTab: {
      backgroundColor: Colors.gold,
    },
    tabContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    tabText: {
      color: Colors.gold,
      fontSize: 14,
      fontFamily: 'Maitree-Medium',
    },
    activeTabText: {
      color: Colors.black,
    },
    unreadBadge: {
      backgroundColor: Colors.red,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    unreadBadgeText: {
      color: Colors.white,
      fontSize: 12,
      fontFamily: 'Maitree-Bold',
    },
    listContainer: {
      padding: 15,
    },
    appointmentCard: {
      backgroundColor: Colors.hardGray,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: Colors.gold,
    },
    appointmentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    dateText: {
      color: Colors.white,
      fontSize: 16,
      fontFamily: 'Maitree-Medium',
    },
    timeText: {
      color: Colors.gold,
      fontSize: 14,
      fontFamily: 'Maitree-Regular',
    },
    appointmentDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    customerName: {
      color: Colors.white,
      fontSize: 14,
      fontFamily: 'Maitree-Regular',
    },
    amount: {
      color: Colors.gold,
      fontSize: 14,
      fontFamily: 'Maitree-Medium',
    },
    servicesContainer: {
      borderTopWidth: 1,
      borderTopColor: Colors.hardGray,
      paddingTop: 10,
    },
    serviceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    serviceName: {
      color: Colors.white,
      fontSize: 12,
      fontFamily: 'Maitree-Regular',
    },
    serviceTime: {
      color: Colors.softGray,
      fontSize: 12,
      fontFamily: 'Maitree-Regular',
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
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    emptyText: {
      color: Colors.white,
      fontSize: 16,
      fontFamily: 'Maitree-Regular',
    },
  });

  export default styles;