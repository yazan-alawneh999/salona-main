import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: Colors.black,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGray,
  },
  fixedHeaderTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGray,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.softGray,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.softGray,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Maitree-Bold',
    color: Colors.gold,
    marginLeft: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    lineHeight: 24,
  },
  footer: {
    marginTop: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Maitree-Regular',
    color: Colors.softGray,
  },
}); 