import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/styles';

const Places = ({data}) => {
  return (
    <View style={tw`flex-row justify-center items-center`}>
      <View style={[tw`rounded-full px-2 py-1.5 mr-3`, styles.bgred]}>
        {
          data.id === 'Home' ? (<Icon name="home" size={14} color="black" style={tw`text-white`} />)
          : data.id === 'Work' ? <Icon name="briefcase" size={14} color="black" style={tw`text-white`} />
          : <Icon name="map-marker" size={14} color="black" style={tw`text-white`} />
        }
      </View>
      <Text style={styles.locationText}>
        {data.description || data.vicinity}
      </Text>
    </View>
  );
};

export default Places;
