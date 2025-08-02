import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import styles from './TermsPolicy.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from '../../../contexts/TranslationContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TermsPolicyScreen = () => {
  const navigation = useNavigation();
  const {t, isRTL} = useTranslation();
  const insets = useSafeAreaInsets();
  const scrollY = new Animated.Value(0);
  
  // Animation values
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [-50, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      
      {/* Fixed Header */}
      <Animated.View 
        style={[
          styles.fixedHeader,
          {
            opacity: headerOpacity,
            transform: [{translateY: headerTranslateY}],
          }
        ]}
      >
        <Text style={styles.fixedHeaderTitle}>{t.account.termsOfService}</Text>
      </Animated.View>
      
      {/* Main Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon
            name={isRTL ? 'arrow-forward' : 'arrow-back'}
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.account.termsOfService}</Text>
        <View style={styles.placeholder} />
      </View>

      <Animated.ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="update" size={20} color={Colors.gold} />
            <Text style={styles.sectionTitle}>{t.termsPolicy.lastUpdated}</Text>
          </View>
          <Text style={styles.text}>{t.termsPolicy.introduction}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="check-circle" size={20} color={Colors.gold} />
            <Text style={styles.sectionTitle}>{t.termsPolicy.acceptance}</Text>
          </View>
          <Text style={styles.text}>{t.termsPolicy.acceptanceText}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="person" size={20} color={Colors.gold} />
            <Text style={styles.sectionTitle}>{t.termsPolicy.userObligations}</Text>
          </View>
          <Text style={styles.text}>{t.termsPolicy.userObligationsText}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="apps" size={20} color={Colors.gold} />
            <Text style={styles.sectionTitle}>{t.termsPolicy.serviceUsage}</Text>
          </View>
          <Text style={styles.text}>{t.termsPolicy.serviceUsageText}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="block" size={20} color={Colors.gold} />
            <Text style={styles.sectionTitle}>{t.termsPolicy.termination}</Text>
          </View>
          <Text style={styles.text}>{t.termsPolicy.terminationText}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="contact-support" size={20} color={Colors.gold} />
            <Text style={styles.sectionTitle}>{t.termsPolicy.contact}</Text>
          </View>
          <Text style={styles.text}>{t.termsPolicy.contactText}</Text>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2023 Salon App. All rights reserved.</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default TermsPolicyScreen; 