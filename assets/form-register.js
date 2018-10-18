
var config = {
    apiKey: "AIzaSyA2JyCv10sKesa6dWXQw604-1aPBrgXS70",
    authDomain: "user-d069a.firebaseapp.com",
    databaseURL: "https://user-d069a.firebaseio.com",
    projectId: "user-d069a",
    storageBucket: "",
    messagingSenderId: "66935017656"
};
firebase.initializeApp(config);

function SignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var rpassword = document.getElementById("rpassword").value;

    if (firebase.auth().currentUser) {
        // [START signout]alert('Please enter an email address.');
        firebase.auth().signOut();
    }

    if (password!=rpassword) {
        alert('Password Retype is not match.');
        return;
    }
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            // user signed in
            alert("SignUp Successful");
            alert("Login Successful");
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("rpassword").value = "";
            window.location.href = "form-basic.html";
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
    });

}