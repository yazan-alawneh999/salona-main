import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import {startAfter} from 'firebase/database';

// Font family mapping based on available Maitree weights
const Fonts = {
  extraLight: 'Maitree-ExtraLight',
  light: 'Maitree-Light',
  regular: 'outfit-Regular',
  medium: 'Maitree-Medium',
  semiBold: 'Maitree-SemiBold',
  bold: 'Maitree-Bold',
};

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  locationTxt: {
    paddingTop: 20,
    color: Colors.black,
    fontSize: 12,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    height: height * 0.25,
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: Colors.gold,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    // paddingHorizontal: 16,
    // paddingTop: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  welcomeContainer: {
    // alignItems: 'flex-end',
    maxWidth: '40%',
  },
  welcomeText: {
    // fontFamily: 'Maitree-Regular',
    fontSize: 14,
    color: Colors.white,
    textAlign: 'right',
  },
  nameText: {
    // fontFamily: 'Maitree-Medium',
    fontSize: 16,
    color: Colors.black,
    textAlign: 'right',
  },
  logo: {
    width: 80,
    height: 60,
    // marginRight: 25,
    // marginLeft: 0,
    alignSelf: 'center',
  },
  logoRTL: {
    // marginRight: 0,
    marginLeft: 25,
    width: 80,
    height: 60,
  },
  notificationIcon: {
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: 14,
    textAlign: 'left',
  },
  menuIconWrapper: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  sectionSpacing: {
    marginBottom: 15,
  },
  sectionSpacing2: {
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 0,
  },
  viewAllText: {
    position: 'absolute',
    right: 0,
    color: Colors.gold,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
  },
  viewAll: {
    fontSize: 14,
    color: Colors.gold,
    fontFamily: Fonts.regular,
    textAlign: 'right',
  },
  cardList: {
    paddingLeft: 10,
  },
  footer: {
    backgroundColor: Colors.black,
  },
  chatButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: Colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  chatButtonText: {
    color: Colors.white,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  // New styles for horizontal scrollable beauty services
  horizontalScrollContent: {
    paddingHorizontal: 15,
  },
  serviceItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 70,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginBottom: 6,
  },
  serviceTitle: {
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },
  addressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    borderWidth: 0,
    maxWidth: 120,
    height: 28,
  },
  addressButtonNotRTL: {
    flexDirection: 'row-reverse',
    gap: 4,
  },
  addressTextHolder: {
    flexDirection: 'row-reverse',
    // alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 40,
    maxWidth: 120,
    marginRight: 4,
    gap: 4,
  },
  addressTextHolderNotRTL: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 40,
    maxWidth: 120,
    // marginRight: 4,
    // marginLeft: 4,
    alignItems: 'flex-start',
    // marginRight: 14,
  },
  addressTextPlaceholder: {
    color: Colors.black,
    fontSize: 14,
    // fontFamily: 'Maitree-Regular',
    // marginRight: ,
    marginRight: 2,
  },
  addressText: {
    color: Colors.black,
    fontSize: 14,
    maxWidth: 60,
    // flexShrink: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '70%',
    maxHeight: 260,
    backgroundColor: Colors.black,
    borderRadius: 16,
    padding: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGray,
  },
  modalTitle: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: 'Maitree-Medium',
  },
  closeButton: {
    padding: 5,
  },
  addressList: {
    paddingVertical: 10,
  },
  addressItem: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 10,
    padding: 8,
    marginBottom: 6,
  },
  selectedAddressItem: {
    backgroundColor: Colors.gold,
  },
  addressItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressItemText: {
    flex: 1,
    marginLeft: 10,
  },
  addressItemTitle: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: 'Maitree-Regular',
  },
  selectedAddressText: {
    color: Colors.black,
  },
  primaryBadge: {
    backgroundColor: Colors.black,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  primaryBadgeText: {
    color: Colors.gold,
    fontSize: 12,
    fontFamily: 'Maitree-Medium',
  },
  searchContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  searchResultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Colors.black,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gold,
    maxHeight: 200,
    zIndex: 1001,
    marginTop: 5,
  },
  searchResultsList: {
    maxHeight: 200,
  },
  searchResultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.1)',
  },
  searchResultText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    padding: 12,
    width: '60%',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  addAddressText: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 8,
    // fontWeight: '500',
  },
  notificationIconContainer: {
    padding: 8,
    backgroundColor: '#ffffff60',
    borderRadius: 8,
  },
  searchContainer: {
    height: 60,
    backgroundColor: Colors.gold,
  },
  searchSection: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,

    alignItems: 'center',
  },
  searchField: {
    flex: 1,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: Colors.black,

    alignItems: 'center',
  },
  input: {
    padding: 8,
    color: Colors.white,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  optionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  featuredSection: {
    paddingRight: 10,
    marginBottom: 24,
  },
  featuredCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.black,
  },
  featuredImageContainer: {
    height: 200,
    width: 300,
    backgroundColor: Colors.gold,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 20,
  },
  featuredBadge: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  featuredBadgeText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  featuredContent: {
    justifyContent: 'flex-end',
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 16,
    width: '80%',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '600',
  },
  marginTop: {
    marginTop: 5,
  },
});

export default styles;
