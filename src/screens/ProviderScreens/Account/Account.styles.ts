import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black,
    },
    section: {
        // marginBottom: 20,
        padding:20
      },
      sectionTitle: {
        fontSize: 16,
        fontFamily: 'Maitree-Bold',
        color: Colors.gold,
        marginBottom: 20,
        marginTop:10
      },
      option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
      },
      optionText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        fontFamily: 'Maitree-Regular',
        color: Colors.white,
      },
      language: {
        fontSize: 14,
        fontFamily: 'Maitree-Regular',
        color: Colors.softGray,
        
      },
      logoutText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontFamily: 'Maitree-Bold',
      },
      logoutButton: {
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      logoutGradient: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        minHeight: 50,
      },
      // Modal styles
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: Colors.black,
        borderRadius: 12,
        padding: 20,
        width: '90%',
        maxWidth: 400,
      },
      modalHeader: {

        color: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      modalHeaderRTL: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      modalTitle: {
        fontSize: 18,
        fontFamily: 'Maitree-Bold',
        color: Colors.white,
      },
      input: {
        color: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gold,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'Maitree-Regular',
      },
      updateButton: {
        backgroundColor: Colors.gold,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      updateButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'Maitree-Bold',
      },
      loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      },
      loadingText: {
        color: Colors.white,
        marginLeft: 10,
        fontSize: 16,
      },
      currentFeeText: {
        color: Colors.white,
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
      },
  });
  export default styles;