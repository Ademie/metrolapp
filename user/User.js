import React, {useContext, useState, useEffect} from 'react';
import {collection, doc, getDocs, onSnapshot, setDoc} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Image, setImage] = useState('');
  const [Home, setHome] = useState('')
  const [Work, setWork] = useState('')

  useEffect(()=>{
    fetchUser()
    fetchLocation()
    storeData()
  },[])

// FETCH USER DETAILS
  const fetchUser = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    let userID = JSON.parse(userToken);
    const unsub = onSnapshot(doc(db, 'users', userID), doc => {
      setUsername(doc.data().username);
      setEmail(doc.data().email);
      setPassword(doc.data().password);
      setImage(doc.data().image);
    });
    return () => {
      unsub();
    };
  };
// FETCH LOCATION DETAILS
  const fetchLocation = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    let userID = JSON.parse(userToken);
    const locationRef = collection(db, 'users', userID, 'location');
    const locationSnapshot = await getDocs(locationRef);
    // const unsub = onSnapshot(collection(db, 'users', userID, 'location'), (doc) =>{
    //   console.log()
    // })

    let list = [];
    locationSnapshot.forEach(doc => {
      list.push({id: doc.id, ...doc.data()});
      
    });
    
    setHome(list[0].description)
    setWork(list[1].description);
  };
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('Usern', 'Username');
      await AsyncStorage.setItem('Emai', 'Email');
    //   await AsyncStorage.setItem('Password', Password);
    //   await AsyncStorage.setItem('Image', Image);
    } catch (e) {}
  };

};

export default User;
