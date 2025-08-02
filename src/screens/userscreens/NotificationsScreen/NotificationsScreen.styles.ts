import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Maitree-Medium',
    color: '#000000',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  clearText: {
    color: Colors.gold,
    marginRight: 4,
    fontFamily: 'Maitree-Regular',
  },
  notificationsList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 12,
  },
  notificationsListRTL: {
    direction: 'rtl',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    color: '#9B9B9B',
    textAlign: 'center',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    color: '#FF69B4',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: '#FFFFFF',
  },
  listContainer: {
    paddingBottom: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: '#333333',
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: '#999999',
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    // color: '#666666',
    lineHeight: 20,
  },
  unreadDot: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.gold,
  },
  sectionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 12,
    marginBottom: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontFamily: 'Maitree-Medium',
    color: '#333333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    marginBottom: 15,
  },
  cancelReasonContainer: {
    // backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderWidth: 1,
    borderColor: Colors.gold,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  cancelReasonLabel: {
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    color: Colors.gold,
    marginBottom: 4,
  },
  cancelReasonText: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    fontStyle: 'italic',
  },
  modalTime: {
    fontSize: 12,
    fontFamily: 'Maitree-Regular',
    color: Colors.gold,
    textAlign: 'right',
  },
});
