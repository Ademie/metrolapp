import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import styles from '../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, onSnapshot, query, orderBy} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';

const Rides = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  // FETCH Order DATA
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    let userID = JSON.parse(userToken); 
    // REALTIME FETCHING OF DATA 
    const orderRef = collection(db, 'users', userID, 'orders');
    // ORDER DATA BY CREATE TIME
    const q = query(orderRef, orderBy('createdAt'));
    const unsub = onSnapshot( 
      // collection(db, 'users', userID, 'orders'),
      q,
      snapshot => {
        let list = [];
        snapshot.docs.forEach(doc => {
          list.push({id: doc.id, ...doc.data()});
        });
        setOrders(list.map((val)=>{
          return val
        }))
        
      },
      error => {
        console.log(error);
      },
    );
    return () => {
      unsub();
    };
  };

  const item = ({item}) => {
    return (
      <>
        <TouchableOpacity style={styles.tabRow} onPress={() => {}}>
          {/* MONTH TITLE */}
          <View style={[styles.favicon]}>
            <Icon
              name="car"
              style={[tw`p-2`, {paddingRight:15, paddingLeft:6,},styles.center, styles.bgred]}
            />
          </View>
          <View style={styles.destin}>
            <Text style={tw`text-gray-900`}>
              {item.destination.length >= 26
                ? item.destination.substring(0, 28) + '...'
                : item.destination}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[tw`text-gray-700 text-sm`, {fontSize: 12}]}>
                {new Date(item.createdAt.seconds * 1000).toDateString()},
              </Text>
              <Text style={[tw`text-gray-700 text-sm`, {fontSize: 12}]}>
                {new Date(item.createdAt.seconds * 1000).toLocaleTimeString()}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{fontWeight: 'bold'}}>{item.price}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrow-left" style={styles.back} />
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: '5%',
          fontWeight: 'bold',
          fontSize: 25,
          color: '#f73d67',
        }}>
        My rides
      </Text>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <FlatList
          data={orders}
          renderItem={item}
          keyExtractor={(item, index) => index.toString()}
        /> */}
        {orders ? (
          <FlatList
            data={orders}
            renderItem={item}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          // DISPLAY DUMMY IMAGE IF THERE ARE NO ORDERS
          <>
            <View style={styles.dummy}>
              <Image
                style={{height: 120, width: 120, resizeMode: 'contain'}}
                source={{uri: 'https://links.papareact.com/3pn'}}
              />
            </View>
            
            <Text>No orders yet</Text>
            <Text>When you complete a trip, it will appear here.</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Rides;
