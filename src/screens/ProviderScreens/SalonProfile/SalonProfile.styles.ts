import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import {withDecay} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 20, // Reduced top padding for better spacing
    backgroundColor: Colors.black,
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.gold,
    fontFamily: 'Maitree-Regular',
    marginBottom: 4,
    opacity: 0.9,
    alignSelf: 'flex-start',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    fontFamily: 'Maitree-Bold',
    letterSpacing: 0.5,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  notificationIcon: {
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: Colors.black,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.gold,
  },
  tabText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Maitree-Medium',
    textAlign: 'center',
  },
  activeTabText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontFamily: 'Maitree-Bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
    fontFamily: 'Maitree-Bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: Colors.white,
    flex: 1,
    fontFamily: 'Maitree-Regular',
  },
  language: {
    color: Colors.softGray,
    marginLeft: 'auto',
    fontFamily: 'Maitree-Regular',
  },
  AddServiceButton: {
    backgroundColor: Colors.gold,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  AddServiceButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Maitree-Medium',
  },
  portfolioContainer: {
    flex: 1,
    padding: 16,
  },
  portfolioContainerRTL: {
    direction: 'rtl',
  },
  portfolioList: {
    paddingBottom: 16,
  },
  portfolioListRTL: {
    direction: 'rtl',
  },
  portfolioItem: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  portfolioItemRTL: {
    direction: 'rtl',
  },
  portfolioItemFullWidth: {
    flex: 2,
  },
  portfolioImage: {
    width: '100%',
    height: 150,
  },
  portfolioImageFullWidth: {
    height: 200,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.black,
    padding: 8,
    borderRadius: 20,
  },
  deleteButtonRTL: {
    right: 8,
    left: undefined,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  uploadButtonRTL: {
    flexDirection: 'row-reverse',
  },
  uploadText: {
    color: Colors.gold,
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Maitree-Medium',
  },
  uploadTextRTL: {
    marginLeft: 0,
    marginRight: 8,
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
    color: Colors.hardGray,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Maitree-Regular',
  },
  emptyTextRTL: {
    direction: 'rtl',
  },
  fullWidthImage: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  reviewsList: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  servicesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  continueButton: {
    backgroundColor: Colors.gold,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  continueButtonText: {
    color: Colors.black,
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 5,
    marginRight: 10,
  },
  editButtonRTL: {
    marginRight: 0,
    marginLeft: 10,
  },
  blockTimeButton: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  blockTimeButtonRTL: {
    marginRight: 0,
    marginLeft: 10,
  },
  blockTimeButtonText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
  },
  // About Tab Styles
  aboutContainer: {
    padding: 0,
    flex: 1,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600',
    width: '30%',
  },
  value: {
    fontSize: 16,
    color: Colors.white,
    // flex: 1,
    // marginLeft: 8,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    color: Colors.white,
    marginVertical: 16,
    lineHeight: 20,
    width: '100%',
    fontFamily: 'Maitree-Regular',
  },
  readMore: {
    color: Colors.gold,
  },
  addressContainer: {
    marginTop: 8,
  },
  addressText: {
    marginLeft: 10,
    color: Colors.white,
  },
  button: {
    backgroundColor: Colors.black,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.gold,
    marginHorizontal: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // RTL support
  rowRTL: {
    flexDirection: 'row',
  },
  labelRTL: {
    textAlign: 'left',
  },
  valueRTL: {
    textAlign: 'left',
    marginLeft: 0,
    marginRight: 8,
  },
  timeContainerRTL: {
    flexDirection: 'row-reverse',
  },
});

export default styles;
