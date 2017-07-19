import React from 'react';
import * as firebase from "firebase";

class FirebaseTrial extends React.PureComponent {
  render() {
    // Initialize user
    var email = "lws629@ha.org.hk";
    var password = "qazwsxcvbnm";

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD4JLrUw_PHEe5yaHG3G5iyLksZwdASxuM",
      authDomain: "toss-stock.firebaseapp.com",
      databaseURL: "https://toss-stock.firebaseio.com",
      projectId: "toss-stock",
      storageBucket: "",
      messagingSenderId: "342832656429"
    };
    firebase.initializeApp(config);

    // Authentication
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error.code", errorCode);
      console.log("error", errorMessage);
    });

    // Get a reference to the database service
    var database = firebase.database();

    // Get full stock list
    firebase.database().ref("/").once('value').then(function(snapshot) {
        var stocks = snapshot.val();
        console.log("Stocklist", stocks);
    });

    // Get a stock
    var code = "00001";
    firebase.database().ref(code).once('value').then(function(snapshot) {
        var stock = snapshot.val();
        console.log("A stock", stock);
    });

    // Add a stock basic information by code
    var code = "00002";
    var stock = {
       code: '00001',
       receivedDate: '2016-04-23',
       description: 'World Book Day',
       donor: 'Library team',
       condition: 'Good',
       location: 'Library',
       category: 'LB',
       classificationNum: 'LB0001',
       sign: 'Checked',
       remarks: 'Borrowed to F.1 classes',
       photos: [
         {
           photoId: '1',
           name: '1',
           length: 35,
           width: 12,
           height: 13
         },
         {
           photoId: '2',
           name: '2',
           length: 35,
           width: 12,
           height: 13
         },
       ],
       scannedImages: [
         {
           photoId: '1',
           name: '1',
         },
       ],
       eventNames: [
         'World Book Day',
         '2016',
       ],
       eventDates: [
         '22/04/2016',
         '23/04/2016',
         '24/04/2016',
       ],
       eventLocations: [
         'Library',
       ],
       eventPeople: [
         'Ms Sin',
         'Ms Lam',
       ],
    };
    firebase.database().ref(code).set({
      code: stock.code,
      receivedDate: stock.receivedDate,
      description: stock.description,
      donor: stock.donor,
      condition: stock.condition,
      location: stock.location,
      category: stock.category,
      classificationNum: stock.classificationNum,
      sign: stock.sign,
      remarks: stock.remarks,
    });

    // Delete a stock by code
    // Hard delete
    // firebase.database().ref(code).remove();
    // Soft delete
    firebase.database().ref(code).update(
      deletetime: Date.Now,
    );
    // Update stock basic information by code
    // Add a ID photo for a stock
    // Delete a ID photo for a stock
    // Add a scanned image for a stock
    // Delete a scanned photo for a stock
    // Add an event detail
    // Update an event detail



    return (
      <div>
        Firebase Trial
      </div>
    );


  }
}

export default FirebaseTrial;
