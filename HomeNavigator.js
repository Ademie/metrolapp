import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './redux/store';
import {createDrawerNavigator} from '@react-navigation/drawer';


import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import StackPay from './payments/StackPay';
import AddHomeScreen from './screens/AddHomeScreen';
import AddWorkScreen from './screens/AddWorkScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="StackPay" component={StackPay} />
            <Stack.Screen name="AddHomeScreen" component={AddHomeScreen} />
            <Stack.Screen name="AddWorkScreen" component={AddWorkScreen} />
          </Stack.Navigator>
          {/* <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="MapScreen" component={MapScreen} />
            <Drawer.Screen name="SearchScreen" component={SearchScreen} />
          </Drawer.Navigator> */}
        </SafeAreaProvider>
      {/* </NavigationContainer> */}
    </Provider>
  );
};

export default HomeNavigator;
