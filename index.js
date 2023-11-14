const express = require('express')
const app = express();
const firebase = require("firebase/app")
const port = 4000

//project config unique number
const firebaseConfig = {
    apiKey: "AIzaSyBa7dkLgQp0wjrWXEAncfAIByE0zc3j_34",
    authDomain: "exercise-five-idm.firebaseapp.com",
    projectId: "exercise-five-idm",
    storageBucket: "exercise-five-idm.appspot.com",
    messagingSenderId: "639521384602",
    appId: "1:639521384602:web:490988c98b151342bb5723"
  };

  firebase.initializeApp(firebaseConfig);

const indexRoute = require('./routes/index');
const singlePostRoute = require('./routes/singlePost');
const createPostRoute = require('./routes/createPost');

app.use("/", indexRoute);
app.use("/post", singlePostRoute);
app.use("/create", createPostRoute);
  
app.listen(port, () => {
    console.log(`Exercise five on port ${port}`)
  });