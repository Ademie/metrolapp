import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import splash from '../../style/splash';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';


const CustomInput = ({
  placeholder,
  name,
  iconName,
  editable,
  selectTextOnFocus,
  rules = {},
  control,
  secureTextEntry,
}) => {
  


  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              splash.sin_action,
              {borderBottomColor: error ? 'red' : '#f2f2f2'},
            ]}>
            <Icon
              name={iconName}
              type="font-awesome"
              color="#f73d67"
              size={20}
            />
            <TextInput
              value={value}
              placeholder={placeholder}
              style={splash.sin_textInput}
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              editable={editable}
              selectTextOnFocus={selectTextOnFocus}
            /> 
          </View>
          {error && (
            <Animatable.View animation="bounceIn" duration={500}>
              <Text style={splash.errorMsg}>{error.message || 'Error'}</Text>
            </Animatable.View>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;
