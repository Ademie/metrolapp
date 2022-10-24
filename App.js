import React, {useEffect, useReducer, useMemo, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './redux/store';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import {View, ActivityIndicator, Text, Alert} from 'react-native';
import tw from 'twrnc';
import CustomDrawer from './components/CustomDrawer';
import XplashNavigator from './splash/XplashNavigator';
import Rides from './drawers/Rides';
import Support from './drawers/Support';
import Wallet from './drawers/Wallet';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from './context/AuthContext';
import {authReducer} from './context/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import {db} from './firebase/firebase-config';
import EditProfileScreen from './screens/EditProfileScreen';
import NavFavourites from './components/NavFavourites';

const Drawer = createDrawerNavigator();

//TEMPORARY DRAWBAR PAGES
const MenuItem = props => (
  <View style={[tw`flex-1 justify-center`, {alignItems: 'center'}]}>
    <Text>{props.name}</Text>
  </View>
);

const App = () => {
  const navigation = useNavigation;

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };
  // LOGINSTATE IS THE NEW STATE
  // DISPATCH WILL DISPATCH THE ACTION FROM AUTHREDUCER
  const [loginState, dispatch] = useReducer(authReducer, initialLoginState);

  // USEMEMO HOOK FOR MEMORY OPTIMIZATION...

  const authContextMemo = useMemo(
    () => ({
      // GET EMAIL, PASSWORD AND THE USER UID
      signIn: async (email, password, userID) => {
        const userToken = JSON.stringify(userID);
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGIN', id: email, token: userToken});
      },
      signUp: async (email, username, password, userID) => {
        let userToken;

        if (email && username && password) {
          userToken = JSON.stringify(userID);
          try {
            await AsyncStorage.setItem('userToken', userToken);
            await setDoc(doc(db, 'users', userID), {
              username: username,
              email: email,
              password: password,
              userID: userID,
              timeStamp: serverTimestamp(),
            });
            await AsyncStorage.setItem('username', username);
          } catch (e) {
            console.log(e);
          }
          dispatch({type: 'REGISTER', id: email, token: userToken});
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  //STATE TO HOLD VALUES FROM FIREBASE
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Home, setHome] = useState('Home');
  const [Work, setWork] = useState('Work');
  const [Image, setImage] = useState('');

  useEffect(() => {
    fetchUser();
    fetchLocation();
  });
  // FETCH USER INFO FROM FIREBASE
  const fetchUser = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    let userID = JSON.parse(userToken);
    const unsub = onSnapshot(doc(db, 'users', userID), doc => {
      setUsername(doc.data().username);
      setEmail(doc.data().email);
      setPassword(doc.data().password);
      setImage(doc.data().img);
    });

    // STORE USER FROM FIREBASE IN ASYNCSTORAGE
    try {
      await AsyncStorage.setItem('Username', Username);
      await AsyncStorage.setItem('Email', Email);
      await AsyncStorage.setItem('Password', Password);
      await AsyncStorage.setItem('Image', Image)
    } catch (e) {
      console.log(e);
    }
    // return () => {
    //   unsub();
    // };
  };

  // FETCH USER LOCATION
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
    try {
      await AsyncStorage.setItem('Home', Home);
      await AsyncStorage.setItem('Work', Work);
    } catch (e) {
      console.log(e);
    }
    return () => {
      homeSub();
      workSub();
    };
  };
  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'GET_TOKEN', token: userToken});
    }, 1000);
  }, []);

  // CREATE A LOADER THAT LOADS IMMEDIATELY USER ENTERS THE APP
  if (loginState.isLoading) {
    return (
      <View style={[tw`flex-1 justify-center`, {alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="#f73d67" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContextMemo}>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaProvider>
            {/* If user does not exist, then display the splash screen, else take them into the app */}
            {loginState.userToken !== null ? (
              <Drawer.Navigator
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{
                  headerShown: false,
                  drawerLabelStyle: {marginLeft: -22, fontSize: 17},
                  drawerActiveBackgroundColor: '#f73d67',
                  drawerActiveTintColor: '#fff',
                  drawerInactiveTintColor: '#222',
                }}>
                <Drawer.Screen
                  name="Home"
                  component={HomeNavigator}
                  options={{
                    drawerIcon: ({color}) => (
                      <Icon
                        name="home"
                        type="font-awesome"
                        color={color}
                        size={20}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="Rides"
                  component={Rides}
                  options={{
                    drawerIcon: ({color}) => (
                      <Icon
                        name="car"
                        type="font-awesome"
                        color={color}
                        size={20}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="Settings"
                  component={EditProfileScreen}
                  options={{
                    drawerIcon: ({color}) => (
                      <Icon
                        name="cog"
                        type="font-awesome"
                        color={color}
                        size={20}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="Support"
                  component={Support}
                  options={{
                    drawerIcon: ({color}) => (
                      <Icon
                        name="phone"
                        type="font-awesome"
                        color={color}
                        size={20}
                      />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="Wallet"
                  component={Wallet}
                  options={{
                    drawerIcon: ({color}) => (
                      <Icon
                        name="money"
                        type="font-awesome"
                        color={color}
                        size={20}
                      />
                    ),
                  }}
                />
              </Drawer.Navigator>
            ) : (
              <XplashNavigator />
            )}
          </SafeAreaProvider>
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
    // #ef6685
    // #f73d67
  );
};

export default App;
