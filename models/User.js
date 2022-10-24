import {View, Text} from 'react-native';
import React, {useEffect, forwardRef, useImperativeHandle} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase/firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = forwardRef((props, userRef) => {
  useImperativeHandle(userRef, () => ({
    useEffect,
  }));
  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const username = await AsyncStorage.getItem('username');
        console.log('uid here', username); 
        return (
            console.log('uidsss here', username)
        );
      } else {
      }
    });
  }, []);
    return (
      <View>
        <Text>User</Text>
      </View>
    );
});

export default User;
