import {collection, doc, getDocs, onSnapshot, setDoc} from 'firebase/firestore';
import {db} from '../firebase/firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';

const User = (props) => {
  const [username, setUsername] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [image, setImage] = useState({});

  const fetchUser = async () => {
    let userToken = await AsyncStorage.getItem('userToken');
    let userID = JSON.parse(userToken);
    const unsub = onSnapshot(doc(db, 'users', userID), doc => {
      setUsername(doc.data().username);
      setEmail(doc.data().email);
      setPassword(doc.data().password);
      setImage(doc.data().image);
    });
    return () => {
      unsub();
    };
  };

};
export const userJSON = {
    Username: username,
    Email: email,
    Password: password,
    Image: image,
}

// export default User;
