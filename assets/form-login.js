var config = {
  apiKey: "AIzaSyA2JyCv10sKesa6dWXQw604-1aPBrgXS70",
  authDomain: "user-d069a.firebaseapp.com",
  databaseURL: "https://user-d069a.firebaseio.com",
  projectId: "user-d069a",
  storageBucket: "",
  messagingSenderId: "66935017656"
};
firebase.initializeApp(config);


function SignIn() {


    if (firebase.auth().currentUser) {
         // [START signout]alert('Please enter an email address.');
        firebase.auth().signOut();}
        // [END signout]
    // } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
            // user signed in
                alert("Login Successful");
                document.getElementById("email").value="";
                document.getElementById("password").value="";
                window.location.href="form-basic.html";
            })
            .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });


        // [END authwithemail]
    // }
    document.getElementById('quickstart-sign-in').disabled = true;
    
};

var currentUser = {};

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
         currentUser = user;

    } else {
        // No user is signed in.
    }
});

