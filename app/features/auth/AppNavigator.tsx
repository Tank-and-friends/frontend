// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import PasswordScreen from './PasswordScreen';
import SignupScreen from './SignupScreen';
import SignupCreateScreen from './SignupCreateScreen';
import LoginAccountScreen from './LoginAccountScreen';
import VerifyEmailScreen from './VerifyEmailScreen';


export type RootStackParamList = {
  LoginAccountScreen: undefined;
  LoginScreen: { email: null | string };
  PasswordScreen: { email: string };
  SignupScreen: { email: null | string };
  SignupCreateScreen: { email: string };
  VerifyEmailScreen: { email: string };

};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="LoginAccountScreen">
    <Stack.Screen name="LoginAccountScreen" component={LoginAccountScreen} options={{ headerShown: false }} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignupCreateScreen" component={SignupCreateScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

export default AppNavigator;
