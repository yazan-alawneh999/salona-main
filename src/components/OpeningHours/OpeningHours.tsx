import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SalonAvailability } from '../../types/salon';

interface OpeningHoursProps {
  availabilities: SalonAvailability[];
}

const OpeningHours: React.FC<OpeningHoursProps> = ({ availabilities }) => {
  const formatTime = (time: string) => {
    return time.substring(0, 5); // Convert "10:00:00" to "10:00"
  };

  return (
    <View style={styles.container}>
      {availabilities.map((availability) => (
        <View key={availability.id} style={styles.row}>
          <Text style={styles.days}>{availability.day}</Text>
          <Text style={styles.hours}>
            {formatTime(availability.opening_time)} - {formatTime(availability.closing_time)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  days: {
    fontSize: 16,
    color: '#333333',
    textTransform: 'capitalize',
  },
  hours: {
    fontSize: 16,
    color: '#333333',
  },
});

export default OpeningHours; 