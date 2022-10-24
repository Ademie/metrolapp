import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StackPay = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="pk_live_395a65e7f388fa6176b19b34f79da711b067af9a"
        amount={'25000.00'}
        billingEmail="paystackwebview@something.com"
        activityIndicatorColor="#f73d67"
        onCancel={(e) => {
          // handle response here
          navigation.goBack()
        }}
        onSuccess={(res) => {
          // handle response here
          Alert.alert('Payment Made Succesfully')
          navigation.navigate('Rides')
        }}
        autoStart={true}
      />
    </View>
  );
}

export default StackPay