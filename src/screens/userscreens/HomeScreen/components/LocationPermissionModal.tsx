import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Colors from '../../../../constants/Colors';
import {useTranslation} from '../../../../contexts/TranslationContext';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

interface LocationPermissionModalProps {
  visible: boolean;
  onAllow: () => void;
  onNotNow: () => void;
}

const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  visible,
  onAllow,
  onNotNow,
}) => {
  const {t, isRTL} = useTranslation();

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onNotNow}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.8)" />
      <SafeAreaView style={styles.container}>
        <View style={styles.modalContent}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{t.home.locationPermission.icon}</Text>
          </View>

          {/* Title */}
          <Text style={[styles.title, isRTL && styles.titleRTL]}>
            {t.home.locationPermission.title}
          </Text>

          {/* Message */}
          <Text style={[styles.message, isRTL && styles.messageRTL]}>
            {t.home.locationPermission.message}
          </Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.allowButton}
              onPress={onAllow}
             >
              <Text style={styles.allowButtonText}>
                {t.home.locationPermission.allowButton}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notNowButton}
              onPress={onNotNow}
            >
              <Text style={styles.notNowButtonText}>
                {t.home.locationPermission.notNowButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.black,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    width: SCREEN_WIDTH - 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Maitree-Bold',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  titleRTL: {
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Maitree-Regular',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    opacity: 0.8,
  },
  messageRTL: {
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  allowButton: {
    backgroundColor: Colors.black,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  allowButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
  },
  notNowButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  notNowButtonText: {
    color: Colors.gold,
    fontSize: 16,
    fontFamily: 'Maitree-Bold',
  },
});

export default LocationPermissionModal;
