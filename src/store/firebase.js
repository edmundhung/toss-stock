import * as firebase from 'firebase';
import { getStockByCode } from './reducers';
import {
  CREATE,
  UPDATE_ITEM,
  UPDATE_EVENT,
  DELETE,
  CREATE_ID_PHOTO,
  DELETE_ID_PHOTO,
  CREATE_SCAN_PHOTO,
  DELETE_SCAN_PHOTO,
  LIST_SHOW,
  DETAIL_SHOW,
  showList,
  showDetail,
} from './stock';

// Initialize user
const email = "lws629@ha.org.hk";
const password = "qazwsxcvbnm";
const config = {
  apiKey: 'AIzaSyD4JLrUw_PHEe5yaHG3G5iyLksZwdASxuM',
  authDomain: 'toss-stock.firebaseapp.com',
  databaseURL: 'https://toss-stock.firebaseio.com',
  projectId: 'toss-stock',
  storageBucket: 'toss-stock.appspot.com',
  messagingSenderId: '342832656429'
};

export default function middleware({ getState }) {
  // Initialize Firebase
  firebase.initializeApp(config);

  // Authentication
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error.code", errorCode);
    console.log("error", errorMessage);
  });

  const database = firebase.database();

  return next => action => {
    const result = next(action);

    switch (action.type) {
      case LIST_SHOW: {
        database
          .ref('/snapshot')
          .on('value', snapshot => next(
            showList(snapshot.val())
          ));

        break;
      }
      case DETAIL_SHOW: {
        database
          .ref(`/snapshot/${action.payload.code}`)
          .on('value', snapshot => next(
            showDetail(action.payload.code, snapshot.val())
          ));

        break;
      }
      case CREATE:
      case UPDATE_ITEM:
      case UPDATE_EVENT:
      case DELETE:
      case CREATE_ID_PHOTO:
      case DELETE_ID_PHOTO:
      case CREATE_SCAN_PHOTO:
      case DELETE_SCAN_PHOTO: {
        const state = getState();
        const stockByCode = getStockByCode(state);

        database.ref('/snapshot').set(stockByCode);
        database.ref('/history').push().set(action);

        break;
      }
    }

    return result;
  };
}
