var config = {
  apiKey: "AIzaSyA2JyCv10sKesa6dWXQw604-1aPBrgXS70",
  authDomain: "user-d069a.firebaseapp.com",
  databaseURL: "https://user-d069a.firebaseio.com",
  projectId: "user-d069a",
  storageBucket: "",
  messagingSenderId: "66935017656"
};
firebase.initializeApp(config);

var db = firebase.firestore();


var currentUser = {};

window.addEventListener('load',
  function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        currentUser = user;
      } else {
        // No user is signed in.
        alert("Error Please try again");
        return;
      }
    });
  }, false);

setTimeout(function() {
   db.collection("users")
    .doc(currentUser.email)
    .get()
    .then(function(doc) {
      if (doc.exists) {
      
        document.getElementById("fname").value = doc.data().fname;
        document.getElementById("lname").value = doc.data().lname;
        document.getElementById("child").value = doc.data().child;
        document.getElementById("adress").value = doc.data().adress;

        if (doc.data().pet == "ya") { document.getElementById("pet").checked = true} 
              else {document.getElementById("pet").checked = false };
        
        if (doc.data().gender == "male") {document.getElementById("mail").checked = true}
              else {document.getElementById("mail").checked = false} ;
        if (doc.data().gender == "fmale") {document.getElementById("fmail").checked = true}
              else {document.getElementById("fmail").checked = false};

        console.log("Document data:", doc.data());

      } else {
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
 }, 1000);

function save() {

    var fname = document.getElementById("fname").value.trim();
    var lname = document.getElementById("lname").value.trim();
    var child = document.getElementById("child").value;
    var adress = document.getElementById("adress").value.trim();

    if (document.getElementById("pet").checked){pet="ya"}else{pet="no"};
    if (document.getElementById("mail").checked) { gender = "male" };
    if (document.getElementById("fmail").checked) { gender = "fmale"};

    db.collection("users")
      .doc(currentUser.email)
      .set({
        fname: fname,
        lname: lname,
        child: child,
        adress: adress,
        pet: pet,
        gender: gender
      })
      .then(function() {
        console.log("Document written");
        alert("Data saved\nFor Exit Click Cancel");
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
        return false;
};

function cancel() {
  window.location.href = "index.html";
}



function prn() {


    var fname = document.getElementById("fname").value.trim();
    var lname = document.getElementById("lname").value.trim();
    var child = document.getElementById("child").value;
    var adress = document.getElementById("adress").value.trim();

    if (document.getElementById("pet").checked) { pet = "ya" } else { pet = "no" };
    if (document.getElementById("mail").checked) { gender = "male" };
    if (document.getElementById("fmail").checked) { gender = "fmale" };

    var p = ("<tr>" + 
            "<caption><h1>INFORMATION</h1></caption>" +"<td>---------------------------------------</td>"+
            "<td>" + "<h3>First Name:   </h3>" + fname + "</td>" +
            "<td>" + "<h3>Last Name:   </h3>" + lname + "</td>" +
            "<td>" + "<h3>Number of Child:   </h3>" + child + "</td>" +
            "<td>" + "<h3>Adress:   </h3>" + adress + "</td>" +
            "<td>" + "<h3>Have Pet:   </h3>" + pet + "</td>" +
            "<td>" + "<h3>Gender:   </h3>" + gender + "</td>" +
            "</tr>"); 

    var pr = document.getElementById("content");  

    pr.innerHTML= p;
    

    var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('#content')[0];
    specialElementHandlers = {
      '#bypassme': function (element, renderer) {
        return true
      }
    }

    margins = {
      top: 50,
      left: 60,
      width: 545
    };
    pdf.fromHTML(
      source // HTML string or DOM elem ref.
      , margins.left // x coord
      , margins.top // y coord
      , {
        'width': margins.width // max width of content on PDF
        , 'elementHandlers': specialElementHandlers
      },
      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF
        //          this allow the insertion of new lines after html
        pdf.save('FBS.pdf');
      }
    )




   
    function removeElement(element) {
      element && element.parentNode && element.parentNode.removeChild(element);
    }
    removeElement(pr);
    


  
  
  // window.print();
}


