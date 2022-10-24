import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import React, {useEffect, useState} from 'react';
import  Icon  from "react-native-vector-icons/FontAwesome";
import styles from "../style/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { responsiveWidth } from "react-native-responsive-dimensions";

const NavFavourites = () => {
  const navigation = useNavigation()
  const [Home, setHome] = useState('')
  const [Work, setWork] = useState('')
  useEffect(() => {
      fetchLocation()
  });
  const fetchLocation = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    let userID = JSON.parse(userToken);
    const homeSub = onSnapshot(
      doc(db, 'users', userID, 'location', 'homecustomID'),
      doc => {
        setHome(doc.data().description);
      },
    );
    const workSub = onSnapshot(
      doc(db, 'users', userID, 'location', 'workcustomID'),
      doc => {
        setWork(doc.data().description);
      },
    );
  };

  const data = [
    {
      id: "123",
      icon: "home",
      title: "Home",
      destination: Home.length > 36 ? `${Home.substring(0,44)}...` : Home
    },
    {
      id: "456",
      icon: "briefcase",
      title: "Work",
      destination: `${Work.substring(0,44)}...`
    },
  ];
  return (
    <ScrollView horizontal={true}>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={()=>(
          <View style={[styles.lightred, {height:0.5}]}/>
      )}
      renderItem={({ item: { title, destination, icon } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-3`}
        onPress={()=>{navigation.navigate('SearchScreen')}}
        >
          <View style={styles.round}>
          <Icon
            style={[tw`p-2`, styles.center, styles.bgred]}
            name={icon}
            color="white"
            size={18}
          />
          </View>
          <View style={{width: responsiveWidth(75)}}>
            <Text style={tw`font-semibold`}>{title}</Text>
            <Text style={tw`text-gray-500 text-3`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    </ScrollView>
  );
};

export default NavFavourites;

