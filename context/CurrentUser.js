// MAKE CURRENT USER AVAILABLE FOR EVERYONE
import {collection, doc} from 'firebase/firestore';
import {
  forwardRef,
  useContext,
  useRef,
  useImperativeHandle,
  useState,
} from 'react';
import {db} from '../firebase/firebase-config';
import {AuthContext} from './AuthContext';

const CurrentUser = forwardRef((props, ref) => {
  const [currentID, setCurrentID] = useState(false);
  const [userToken] = useContext(AuthContext);
  // If there's a user, get his uid
  useImperativeHandle(ref, () => ({
    userFunction() {
      {
        userToken && setCurrentID(currentID.uid);
      }
    },
  }));

  const OrdersRef = () => {
    const userRef = useRef(null);
    const userIDRef = userRef.current.userFunction();
    return (
      // collection(db, "users", userIDRef, "orders"),
      doc(db, 'users', userIDRef, 'orders'), (<CurrentUser ref={userRef} />)
    );
  };
});

export default CurrentUser;
export const { OrdersRef } = CurrentUser
// useImperativeHandle
// youtube.com/watch?v=N8PwptJ6Qlk
