import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Map from '../components/Map';
import {createStackNavigator} from '@react-navigation/stack';
import NavCard from '../components/NavCard';
import RideCard from '../components/RideCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import styles from '../style/styles';

const MapScreen = () => {
  const navigation = useNavigation();
  const Stack = createStackNavigator();
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      enabled={true}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreen')}
          style={[
            tw`absolute top-16 left-8 left-8 z-50 p-2 rounded-full shadow-lg`,
            styles.bgred,
          ]}>
          <Icon name="home" style={tw`text-white text-4`} />
        </TouchableOpacity>
        {/* MAP */}
        <View style={tw`h-1/2`}>
          <Map />
        </View>
        {/* BOTTOM SCREEN WITH NAVIGATIONS */}
        <View style={tw`h-1/2`}>
          <Stack.Navigator>
            {/* Select A Ride */}
            <Stack.Screen
              name="RideCard"
              component={RideCard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MapScreen;
