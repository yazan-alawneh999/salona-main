import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors'; 
import styles from './SplashScreen.styles';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../../contexts/TranslationContext';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const screens = [
    {
      type: 'dynamic',
      backgroundImage: require('../../../assets/images/prettyWoman.png'),
      title: t.splash.findAndBook,
      description: t.splash.findAndBookDescription,
    },
    {
      type: 'dynamic',
      backgroundImage: require('../../../assets/images/prettyWoman.png'),
      title: t.splash.styleThatFits,
      description: t.splash.styleThatFitsDescription,
    },
    {
      type: 'dynamic',
      backgroundImage: require('../../assets/images/prettyWoman.png'),
      title: t.splash.bookAtHome,
      description: t.splash.bookAtHomeDescription,
    },
  ];

  const handleNext = () => {
    if (currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex(currentScreenIndex + 1);
    } else {
      navigation.navigate('LanguageSelectionScreen' as never);
    }
  };

  const currentScreen = screens[currentScreenIndex];

  useEffect(() => {
    if (currentScreen.type === 'static') {
      const timer = setTimeout(() => {
        handleNext();
      }, 2500); // 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentScreenIndex]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.gold,
        },
      ]}
    >
      <ImageBackground
        source={currentScreen.backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.paginationContainer}>
          {screens.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDotWrapper,
                currentScreenIndex === index && styles.activeDotWrapper,
              ]}
            >
              <View
                style={[
                  styles.paginationDot,
                  currentScreenIndex === index && styles.activeDot,
                ]}
              />
            </View>
          ))}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{currentScreen.title}</Text>
          <Text style={styles.description}>{currentScreen.description}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentScreenIndex === screens.length - 1 ? t.splash.next : t.splash.next}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;
