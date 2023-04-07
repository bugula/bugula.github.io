// app.js
// Initialize Firebase
firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
  });
  
  // Get a reference to the Firebase Authentication service
  const auth = firebase.auth();
  
  // Add an event listener to the "Create Account" button
  document.getElementById("create-account").addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Account created successfully");
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      });
  });
  
  // Add an event listener to the "Log In" button
  document.getElementById("login").addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Logged in successfully");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  });
  