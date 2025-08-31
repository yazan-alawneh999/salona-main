import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-get-random-values';
import {ProviderStackParamList, UserStackParamList} from './src/types/types';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {AuthNavigator} from './src/navigation/AuthNavigator';
import {useAuth} from './src/hooks/useAuth';
import {LogBox} from 'react-native';
import {I18nManager, Platform} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {initializeAuth} from './src/utils/initalizeUser';
import {initializeFirebase} from './src/services/firebase';
import {TranslationProvider} from './src/contexts/TranslationContext';
import {navigationRef} from './src/services/navigationService';
import ProviderNavigator from './src/navigation/ProviderStack';
import UserNavigator from './src/navigation/UserStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  'Warning: ...',
]);

const AppNavigator = () => {
  const {isAuthenticated, isActive, user, isInitialized} = useAuth();
  const insets = useSafeAreaInsets();

  if (!isInitialized) {
    return <AuthNavigator />;
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return user?.type === 'salon' ? <ProviderNavigator /> : <UserNavigator />;
};

const App = () => {

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize auth
      initializeAuth(store.dispatch);

      // Initialize Firebase
      console.log('🔄 STARTING FIREBASE INITIALIZATION IN APP.TSX');
      initializeFirebase().then(success => {
        if (success) {
          console.log('✅ FIREBASE INITIALIZED SUCCESSFULLY IN APP.TSX');
        } else {
          console.log('❌ FAILED TO INITIALIZE FIREBASE IN APP.TSX');
        }
      });

    };

    initializeApp();
  }, []);

  return (
    <Provider store={store}>
      <TranslationProvider>
        <SafeAreaProvider>
          {/* Global StatusBar: transparent and overlays content */}
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content" // or 'dark-content' depending on background
          />

          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </TranslationProvider>
    </Provider>
    // <Provider store={store}>
    //   <TranslationProvider>
    //     <NavigationContainer ref={navigationRef}>
    //       <RootNavigator />
    //     </NavigationContainer>
    //   </TranslationProvider>
    // </Provider>
  );
};

export default App;
