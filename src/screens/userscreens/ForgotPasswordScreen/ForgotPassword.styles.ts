import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: 'row',
    
    marginBottom: 20,
  },
  backButton: {
    marginRight: 50,
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gold,
    fontFamily: 'Maitree-Medium',
    alignSelf:'center',
    
  },
  secondSection : {
    marginTop:40
  },
  instructions: {
    fontSize: 14,
    color: Colors.gold,
    marginBottom: 20,
    lineHeight: 20,
    fontFamily: 'Maitree-Regular',
  },
  confirmButton: {
    borderRadius:12,
    marginTop: 20,
    width: '100%',
  },
  backButtonCircle: {
    
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  otpInput: {
    marginBottom: 20,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.black,
    color: Colors.white,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default styles;
