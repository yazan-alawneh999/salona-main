import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import ProviderStack from './ProviderStack';
import {AuthNavigator} from './AuthNavigator';
import UserStack from './UserStack';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log('RootNavigator - Auth state changed:');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('user:', user);
    console.log('user type:', user?.type);
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user?.type === 'salon' ? (
        <Stack.Screen name="Provider" component={ProviderStack} />
      ) : (
        <Stack.Screen name="User" component={UserStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
