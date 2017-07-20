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

    // // Example of stock #00001
    // // var stock = {
    // //    code: '00001',
    // //    receivedDate: '2015-05-01',
    // //    description: '',
    // //    donor: 'Man Wai Ling Candy',
    // //    condition: '',
    // //    location: '',
    // //    category: 'SB',
    // //    classificationNum: 'SB00001',
    // //    sign: '',
    // //    remarks: '',
    // //    photos: [
    // //      {
    // //        photoId: '1',
    // //        name: 'SDC16430',
    // //        length: 15.9,
    // //        width: 2.8,
    // //        height: 0,
    // //      }
    // //    ],
    // //    scannedImages: [
    // //      {
    // //        photoId: '1',
    // //        name: 'Scanned image\photo001.jpg',
    // //      },
    // //    ],
    // //    eventNames: [
    // //      '德愛中學音樂節',
    // //    ],
    // //    eventDates: [
    // //      '1987',
    // //    ],
    // //    eventLocations: [
    // //    ],
    // //    eventPeople: [
    // //    ],
    // // };

    // // Get a reference to the database service
    // var database = firebase.database();

    // // Get full stock list
    // database.ref("/").once('value').then(function(snapshot) {
    //     var stocks = snapshot.val();
    //     console.log("Stocklist", stocks);
    // });

    // // Get a stock
    // var code = "00001";
    // firebase.database().ref(code).once('value').then(function(snapshot) {
    //     var stock = snapshot.val();
    //     console.log("A stock", stock);
    // });

    // // Create a stock with basic information by code
    // var stock = {
    //    code: '00002',
    //    receivedDate: '2015-05-01',
    //    description: '',
    //    donor: 'Man Wai Ling Candy',
    //    condition: '',
    //    location: '',
    //    category: 'SB',
    //    classificationNum: 'SB00001',
    //    sign: '',
    //    remarks: '',
    // };
    // firebase.database().ref(stock.code).set({
    //   code: stock.code,
    //   receivedDate: stock.receivedDate,
    //   description: stock.description,
    //   donor: stock.donor,
    //   condition: stock.condition,
    //   location: stock.location,
    //   category: stock.category,
    //   classificationNum: stock.classificationNum,
    //   sign: stock.sign,
    //   remarks: stock.remarks,
    // }).then(function() {
    //   console.log("Stock ", stock.code, " added");
    // });

    // // Delete a stock by code
    // // Hard delete
    // // firebase.database().ref(stock.code).remove().then(function() {
    // //   console.log("Stock ", stock.code, " hard deleted")
    // // });
    // Soft delete
    // var deleteTime;
    // firebase.database().ref(stock.code).update({
    //   deleteTime: Date.now(),
    // }).then(function() {
    //   console.log("Stock ", stock.code, " updated")
    // });

    // // Update stock basic information by code
    // stock = {
    //   ...stock,
    //   receivedDate: "2016-07-01",
    //   sign: "checked",
    // };
    // firebase.database().ref(stock.code).set(
    //   stock
    // ).then(function() {
    //   console.log("Stock ", stock.code, " updated");
    // });

    // // Create a ID photo for a stock
    // var photo = {
    //   photoId: Date.now(),
    //   name: 'SDC16430',
    //   length: '15.9',
    //   width: '2.8',
    //   height: '',
    // };
    //
    // firebase.database().ref(stock.code + "/photos/" + photo.photoId).set(
    //   photo: photo,
    // ).then(function () {
    //   console.log("Stock ", stock.code, " added a new ID photo #", photo.photoId);
    // });

    // // Delete a ID photo for a stock
    // firebase.database().ref(stock.code + "/photos/" + photo.photoId).remove()
    // .then(function () {
    //   console.log("Stock ", stock.code, " removed a ID photo #", photo.photoId);
    // });

    // // Add a scanned image for a stock
    // var photo = {
    //   photoId: Date.now(),
    //   name: 'Scanned image\\photo001.jpg',
    // };
    //
    // firebase.database().ref(stock.code + "/scannedImages/" + photo.photoId).set(
    //   photo: photo,
    // ).then(function () {
    //   console.log("Stock ", stock.code, " added a new scanned image #", photo.photoId);
    // });

    // // Delete a scanned photo for a stock
    // firebase.database().ref(stock.code + "/scannedImages/" + photo.photoId).remove()
    // .then(function () {
    //   console.log("Stock ", stock.code, " removed a scanned image #", photo.photoId);
    // });

    // Add an event detail
    // Update an event detail
    // var eventTag = {
    //   eventNames: ['World'],
    //   eventDates: ['1983'],
    //   eventLocations: [],
    //   eventPeople: [],
    // };
    // firebase.database().ref(stock.code).update(
    //   eventTag: eventTag,
    // ).then(function () {
    //   console.log("Stock ", stock.code, " added event tags");
    // });

    return (
      <div>
        Firebase Trial
      </div>
    );


  }
}

export default FirebaseTrial;
