import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import tw from 'twrnc';
import {useDispatch} from 'react-redux';
import NavFavourites from '../components/NavFavourites';
import NavOptions from '../components/NavOptions';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/styles';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Map from '../components/Map';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={tw`bg-white h-full`}>
      {/* TOP */}
      <View style={[tw`px-1 flex-row`, styles.top]}>
        <TouchableOpacity
        
          style={[
            tw`rounded-full px-2 py-1`,
            styles.bgred,
            styles.barcontainer,
          ]}>
          <Icon name="bars" style={[tw`text-sm text-white`, styles.bar]} />
        </TouchableOpacity>
        <Image
          source={require('/Users/Ademie/Desktop/Ademie/metrol/assets/images/metro.png')}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
        />
      </View>
      {/* MAP */}
      <View style={[tw`h-3/5`, {position: 'relative'}]}>
        <Map />
      </View>
      {/* BOTTOM */}
      <SafeAreaView
        style={[
          tw`h-2/5`,
          {
            justifyContent: 'center',
            marginTop: 40,
            alignItems: 'center',
          },
        ]}>
        <TouchableOpacity
          style={[styles.whereTo, styles.lightred]}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <View style={styles.searchTo}>
            <Icon name="search" style={styles.searchIcon} />
          </View>
          <Text style={styles.textTo}>Where to?</Text>
        </TouchableOpacity>
        <NavFavourites />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
