// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBUtYWNPcYTEjskypuNPyduaSoIQ_lE3jQ",
    authDomain: "hackchat-8b94f.firebaseapp.com",
    databaseURL: "https://hackchat-8b94f-default-rtdb.firebaseio.com",
    projectId: "hackchat-8b94f",
    storageBucket: "hackchat-8b94f.appspot.com",
    messagingSenderId: "170971633202",
    appId: "1:170971633202:web:2d402c6892025852944e2b",
    measurementId: "G-T14H0HZCW2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  
  // initialize database
  const db = firebase.database();
  
  // get user's data
  const username = prompt("Please Tell Us Your Name use");
  
  // submit form
  // listen for submit event on the form and call the postChat function
  document.getElementById("message-form").addEventListener("submit", sendMessage);
  
  // send message to db
  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }
  
  // display the messages
  // reference the collection created earlier
  const fetchChat = db.ref("messages/");
  
  // check for new messages using the onChildAdded event listener
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });
  