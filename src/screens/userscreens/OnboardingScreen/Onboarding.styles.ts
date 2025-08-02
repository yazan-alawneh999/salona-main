import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 50,
  },
  logoContainer: {
    flex: 1,
    marginLeft: width * 0.5,
    marginTop: width * 0.2,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 80,
  },
  text: {
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '80%',
  },
  languageButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap: 10,
  },
  languageButtonText: {
    // marginLeft: 10,
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
export default styles;
