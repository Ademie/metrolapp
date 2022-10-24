import {View, Text, TouchableOpacity, CheckBox, Alert} from 'react-native';
import React, {useContext, useState} from 'react';
import styles from '../style/styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  RoundedCheckbox,
  PureRoundedCheckbox,
} from "react-native-rounded-checkbox";

import {AuthContext} from '../context/AuthContext';

const Wallet = () => {
  const navigation = useNavigation();
  const {signOut} = useContext(AuthContext);

  
  return (
    <View
      style={{
        paddingTop: 60,
      }}>
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
      </View>
      {/* AVATAR AND NAME */}
      {/* PROFILE PHOTO */}
      <View style={[styles.details]}>
        <Text
          style={{
            marginLeft: '0%',
            fontWeight: 'bold',
            fontSize: 25,
            color: '#f73d67',
          }}>
          Payment
        </Text>
      </View>
      {/* MAIL INFO */}
      <TouchableOpacity
        style={styles.mailInfo}
        onPress={() => {
          navigation.navigate('Rides');
        }}>
        <Text style={{fontSize: 14, color: '#555'}}>See completed orders</Text>
      </TouchableOpacity>
      {/* SEPERATOR */}
      <View style={{height: 5, backgroundColor: '#e9e9e9'}}></View>
      {/* OTHER SECTIONS */}
      <Text style={styles.profHead}>Payment Methods</Text>
      {/* MAIL INFO */}

      <TouchableOpacity

        style={[
          styles.mailInfo,
          {borderBottomColor: '#f73d67', borderBottomWidth: 0.2},
        ]}>
        <Icon name="money" style={[styles.mailIcon, {marginTop: 0}]} />
        <View>
          <Text style={{fontSize: 14}}>Cash</Text>
        </View>
        <RoundedCheckbox 
        checkedColor='#f73d67'
        text="PAY"
        outerStyle={styles.checkButton}
        uncheckedColor="#ddd"
        onPress={(checked) => Alert.alert('Pay in Cash')} />
      </TouchableOpacity>

      {/* WORK INFO */}
      <View style={styles.mailInfo}>
        <TouchableOpacity style={styles.mailInfo}>
          <Icon name="credit-card" style={styles.mailIcon} />
          <View>
            <Text style={{fontSize: 14}}>Card</Text>
            <Text style={{fontSize: 12, color: 'gray'}}>
              Your payment is secured by a trusted third-party
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.payButton, {top: 34}]}
          onPress={() => {
            navigation.navigate('StackPay');
          }}>
          <Text style={{fontSize: 11, color: 'white', fontWeight: 'bold'}}>
            PAY
          </Text>
        </TouchableOpacity>
      </View>
      {/* SEPERATOR */}
      <View style={{height: 5, backgroundColor: '#e9e9e9'}}></View>
    </View>
  );
};

export default Wallet;
