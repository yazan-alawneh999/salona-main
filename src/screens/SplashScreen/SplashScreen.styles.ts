import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gold,
  },
  staticScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  staticImage: {
    width: width * 0.6,
    height: width * 0.6,
  },
  backgroundImage: {
    flex: 1,
    height: width * 1.34,
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical:-10
  },
  
  paginationDotWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.softGray,
    marginHorizontal: 5,
    
  },
  activeDot: {
    alignSelf: 'center',
    backgroundColor: Colors.black,
    width: 30,
    height: 10,
    borderRadius: 10,
    
  },
  activeDotWrapper: {
    borderWidth: 1,
    borderColor: Colors.black, 
    borderRadius: 12,
    width: 38,
    height: 18,
    alignSelf: 'center',
    alignContent: 'center',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.black,
    paddingVertical: 15,
    borderRadius: 30,
    width: width * 0.8,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default styles;
