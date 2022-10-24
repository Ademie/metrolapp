import React, {useRef} from 'react';
import {View, SafeAreaView} from 'react-native';
import tw from 'twrnc';
import {GOOGLE_MAPS_KEY} from '@env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import Places from '../components/Places';
import styles from '../style/styles';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  setOrigin,
  selectOrigin,
  setDestination,
  selectDestination,
} from '../redux/navSlice';
import {useEffect} from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, onSnapshot} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';

navigator.geolocation = require('@react-native-community/geolocation');

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const ref = useRef();
  const [Home, setHome] = useState('');
  const [HomeLocation, setHomeLocation] = useState('');
  const [Work, setWork] = useState('');
  const [position, setPosition] = useState({})
  const [WorkLocation, setWorkLocation] = useState('');
  

  navigator.geolocation.getCurrentPosition(position => {
    // console.log('wokeeey', position.coords);
    setPosition(position.coords)
  });

  useEffect(() => {
    fetchLocation();
    ref.current?.setAddressText(position)
    // {
    //   Home ? ref.current?.setAddressText('Home? Home: '): ref.current?.setAddressText(position)
    // }
  }, []);
  const fetchLocation = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    let userID = JSON.parse(userToken);
    const homeSub = onSnapshot(
      doc(db, 'users', userID, 'location', 'homecustomID'),
      doc => {
        setHome(doc.data().description);
        setHomeLocation(doc.data().location);
        // setOrigin(HomeLocation)
      },
    );
    const workSub = onSnapshot(
      doc(db, 'users', userID, 'location', 'workcustomID'),
      doc => {
        setWork(doc.data().description);
        setWorkLocation(doc.data().location);
      },
    );
  };

  const homePlace = {
    id: 'Home',
    description: Home,
    geometry: {location: {lat: HomeLocation.lat, lng: HomeLocation.lng}},
  };
  const workPlace = {
    id: 'Work',
    description: Work,
    geometry: {location: {lat: WorkLocation.lat, lng: WorkLocation.lng}},
  };

  return (
    <SafeAreaView>
      {/* LOCATION */}
      <GooglePlacesAutocomplete
        ref={ref}
        debounce={100}
        mapTypeControl={true}
        placeholder="Your location"
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
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            }),
          );
          dispatch(setDestination(null));
        }}
        fetchDetails={true}
        enableHighAccuracyLocation={true}
        currentLocation={true}
        currentLocationLabel="Current location"
        predefinedPlaces={[homePlace, workPlace]}
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

      {/* DESTINATION */}
      <GooglePlacesAutocomplete
        textInputHide={!origin ? true : false}
        placeholder="Destination"
        nearbyPlacesAPI="GooglePlaceSearch"
        debounce={100}
        fetchDetails={true}
        returnKeyType={'search'}
        minLength={2}
        enablePoweredByContainer={false}
        predefinedPlaces={[homePlace, workPlace]}
        styles={{
          disabled: true,
          textInput: {
            fontSize: 16,
            marginLeft: 10,
            marginBottom: 5,
          },
          container: {
            position: 'absolute',
            top: 100,
            left: 10,
            right: 0,
            width: '90%',
          },
        }}
        query={{
          key: GOOGLE_MAPS_KEY,
          language: 'en',
          region: 'ng',
        }}
        renderRow={GooglePlaceData => <Places data={GooglePlaceData} />}
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            }),
          );
          navigation.navigate('MapScreen');
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
    </SafeAreaView>
  );
};

export default SearchScreen;
