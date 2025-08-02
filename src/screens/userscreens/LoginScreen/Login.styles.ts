import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../../constants/Colors';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    // marginRight: 10,
  },
  backButtonCircle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 20,
    color: Colors.gold,
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#888',
    marginBottom: 60,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.customBlack,
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.gold,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: Colors.black,
    color: Colors.white,
  },
  input2: {
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 10,
    padding: 10,
    // marginBottom: 20,
    backgroundColor: Colors.black,
    color: Colors.white,
  },
  inputContainer2: {
    marginBottom: 10,
  },
  forgotPassword: {
    color: Colors.customBlack,
    // textAlign: 'right',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: Colors.gold,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 60,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'medium',
    color: Colors.black,
  },
  loginForm: {
    flex: 1,
  },
});

export default styles;
