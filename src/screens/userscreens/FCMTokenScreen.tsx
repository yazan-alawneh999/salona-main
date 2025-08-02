import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getFCMTokenForBackend } from '../../utils/getFCMToken';
import { sendTokenToBackend } from '../../services/firebase';

const FCMTokenScreen = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadFCMToken();
  }, []);

  const loadFCMToken = async () => {
    setLoading(true);
    try {
      const token = await getFCMTokenForBackend();
      setFcmToken(token);
    } catch (error) {
      console.error('Error loading FCM token:', error);
      Alert.alert('Error', 'Failed to load FCM token');
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshToken = async () => {
    setLoading(true);
    try {
      const token = await getFCMTokenForBackend();
      setFcmToken(token);
      Alert.alert('Success', 'FCM token refreshed successfully');
    } catch (error) {
      console.error('Error refreshing FCM token:', error);
      Alert.alert('Error', 'Failed to refresh FCM token');
    } finally {
      setLoading(false);
    }
  };

  const handleSendToBackend = async () => {
    if (!fcmToken) {
      Alert.alert('Error', 'No FCM token available');
      return;
    }

    setLoading(true);
    try {
      const success = await sendTokenToBackend(fcmToken);
      if (success) {
        Alert.alert('Success', 'FCM token sent to backend successfully');
      } else {
        Alert.alert('Error', 'Failed to send FCM token to backend');
      }
    } catch (error) {
      console.error('Error sending FCM token to backend:', error);
      Alert.alert('Error', 'Failed to send FCM token to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>FCM Token</Text>
        <Text style={styles.subtitle}>
          This screen displays the FCM token for testing purposes.
          You can share this token with your backend developer.
        </Text>

        <View style={styles.tokenContainer}>
          <Text style={styles.tokenLabel}>FCM Token:</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : fcmToken ? (
            <Text style={styles.tokenText} selectable>
              {fcmToken}
            </Text>
          ) : (
            <Text style={styles.noTokenText}>No token available</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRefreshToken}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Refresh Token</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.sendButton]}
            onPress={handleSendToBackend}
            disabled={loading || !fcmToken}
          >
            <Text style={styles.buttonText}>Send to Backend</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Information for Backend Developer:</Text>
          <Text style={styles.infoText}>
            1. This token is unique to this device and user.
          </Text>
          <Text style={styles.infoText}>
            2. The token should be stored in your database and associated with the user.
          </Text>
          <Text style={styles.infoText}>
            3. Use this token to send push notifications to this specific device.
          </Text>
          <Text style={styles.infoText}>
            4. The token may change, so implement a mechanism to update it when it changes.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  tokenContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tokenLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  tokenText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  noTokenText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default FCMTokenScreen; 