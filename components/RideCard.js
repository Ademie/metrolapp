import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useReducer, useContext} from 'react';
import tw from 'tailwind-react-native-classnames';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectOrigin,
  selectDestination,
  selectTravelTime,
} from '../redux/navSlice';
import styles from '../style/styles';
import {Alert} from 'react-native';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {OrdersRef} from '../context/currentUser';

// import 'intl';
// import 'intl/locale-data/jsonp/en-NG'; // or any other locale you need

//45 naira charge per minute
const price = 45;
const PRICE_SURGE = 1.75;
let PRICE;

// ORIGIN
// DESTINATION
// SELECTED RIDE

const RideCard = () => {
  const {bookRide} = useContext(AuthContext);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelTime = useSelector(selectTravelTime);

  const data = [
    {
      id: 'Metrol-X',
      title: 'Metrol X',
      multiplier: 1,
      image: 'https://links.papareact.com/3pn',
    },
    {
      id: 'Metro-XL',
      title: 'Metrol XL',
      multiplier: 1.2,
      image: 'https://links.papareact.com/5w8',
    },
    {
      id: 'MetroL-XM-250',
      title: 'Metrol LUX',
      multiplier: 1.75,
      image: 'https://links.papareact.com/7pf',
    },
  ];

  const docData = {
    price: PRICE,
    type: selected?selected.title : null,
    destination:destination.description,
    // carID: selected.id,
    originLat: JSON.stringify(origin.location.lat),
    originLong: JSON.stringify(origin.location.lng),
    destinLat: JSON.stringify(destination.location.lat),
    destinLong: JSON.stringify(destination.location.lng),
    createdAt: serverTimestamp(),
  };

  const BookRider = async () => {
    try {
      // GET THE CURRENT USER ID
      let userToken = await AsyncStorage.getItem('userToken');
      let userID = JSON.parse(userToken);
      // ADD ORDERS UNDER THE PARTICULAR USER using HIS ID
      const usersRef = doc(db, 'users', userID);
      await addDoc(collection(usersRef, 'orders'), docData);
      Alert.alert('Order Placed Successfully');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={[tw`bg-white flex-grow `, styles.space]}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select A Ride - {travelTime?.distance.text}
        </Text>
      </View>

      {/* AVAILABLE RIDES */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item: {id, title, multiplier, image}, item}) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={[
              id === selected?.id && styles.lightred,
              tw`flex-row items-center justify-between px-2`,
            ]}>
            <Image
              style={{height: 90, width: 100, resizeMode: 'contain'}}
              source={{uri: image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-lg font-semibold`}>{title}</Text>
              <View style={tw`flex-row items-center`}>
                <Icon name="car" />
                <Text style={{marginLeft: 5}}>{travelTime?.duration.text}</Text>
              </View>
            </View>
            <Text style={tw`text-lg`}>
              {
                (PRICE = new Intl.NumberFormat('en-ng', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(
                  (travelTime?.duration.value / 60) *
                    price *
                    PRICE_SURGE *
                    multiplier,
                ))
              }
            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity
          disabled={!selected}
          
          onPress={BookRider}

          style={[
            !selected ? styles.lightred : styles.bgred,
            tw`rounded-full py-3 m-3`,
          ]}>
          <Text style={tw`text-center text-white  text-lg`}>
            Book {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};

export default RideCard;
