import React, { useState } from 'react';
import {View, SafeAreaView, Text, TouchableOpacity, Alert} from 'react-native';
import tw from 'twrnc';
import {useDispatch} from 'react-redux';
import {GOOGLE_MAPS_KEY} from '@env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {setWork, selectWork} from '../redux/navSlice';
import {useNavigation} from '@react-navigation/native';
import Places from '../components/Places';
import styles from '../style/styles';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';

navigator.geolocation = require('@react-native-community/geolocation');

const AddWorkScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const work = useSelector(selectWork);
  const [selected, setSelected] = useState(null);


  const AddWork = async () => {
    try {
      // GET THE CURRENT USER ID
      let userToken = await AsyncStorage.getItem('userToken');
      let userID = JSON.parse(userToken);
      const usersRef = doc(db, 'users', userID);
      await setDoc(doc(usersRef, 'location', 'workcustomID'), work);
      Alert.alert('Work Added Successfully');
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView>
      {/* LOCATION */}
      <GooglePlacesAutocomplete
        debounce={100}
        placeholder="Add Address"
        nearbyPlacesAPI="GooglePlacesSearch"
        minLength={2}
        enablePoweredByContainer={false}
        returnKeyType={'search'}
        query={{
          key: GOOGLE_MAPS_KEY,
          language: 'en',
          components: 'country:ng',
        }}
        renderRow={GooglePlaceData => <Places data={GooglePlaceData} />}
        renderDescription={DescriptionRow =>
          DescriptionRow.description || DescriptionRow.vicinity
        }
        onPress={(data, details = null) => {
          dispatch(
            setWork({
              location: details.geometry.location,
              description: data.description,
            }),
            // TO DISABLE ADDD BUTTON IF NOTHING IS SELECTED
            setSelected(work)
          );
        }}
        fetchDetails={true}
        enableHighAccuracyLocation={true}
        styles={{
          textInput: {
            fontSize: 16,
            marginLeft: 10,
            marginBottom: 55,
          },
          container: {
            position: 'absolute',
            top: 50,
            left: 10,
            right: 0,
            width: '90%',
          },
        }}
      />
      {/* DOT NEAR ORIGIN INPUT*/}
      <View
        style={[tw`w-1 h-1 absolute top-18 rounded-full left-2`, styles.bgred]}
      />
      {/* CONNECTING LINE */}
      <View
        style={[tw`w-0.5 h-12 absolute top-19 left-2.2`, styles.lightred]}
      />
      {/* SQAURE NEAR DESTINATION INPUT*/}
      <View style={[tw`w-1 h-1 absolute top-30 left-2`, styles.bgred]} />
        <TouchableOpacity
          style={[styles.addBtn, !selected ? styles.lightred : styles.bgred]}
          onPress={AddWork}
          disabled={!selected}
          >
          <Text style={{fontSize: 11, color: 'white', fontWeight: 'bold'}}>
            ADD
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddWorkScreen;
