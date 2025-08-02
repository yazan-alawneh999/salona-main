import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

export default StyleSheet.create({
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.softGray,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
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
    paddingVertical: 20,
  },
  heroImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
    fontFamily: 'Maitree-Medium',
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 16,
    color: Colors.softGray,
    lineHeight: 24,
    fontFamily: 'Maitree-Regular',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: Colors.softGray,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  formSection: {
    marginBottom: 20,
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
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    paddingVertical: 12,
  },
  textAreaContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.black,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  textAreaIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  textArea: {
    flex: 1,
    color: Colors.white,
    fontSize: 16,
    height: 120,
    fontFamily: 'Maitree-Regular',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.gold,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Maitree-Medium',
    marginRight: 8,
  },
  submitIcon: {
    marginLeft: 4,
  },
}); 