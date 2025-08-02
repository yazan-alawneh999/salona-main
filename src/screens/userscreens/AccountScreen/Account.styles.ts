import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.black,
    },
    section: {
        padding: 16,
        paddingBottom: 0,
        paddingTop: 0,
      },
      sectionTitle: {
        fontSize: 18,
        color: Colors.white,
        marginBottom: 16,
        fontFamily: 'Maitree-Medium',
      },
      iconRTL: {
        
      },
      optionTextWrapper: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 0,
      },
      optionTextWrapperRTL: {
        flexDirection: 'row-reverse',
      },
      optionWrapper: {
        flexDirection: 'row-reverse',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        gap: 10,
      },
      option: {
        flexDirection: 'row',
        
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
      },
      moreOption: {
        flexDirection: 'row-reverse',
        gap: 10,
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
      },
      moreoptionRTL: {
        flexDirection: 'row',
        marginRight: 'auto',
        gap: 0,
      },
      notificationOption: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        gap: 10,
      },
      notificationOptionRTL: {
        flexDirection: 'row-reverse',
        gap: 0,
      },
      optionText: {
        color: Colors.white,
        fontSize: 16,
        marginLeft: 10,
        flex: 1,
        fontFamily: 'Maitree-Regular',
      },
      optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
      },
      language: {
        color: Colors.softGray,
        fontSize: 14,
        fontFamily: 'Maitree-Regular',
      },
      logoutText: {
        color: Colors.red,
        fontFamily: 'Maitree-Medium',
      },
      deleteText: {
        color: '#000000',
      },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: Colors.black,
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: 'Maitree-Medium',
  },
  closeButton: {
    padding: 8,
  },
  input: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: Colors.white,
    fontFamily: 'Maitree-Regular',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  submitButton: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    borderColor: Colors.gold,
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
  },
  containerRTL: {
    direction: 'rtl',
  },
  optionRTL: {
    flexDirection: 'row-reverse',
    gap: 0,
  },
  languageRTL: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  logoutTextRTL: {
    marginLeft: 0,
  },
  deleteTextRTL: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  optionTextRTL: {
    color: Colors.white,
    fontSize: 16,
    marginRight: 6,
    flex: 1,
    fontFamily: 'Maitree-Regular',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionContentRTL: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  }
});

export default styles;