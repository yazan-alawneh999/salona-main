import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.black,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    fontFamily: 'Maitree-Medium',
  },
  placeholder: {
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Maitree-Medium',
  },
  sectionDescription: {
    fontSize: 16,
    color: Colors.softGray,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Maitree-Regular',
  },
  formContainer: {
    backgroundColor: Colors.black,
    borderRadius: 12,
    padding: 16,
  },
  formSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 8,
    fontFamily: 'Maitree-Medium',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
  },
  textAreaContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.black,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  textAreaIcon: {
    marginRight: 8,
    marginTop: 4,
  },
  textArea: {
    flex: 1,
    height: 150,
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gold,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    fontFamily: 'Maitree-Medium',
  },
  submitIcon: {
    marginLeft: 4,
  },
});

export default styles; 