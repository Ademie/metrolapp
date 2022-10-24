import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import React, {useState, useContext} from 'react';
import splash from '../style/splash';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {StatusBar} from 'react-native';
import {useForm} from 'react-hook-form';
import CustomInput from './custominput/CustomInput';
import {AuthContext} from '../context/AuthContext';
import {auth} from '../firebase/firebase-config';
import {createUserWithEmailAndPassword } from 'firebase/auth';




const USER_REGEX = /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = ({navigation}) => {
  const {signUp} = useContext(AuthContext);

  // REACT HOOKFORM STATES
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  
  // handleSubmit from react-hook-forms would get form field values as object
  // destructure these values in the login Handle
  const signUpHandle = (fieldValues) => {
    const { email, username, password} = fieldValues
    // Note username shouldn't be passed into createUser...
    //cos it accepts only auth, email and password
    createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const userID = res.user.uid
      Alert.alert('Success', `Account Created ${username}`)
      signUp(email, username, password, userID)
    })
    .catch(e =>{
      console.log(e)
    })
  }

  // const actionCodeSettings = {
  //   // URL you want to redirect back to. The domain (www.example.com) for this
  //   // URL must be in the authorized domains list in the Firebase Console.
  //   url: 'https://metrolapp.firebaseapp.com',
  //   // This must be true.
  //   handleCodeInApp: true,
  //   iOS: {
  //     bundleId: 'com.metrol'
  //   },
  //   android: {
  //     packageName: 'com.metrol',
  //     installApp: true,
  //     minimumVersion: '12'
  //   },
  //   dynamicLinkDomain: 'https://metrolapp.page.link'
  // };
  
  // const signUpHandle = (fieldValues) => {
  //   const { email} = fieldValues
  //   sendSignInLinkToEmail(auth, email, actionCodeSettings)
  //   .then(()=>{
  //     Alert.alert('Verification sent')
  //     console.log('emailForsign', email)
  //   })
  //   .catch((e)=>{
  //     console.log(e)
  //   })
  // }


  const [passwordShown, setPasswordShown] = useState(true);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      enabled={true}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}>
      <View style={splash.sin_contain}>
        <StatusBar backgroundColor="#f73d67" barStyle="light-content" />
        <View style={splash.sin_header}>
          <Text style={splash.sin_text_header}>
            Sign Up!
            <Animatable.View animation="tada" duration={2500}>
              <Text style={[splash.textSign, {fontSize: 30}]}>✍🏻</Text>
            </Animatable.View>
          </Text>
        </View>

        {/* FOOTER */}
        <Animatable.View style={splash.sin_footer} animation="fadeInUpBig">
        <Text style={[splash.sin_text_footer, {marginTop: 30}]}>User</Text>
          {/* user NAME */}

           <CustomInput
            iconName="user"
            name="username"
            placeholder="username..."
            control={control}
            rules={{
              pattern: {value: USER_REGEX, message: 'username is invalid'},
              required: {value: true, message: 'username is required'},
            }}
          /> 
          <Text style={[splash.sin_text_footer, {marginTop: 30}]}>Email</Text>
          {/* EMAIL FIELD */}

          <CustomInput
            iconName="envelope"
            name="email"
            placeholder="Email Address..."
            control={control}
            rules={{
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
              required: {value: true, message: 'Email is required'},
            }}
          />
          {/* PASSWORD FIELD */}
          <Text style={[splash.sin_text_footer, {marginTop: 35}]}>
            Password
          </Text>
          <View style={{position: 'relative'}}>
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
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}>
              <Text style={{marginTop: 15, color: '#f73d67'}}>
                Already have an account?
              </Text>
            </TouchableOpacity>
          </View>
          {/* BUTTONS */}
          <View style={splash.button}>
            <TouchableOpacity
              onPress={handleSubmit(signUpHandle)}
              style={[
                splash.sin_signIn,
                {
                  borderColor: '#f73d67',
                  borderWidth: 1,
                },
              ]}>
              <Text style={[splash.sin_textSign, {color: '#f73d67'}]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
