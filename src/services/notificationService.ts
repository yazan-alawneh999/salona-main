import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface AppointmentNotification {
  appointmentId: string;
  salonName: string;
  appointmentTime: string;
  services: string[];
  address: string;
  cancelReason?: string;
}

class NotificationService {
  // Schedule a notification for an appointment
  async scheduleAppointmentNotification(appointment: AppointmentNotification) {
    try {
      console.log('📅 Scheduling appointment notification:', appointment);
      
      // Store the notification data
      const notificationKey = `appointment_notification_${appointment.appointmentId}`;
      await AsyncStorage.setItem(notificationKey, JSON.stringify(appointment));
      
      // Schedule the notification for 1 hour before the appointment
      const appointmentTime = new Date(appointment.appointmentTime);
      const notificationTime = new Date(appointmentTime.getTime() - 60 * 60 * 1000); // 1 hour before
      
      // Create the notification payload
      const notificationPayload = {
        notification: {
          title: 'Upcoming Appointment',
          body: `Your appointment at ${appointment.salonName} is in 1 hour`,
        },
        data: {
          type: 'appointment_reminder',
          appointmentId: appointment.appointmentId,
          salonName: appointment.salonName,
          appointmentTime: appointment.appointmentTime,
          services: JSON.stringify(appointment.services),
          address: appointment.address,
          cancel_reason: appointment.cancelReason || '',
        },
        android: {
          priority: 'high',
          notification: {
            channelId: 'appointment_reminders',
            priority: 'max',
            defaultSound: true,
            defaultVibrate: true,
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
            },
          },
        },
      };

      // Send the notification to the device
      await messaging().send(notificationPayload);
      console.log('✅ Appointment notification scheduled successfully');
      
      return true;
    } catch (error) {
      console.error('❌ Error scheduling appointment notification:', error);
      return false;
    }
  }

  // Cancel a scheduled notification
  async cancelAppointmentNotification(appointmentId: string) {
    try {
      console.log('🗑️ Cancelling appointment notification:', appointmentId);
      
      // Remove the notification data from storage
      const notificationKey = `appointment_notification_${appointmentId}`;
      await AsyncStorage.removeItem(notificationKey);
      
      // Cancel the notification
      await messaging().cancelNotification(appointmentId);
      console.log('✅ Appointment notification cancelled successfully');
      
      return true;
    } catch (error) {
      console.error('❌ Error cancelling appointment notification:', error);
      return false;
    }
  }

  // Get all scheduled notifications
  async getScheduledNotifications() {
    try {
      console.log('📋 Getting all scheduled notifications');
      
      const keys = await AsyncStorage.getAllKeys();
      const notificationKeys = keys.filter(key => key.startsWith('appointment_notification_'));
      
      const notifications = await AsyncStorage.multiGet(notificationKeys);
      const parsedNotifications = notifications
        .map(([_, value]) => value ? JSON.parse(value) : null)
        .filter(notification => notification !== null);
      
      console.log('✅ Retrieved scheduled notifications:', parsedNotifications);
      return parsedNotifications;
    } catch (error) {
      console.error('❌ Error getting scheduled notifications:', error);
      return [];
    }
  }
}

export const notificationService = new NotificationService();
export default notificationService; 