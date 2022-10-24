import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../redux/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "../style/styles";

const NavCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1 flex-shrink`}>
      <Text style={tw`text-center py-5 text-xl`}>Hello, Ademie</Text>
      <View style={tw`border-t border-gray-200 `}>
        <View accessibilityRole="scrollbar">
          <GooglePlacesAutocomplete
            placeholder="Destination"
            nearbyPlacesAPI="GooglePlaceSearch"
            debounce={100}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            styles={styles}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: "en",
              region: 'ng',
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideCard");
            }}
          />
        </View>
      </View>
      <NavFavourites />
      {/* FOOTER CONTENTS */}
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        {/* Button for rides */}
        <TouchableOpacity 
        onPress={()=>navigation.navigate('RideCard')}
        style={[tw`flex-row justify-between w-24 px-4 py-3 rounded-full`, styles.bgred]}>
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-center text-white`}>Rides</Text>
        </TouchableOpacity>
        {/* Button for weather */}
        <TouchableOpacity style={[tw`flex-row justify-between  w-24 px-2 py-3 rounded-full`, styles.gray, styles.bgred]}>
          <Icon
            name="cloud"
            color="white"
            size={18}
          />
          <Text style={tw`text-center text-white`}>Weather</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavCard;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     paddingTop: 20,
//     flex: 0,
//     minWidth: "100%",
//     width: 400,  
//   },
//   textInputContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 0,
    
//   },
//   textInput: {
//     backgroundColor: "#dddddf",
//     borderRadius: 0,
//     fontSize: 18,
//   },
//   gray:{
//     backgroundColor:'#555',
//     color: '#fff'
//   }
// });
