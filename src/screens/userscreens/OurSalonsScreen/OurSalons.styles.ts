import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 48 = padding (16) * 2 + gap between cards (16)

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  swiperContainer: {
    marginBottom: 16,
  },
  salonList: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.softGray,
    textAlign: 'center',
  },
  salonCard: {
    flex: 1,
    backgroundColor: Colors.black,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 8,
    marginBottom: 16,
    width: '100%',
    maxWidth: '50%',
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  salonImage: {
    width: '100%',
    height: cardWidth * 0.75,
    resizeMode: 'cover',
    backgroundColor: '#F5F5F5',
  },
  salonInfo: {
    padding: 12,
  },
  salonName: {
    fontSize: 14,
    fontWeight: '600',
    color:'#333333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.softGray,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
  },
});