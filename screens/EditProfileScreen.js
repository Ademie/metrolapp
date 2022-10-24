import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../style/styles';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../splash/custominput/CustomInput';
import {useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import {doc, onSnapshot, updateDoc} from 'firebase/firestore';
import {db, storage} from '../firebase/firebase-config';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = () => {
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(false);
  const [fireImage, setfireImage] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordShown, setPasswordShown] = useState(true);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  const takePhoto = async () => {
    await ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };
  const fromDevice = async () => {
    await ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };

  const uploadImage = () => {
    const storageRef = ref(storage, 'profilepicture');
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      snapshot => {
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // switch (snapshot.state) {
        //   case 'paused':
        //     break;
        //   case 'running':
        //     break;
        // }
      },
      error => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL);
          // setUpload(downloadURL);
          setfireImage(downloadURL)
        });
      },
    );
  };

  // FETCH User DATA
  // const fetchUser = async () => {
  //   let userToken = await AsyncStorage.getItem('userToken');
  //   let userID = JSON.parse(userToken);
  //   const unsub = onSnapshot(doc(db, 'users', userID), doc => {
  //     setUsername(doc.data().username);
  //     setPassword(doc.data().password);
  //     setEmail(doc.data().email);
  //     // SET VALUES OF THE INPUT FIELD TO VALUE FETCHED FROM DB
  //     setValue('username', username);
  //     setValue('password', password);
  //     setValue('email', email);
  //     console.log('user', typeof username);
  //   });
  //   return () => {
  //     unsub();
  //   };
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, [username, password, email]);
  useEffect(() => {
    logUser();
  }, [username, password, email]);
  const logUser = async () => {
    const username = await AsyncStorage.getItem('Username');
    const email = await AsyncStorage.getItem('Email');
    const password = await AsyncStorage.getItem('Password');
    setUsername(username);
    setEmail(email);
    setValue('username', username);
    setValue('password', password);
    setValue('email', email);
  };

  // UPDATE THE USER DATA
  const updateData = async fieldValues => {
    const {username, password} = fieldValues;
    let userToken = await AsyncStorage.getItem('userToken');
    let userID = JSON.parse(userToken);
    const data = {username: username, password: password, img: image};
    await updateDoc(doc(db, 'users', userID), data);
    Alert.alert('Success', 'Date Updated Successfully');
    uploadImage();
    navigation.goBack()
  };

  if (username == '') {
    return (
      <View style={[tw`flex-1 justify-center`, {alignItems: 'center'}]}>
        <ActivityIndicator size="large" color="#f73d67" />
      </View>
    );
  }

  return (
    <View
      style={{
        paddingTop: 60,
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          marginBottom: 30,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>Edit Profile</Text>

        {/* UPDATE VALUE OF FIELDS */}
        <TouchableOpacity onPress={handleSubmit(updateData)}>
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* PROFILE PHOTO */}
      <Image
          style={[
            tw`rounded-full`,
            {height: 80, width: 80, resizeMode: 'contain'},
          ]}
          source={{
            uri: image ? image : 'https://i.ibb.co/YBNF72S/profile-user.png',
          }}
        />

      {/* UPLOAD IMAGE BUTTONS */}
      <View style={[tw`flex-row justify-center mt-4`]}>
        <TouchableOpacity
          onPress={takePhoto}
          style={[tw`w-10 h-6 rounded pt-1 mx-2`, styles.bgred]}>
          <Icon
            name="camera"
            type="font-awesome"
            style={tw`text-center text-white`}
            size={16}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={fromDevice}
          style={[tw`w-10 h-6 pt-1 rounded mx-2`, styles.bgred]}>
          <Icon
            name="upload"
            type="font-awesome"
            style={tw`text-center text-white`}
            size={16}
          />
        </TouchableOpacity>
      </View>

      {/* TEXT INPUT */}
      <Text style={[styles.profLabel, {marginTop: 30}]}>User</Text>
      <View style={styles.profField}>
        <CustomInput
          style={styles.profInput}
          iconName="user"
          name="username"
          placeholder="Username..."
          control={control}
          rules={{
            required: {value: true, message: 'Username is required'},
          }}
        />
      </View>

      {/* PASSWORD FIELD */}
      <Text style={[styles.profLabel, {marginTop: 35}]}>Password</Text>
      <View style={[{position: 'relative'}, styles.profField]}>
        <CustomInput
          iconName="lock"
          eyeName="eye"
          name="password"
          placeholder="User Password..."
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Minimum of 6 characters',
            },
          }}
          secureTextEntry={passwordShown ? true : false}
        />
        {/* TOGGLE PASSWORD VISIBILITY */}
        <TouchableOpacity
          style={{position: 'absolute', right: 0, top: 10}}
          onPress={togglePasswordVisiblity}>
          <Icon name="eye" type="font-awesome" color="#f73d67" size={20} />
        </TouchableOpacity>
      </View>

      {/* TEXT INPUT */}
      <Text style={[styles.profLabel, {marginTop: 30}]}>Email</Text>
      <View style={styles.profField}>
        <CustomInput
          editable={false}
          selectTextOnFocus={false}
          style={styles.profInput}
          iconName="user"
          name="email"
          placeholder="Your email..."
          control={control}
          rules={{
            //   pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
            required: {value: true, message: 'Email is required'},
          }}
        />
      </View>
      <Text style={styles.disabled}>
        Your email can't be changed. If you want to link your account to another
        email, please contact customer support.
      </Text>

      {/* UPLOAD BUTTON */}
      {/* <View  style={styles.upbtn}>
        <TouchableOpacity
          onPress={uploadImage}
          
          disabled={!image}
          style={[tw`w-50 h-7 rounded mx-2`,
           !image? styles.lightred : styles.bgred
           ]}
        >
          <Text
            style={[
              tw`text-white text-center pt-1`,
              {fontWeight: '600', fontSize: 16},
            ]}>
            Upload Image
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default EditProfileScreen;
