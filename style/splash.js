import {StyleSheet, Dimensions, Platform} from 'react-native';


const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const splash = StyleSheet.create({
  // SPLASHSCREEN
  container: {
    flex: 1,
    // backgroundColor: '#009387'
    backgroundColor: '#fff',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  footer: {
    flex: 1,
    backgroundColor: '#f73d67',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    // color: '#05375a',
    color:'#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    // color: 'grey',
    color:'#ddf',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor:'#fff'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    paddingRight:10,
  },

  // SIGN IN SCREEN
  sin_contain: {
    flex: 1, 
    backgroundColor: '#f73d67',
  },
  sin_header: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems:'center',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  sin_footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  sin_text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  sin_text_footer: {
      color: '#05375a',
      fontSize: 16
  },
  sin_action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,

      
  },
  sin_actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  sin_textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  sin_button: {
      alignItems: 'center',
      marginTop: 50
  },
  sin_signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  sin_textSign: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white'
  }
});

export default splash;
