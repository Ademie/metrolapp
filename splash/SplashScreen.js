import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import splash from '../style/splash';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({navigation}) => {
  return (
    <View style={splash.container}>
      <View style={splash.header}>
        <Animatable.Image
          source={require('../assets/images/metro.png')}
          animation="zoomInDown"
          duration={1500}
          style={splash.logo}
          resizeMode="contain"
        />
      </View>
      <Animatable.View style={splash.footer} animation="fadeInUpBig">
        <Text style={splash.title}>Get A Ride Today!</Text>
        <Text style={splash.text}>Sign in with your account</Text>
        <View style={splash.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignInScreen');
              console.log('eweey')
            }}>
            <LinearGradient colors={['#000', '#444']} style={splash.signIn}>
              <Text style={splash.textSign}>Get Started</Text>
              <Icon
                name="arrow-circle-right"
                type="font-awesome"
                color="white"
                size={20}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;
