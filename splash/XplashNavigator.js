import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignUpScreen from './SignUpScreen'
import SignInScreen from './SignInScreen'
import SplashScreen from './SplashScreen'

const XplashStack = createStackNavigator()

const XplashNavigator = () => {
  return (
    <XplashStack.Navigator screenOptions={{headerShown: false}}>
        <XplashStack.Screen name="SplashScreen" component={SplashScreen}/>
        <XplashStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <XplashStack.Screen name="SignInScreen" component={SignInScreen}/>
    </XplashStack.Navigator>
  )
}

export default XplashNavigator

