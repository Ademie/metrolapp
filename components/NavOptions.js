import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../redux/navSlice';
import styles from '../style/styles';

const data = [
  {
    id: '321',
    title: 'Get a Ride',
    image: require('/Users/Ademie/Desktop/Ademie/metrol/assets/images/CarWhite.png'),
    screen: 'SearchScreen',
  }
];

const NavOptions = ({}) => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    // Clickable display
    <FlatList
      data={data}
      horizontal
      renderItem={({item}) => (
        <TouchableOpacity
          // style={[tw`pt-4 pb-8 pl-6 pr-2 m-2 w-85`,{borderRadius:50},styles.red]}
          onPress={() => navigation.navigate(item.screen)}>
          <View style={{}}>
            <Image
              style={{
                position: 'relative',  
                backgroundColor: '#f73d67',
            
                height: 350, width: 350, 
                resizeMode: 'contain',
                borderRadius:350,
                
              }}
              source={item.image}
            />
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
            <Text style={[tw`mt-2 text-lg font-semibold`]}>{item.title}</Text>
            <View style={styles.rounded}>
              <Icon
                style={[tw`p-2`, styles.center]}
                name="arrow-right"
                color="white"
              />
            </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
