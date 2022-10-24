import {Pressable, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import tw from 'twrnc';
import styles from '../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';


const CustomDrawer = props => {
  const {signOut} = useContext(AuthContext);
  const navigation = useNavigation()
  // GET USERNAME FROM ASYNCSTORAGE AND STORE IT FOR GLOBAL USE
  const [username, setUsername] = useState('');
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    let userID = JSON.parse(userToken);
    const unsub = onSnapshot(doc(db, 'users', userID), doc => {
      setUsername(doc.data().username);
    });
    return () => {
      unsub();
    };
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        {/* DRAWER HEADER */}
        <View style={[tw`p-5 mb-5`, styles.bgred]}>
          {/* user row */}
          <TouchableOpacity 
          onPress={()=>navigation.navigate('ProfileScreen')}
          style={tw`flex-row items-center`}
          >
            <View style={tw`w-18 h-18 rounded-full bg-gray-100 mr-4`} />
            <View>
              <Text style={tw`text-white text-lg  font-bold`}>{username}</Text>
              <Text style={tw`text-gray-400 text-lg`}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          {/* messages row */}
          <View style={tw`border-t-2 border-b-2 border-gray-200 my-5 py-2`}>
            <Pressable
              onPress={() => {}}
              style={[tw`flex-row`, {alignItems: 'center'}]}>
              <Text style={tw`text-white py-2 pr-2`}>Messages</Text>
              <Icon name="bell" type="font-awesome" color="#fff" size={20} />
            </Pressable>
          </View>
          {/* do more */}
          <Pressable onPress={() => {}}>
            <Text style={tw`text-gray-300 py-2`}>
              Do more with your account
            </Text>
          </Pressable>
          {/* make money */}
          <Pressable onPress={() => {}}>
            <Text style={tw`text-white py-2`}>Drive & Earn</Text>
          </Pressable>
        </View>

        {/* DRAWER ITEMS */}
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {/* DRAWER FOOTER  SIGN OUT*/}
      <View style={[tw`p-5`, {borderTopWidth: 1, borderTopColor: '#ccc'}]}>
        <Pressable
          onPress={() => {
            signOut();
          }}
          style={[tw`flex-row`, {alignItems: 'center'}]}>
          <Icon name="sign-out" type="font-awesome" color="#f73d67" size={20} />
          <Text style={[tw`py-2 ml-2`, {fontSize: 17}]}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CustomDrawer;
