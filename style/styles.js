import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  // HOMESCREEN
  top: {
    alignItems: 'center',
    position:'absolute',
    top:responsiveHeight(1),
    zIndex:10,
    paddingLeft:15,
    paddingRight:15,
  },
  barcontainer: {
    marginRight: responsiveWidth(60),
  },
  bar: {
    fontSize: 15,
  },
  whereTo:{
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    width: '90%',
    marginBottom:10,
  },
  searchTo:{
    backgroundColor: '#f73d675f',
    borderRadius:100,
    padding:5,
    marginRight:10,
  },
  searchIcon:{
    fontSize:18,
  },
  textTo:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  bgred: {
    backgroundColor: '#f73d67',
  },
  lightred: {
    backgroundColor: '#f73d675f',
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 0,
    minWidth: '100%',
    width: 400,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  textInput: {
    backgroundColor: '#dddddf',
    borderRadius: 0,
    fontSize: 18,
  },
  gray: {
    backgroundColor: '#555',
    color: '#fff',
  },
  //   NAVOPTIONS
  center: {
    position: 'relative',
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  rounded: {
    justifyContent: 'center',
    backgroundColor: '#f73d67',
    height: 45,
    width: 45,
    borderRadius: 50,
    overflow: 'hidden',
  },
  //   NAVFAVOURITES
  center: {
    position: 'relative',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  round: {
    marginRight: 7,
    justifyContent: 'center',
    backgroundColor: '#f73d67',
    height: 35,
    width: 35,
    borderRadius: 50,
    overflow: 'hidden',
  },

  //   RIDECARD
  space: {
    marginBottom: 120,
  },

  // RIDES TABLE
  back: {
    marginLeft: '5%',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
    alignItems: 'center',
    padding: 15,
  },
  favicon: {
    marginRight: 7,
    justifyContent: 'center',
    height: 30,
    width: 30,
    borderRadius: 50,
    overflow: 'hidden',
  },
  destin: {
    minWidth: responsiveWidth(52),
    maxWidth: responsiveWidth(52),
    marginRight: 20,
  },
  dummy: {
    marginTop: responsiveHeight(-20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f73d675f',
    borderRadius: 500,
    height: 100,
    width: 100,
  },
  // PROFILE SCREEN
  edit: {
    marginLeft: responsiveWidth(55),
    color: '#f73d67',
  },
  details: {
    alignItems: 'center',
    borderBottomColor: '#f73d67',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 0,
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
  mailInfo: {
    padding: 15,
    paddingLeft: 0,
    alignSelf: 'center',
    width: responsiveWidth(90),
    flexDirection: 'row',
    position:'relative',
    
  },
  mailIcon: {
    marginTop:7,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
    marginRight: 10,
  },
  addButton:{
    
    position:'absolute',
    top:20,
    right:0,
    
    backgroundColor: '#f73d67',
    borderRadius: 10,
    padding:5,
    height:22,
    width:35,
  },
  profHead: {
    paddingLeft: 20,
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 20,
    marginBottom: 20,
  },
  // EDITPROFILE SCREEN
  cancel: {
    marginRight: responsiveWidth(20),
    marginLeft: responsiveWidth(5),
    color: '#f73d67',
  },
  done: {
    marginLeft: responsiveWidth(28),
    color: '#f73d67',
  },
  profField: {
    width: responsiveWidth(90),
    borderBottomColor: '#f73d67',
    borderBottomWidth: 0.5,
  },
  profLabel: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  disabled: {
    padding: 5,
    marginTop: 10,
    color: '#444',
  },
  upbtn:{
    marginTop:responsiveHeight(25),
    borderRadius:5,

  },


  // Payment/wallet
  modal:{
    backgroundColor: 'white',
    borderRadius:20,
    height: responsiveHeight(40),
    width: responsiveWidth(90),
    position:'absolute',
    bottom: 0,
    left:0,
    right:0,
  },
  checkButton:{
    position:'absolute',
    top:20,
    right:0,
    height:12,
    width:35,
  },
  payButton:{
    position:'absolute',
    top:20,
    right:0,
    backgroundColor: '#f73d67',
    borderRadius: 50,
    padding:5,
    height:35,
    width:35,
    justifyContent:'center',
    alignItems:'center',
  },
  // ADDHOMESCREEN & ADDWORKSCREEN
  addBtn:{
    marginLeft:responsiveWidth(5),
    marginTop:responsiveHeight(7),
    backgroundColor: '#f73d67',
    borderRadius: 10,
    padding:5,
    height:22,
    width:45,
    alignItems:'center'
  },
});

export default styles;
