import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import splash from '../style/splash';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {StatusBar} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {useForm} from 'react-hook-form';
import {Alert} from 'react-native';
import CustomInput from './custominput/CustomInput';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth, db} from '../firebase/firebase-config';


const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignInScreen = ({navigation}) => {
  // Destructure signIn function from AuthContext using UseContext
  const {signIn} = useContext(AuthContext);

  // REACT HOOKFORM STATES
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // HANDLESUBMIT FROM REACT-HOOK-FORMS WOULD GET FORM FIELD VALUES AS OBJECT
  // DESTRUCTURE THESE VALUES IN THE LOGIN HANDLE
  const loginHandle = fieldValues => {
    const {email, password} = fieldValues;
    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        const userID = res.user.uid;
        signIn(email, password, userID);
      })
      .catch(e => {
        Alert.alert('Invalid User', 'Email or password is incorrect', [
          {text: 'Okay'},
        ]);
      });
  };

  // PASSWORD VISIBILITY
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
            Holla!
            <Animatable.View animation="tada" duration={2500}>
              <Text style={[splash.textSign, {fontSize: 30}]}>👋🏻</Text>
            </Animatable.View>
          </Text>
        </View>

        {/* FOOTER */}
        <Animatable.View style={splash.sin_footer} animation="fadeInUpBig">
          <Text style={splash.sin_text_footer}>Email</Text>

          {/* EMAIL FIELD */}

          <CustomInput
            iconName="user"
            name="email"
            placeholder="Your Username..."
            control={control}
            rules={{required: 'Username is required'}}
          />

          {/* PASSWORD FIELD */}

          <Text style={[splash.sin_text_footer, {marginTop: 35}]}>
            Password
          </Text>
          <View style={{position: 'relative'}}>
            <CustomInput
              iconName="lock"
              name="password"
              placeholder="Your Password..."
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
          {/* FORGOT PASSWORD */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity>
              <Text style={{marginTop: 15, color: '#f73d67'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={{marginTop: 15, color: '#f73d67'}}>
                Don't have an account
              </Text>
            </TouchableOpacity>
          </View>
          {/* SIGNIN BUTTON */}
          <View style={splash.button}>
            <TouchableOpacity
              onPress={handleSubmit(loginHandle)}
              // onPress={()=>{loginHandle()}}
              style={splash.sin_signIn}>
              <LinearGradient
                colors={['#f73d67', '#ef6685']}
                style={splash.sin_signIn}>
                <Text style={splash.sin_textSign}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
