import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(visible);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current; // 300 is sheet height offscreen

  // Inside useEffect
  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100, // faster fade-in
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150, // faster slide-up
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100, // faster fade-out
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 150, // faster slide-down
          useNativeDriver: true,
        }).start(() => {
          setIsMounted(false);
          onClose();
        });
      });
    }
  }, [visible]);

  if (!isMounted) return null;

  return (
    <Modal transparent visible={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.overlay, {opacity: fadeAnim}]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.sheet, {transform: [{translateY: slideAnim}]}]}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.icon}>
              <Icon name="close" size={24} color="#000" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {title && <Text style={styles.title}>{title}</Text>}

        <View style={styles.content}>{children}</View>
      </Animated.View>
    </Modal>
  );
};

export default BottomSheetModal;
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: height * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    justifyContent: 'flex-start',
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 20,
  },
  content: {
    padding: 16,
  },
  icon: {
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: '#ddd',
    padding: 8,
    elevation: 4,
  },
});
