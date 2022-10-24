import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import styles from '../style/styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {selectHome, selectWork} from '../redux/navSlice';
import {useSelector} from 'react-redux';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {signOut} = useContext(AuthContext);
  // STORING VALUES FROM FIREBASE
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Home, setHome] = useState('');
  const [Work, setWork] = useState('');
  const [Img, setImg] = useState('');

  // DEFAULT LOCATION INFO FROM REDUX
  const home = useSelector(selectHome);
  const work = useSelector(selectWork);

  // REFRESH APP
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    logUser();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    logUser();
  }, []);
  const logUser = async () => {
    const Username = await AsyncStorage.getItem('Username');
    const Email = await AsyncStorage.getItem('Email');
    const Home = await AsyncStorage.getItem('Home');
    const Work = await AsyncStorage.getItem('Work');
    const Image = await AsyncStorage.getItem('Image')
    setUsername(Username);
    setEmail(Email);
    setHome(Home);
    setWork(Work);
    setImg(Image)
  };

  return (
    <ScrollView
      style={{
        paddingTop: 60,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* TOP BAR */}
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          marginBottom: 0,
        }}>
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" style={styles.back} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProfileScreen');
          }}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      {/* AVATAR AND NAME */}

      {/* PROFILE PHOTO */}
      <View style={styles.details}>
        <Image
          style={{height: 35, width: 35, resizeMode: 'contain'}}
          source={Img? Img :  require('../assets/images/user.png')}
        />
        <View style={tw`ml-2`}>
          <Text style={{fontSize: 25}}>{Username}</Text>
        </View>
      </View>
      {/* MAIL INFO */}
      <View style={styles.mailInfo}>
        <Icon name="envelope" style={[styles.mailIcon, {marginTop: 0}]} />
        <Text style={{fontSize: 14}}>{Email}</Text>
      </View>
      {/* SEPERATOR */}
      <View style={{height: 5, backgroundColor: '#e9e9e9'}}></View>
      {/* OTHER SECTIONS */}
      <Text style={styles.profHead}>Favourite Locations</Text>

      {/* HOME INFO */}
      <TouchableOpacity
        style={[
          styles.mailInfo,
          {borderBottomColor: '#f73d67', borderBottomWidth: 0.2},
        ]}
        onPress={() => {
          navigation.navigate('AddHomeScreen');
        }}>
        <Icon name="home" style={styles.mailIcon} />
        <View>
          <Text style={{fontSize: 14}}>Home</Text>
          <Text style={{fontSize: 12, color: 'gray'}}>
            {
              // HOME? `${HOME.substring(0,45)}...`: home.description
              Home ? `${Home.substring(0, 45)}...` : home.description
            }
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={{fontSize: 11, color: 'white', fontWeight: 'bold'}}>
            ADD
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* WORK INFO */}
      <TouchableOpacity
        style={styles.mailInfo}
        onPress={() => {
          navigation.navigate('AddWorkScreen');
        }}>
        <Icon name="briefcase" style={styles.mailIcon} />
        <View>
          <Text style={{fontSize: 14}}>Work</Text>
          <Text style={{fontSize: 12, color: 'gray'}}>
            {
              Work ? `${Work.substring(0, 45)}...` : work.description
            }
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={{fontSize: 11, color: 'white', fontWeight: 'bold'}}>
            ADD
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {/* SEPERATOR */}
      <View style={{height: 5, backgroundColor: '#e9e9e9'}}></View>
      <View style={{paddingLeft: 20, paddingTop: 20}}>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={[tw`flex-row`, {alignItems: 'center'}]}>
          <Icon name="sign-out" type="font-awesome" color="#f73d67" size={20} />
          <Text style={[tw`py-2 ml-2`, {color: '#f73d67'}]}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={[tw`flex-row`, {alignItems: 'center'}]}>
          <Icon name="trash" type="font-awesome" color="#f73d67" size={20} />
          <Text style={[tw`py-2 ml-2`, {color: '#f73d67'}]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
