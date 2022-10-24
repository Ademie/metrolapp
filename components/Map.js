import {Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import tw from 'twrnc';
import {useSelector, useDispatch} from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from '@env';
import {
  selectDestination,
  selectOrigin,
  setTravelTime,
} from '../redux/navSlice';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';
import {checkLocationAccuracy, PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';


navigator.geolocation = require('@react-native-community/geolocation');


const Map = props => {



request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
  console.log('results', result)
});

  check(PERMISSIONS.IOS.LOCATION_ALWAYS)
  .then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        console.log('The permission has not been requested / is denied but requestable');
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore', RESULTS);
        break;
    }
  })
  .catch((error) => {
    // …
  });



  checkLocationAccuracy()
  .then((accuracy) => console.log(`Location accuracy is: ${accuracy}`))
  .catch(() => console.warn('Cannot check location accuracy')); 


  const [cars, setCars] = useState([]);

  
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const isSatellite = true;

  const getImage = type => {
    if (type === 'MetrolX') {
      return require('/Users/Ademie/Desktop/Ademie/metrol/assets/images/blue.png');
    }
    if (type === 'MetrolXL') {
      return require('/Users/Ademie/Desktop/Ademie/metrol/assets/images/white.png');
    }
    if (type === 'MetrolLUX') {
      return require('/Users/Ademie/Desktop/Ademie/metrol/assets/images/suv.png');
    }
    return require('/Users/Ademie/Desktop/Ademie/metrol/assets/images/red.png');
  };


  // const getLocationAsync = async () => {
  //   let {status} = await PERMISSIONS.askAsync(PERMISSIONS.LOCATION) 
  //   if(status !== 'granted'){
  //     console.log('Location permision denied')
  //   }

  //   let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
  //   let region = {
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //     latitudeDelta: 0.045,
  //     longitudeDelta: 0.045
  //   }
  // } 
  
  useEffect(() => {
    // getLocationAsync()
    const fetchCars = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, 'cars'));
        querySnapshot.forEach(doc => {
          list.push({id: doc.id, ...doc.data()});
        });
        
        setCars(list);
      } catch (e) {
        console.log('fetch error', e);
      }
    };
    fetchCars();
  }, []);

  // ZOOM AND FIT TO MARKERS
  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers([origin, destination], {
      edgePadding: {top: 50, bottom: 50, right: 50, left: 50},
      animated: true,
    });
  }, [origin, destination]);



  // CALCULATE TRAVEL TIME
  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_KEY}`,
      )
        .then(res => res.json())
        .then(data => {
          dispatch(setTravelTime(data.rows[0].elements[0]));
          console.log(data.rows[0].elements[0]);
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_KEY]);

  return (
    <MapView
      showsUserLocation={true}
      ref={mapRef}
      style={tw`flex-1`}
      mapType={isSatellite ? 'standard' : 'satellite'}
      showsMyLocationButton={true}
      showsCompass={true}
      initialRegion={{
        latitude: 7.257132500000001,
        longitude:  5.205790899999999,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05,
      }}
      region={{
        // IF USER SETS AN ORIGIN, RETURN THE LOCATION ELSE RETURN THE LOCATION OF AKURE BY DEFAULT.
        latitude: origin ? origin.location.lat : 7.257132500000001,
        longitude: origin ? origin.location.lng : 5.205790899999999,
       
      }}>
      {/* SHOW DIRECTIONS */}
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {/* RENDER CARS ON MAP */}
      {cars.map(car => (
        <Marker
          key={car.id}
          coordinate={{
            latitude: car.lat,
            longitude: car.long,
          }}>
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
              transform: [
                {
                  rotate: `${car.heading}deg`,
                },
              ],
            }}
            source={getImage(car.type)}
          />
        </Marker>
      ))}

      {/* RENDER A MARKER IF ORIGIN IS SELECTED */}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Location"
          description={origin.description}
          identifier="origin"
        />
      )}

      {/* RENDER A MARKER IF DESTINATION IS SELECTED */}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Location"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};
export default Map;
