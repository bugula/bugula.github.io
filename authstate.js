import firebaseConfig from './fbconfig.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, getDocs, doc, getDoc, collection, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);


function initAuthState() {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = ''; // Clear the navbar

  // Check if user is signed in
  onAuthStateChanged(auth, (user) => {
    navbar.innerHTML = ''; // Clear the navbar

    if (user) {
      // User is signed in
      const uid = user.uid;

      // Create a link to the user's collections page
      const collectionsLink = document.createElement('a');
      collectionsLink.href = `collections.html?uid=${uid}`;
      collectionsLink.textContent = 'View Collections';
      navbar.appendChild(collectionsLink);

      // Create a sign out link
      const signOutLink = document.createElement('a');
      signOutLink.href = '#';
      signOutLink.textContent = 'Sign Out';
      signOutLink.addEventListener('click', handleSignOut);
      navbar.appendChild(signOutLink);
    } else {
      // User is not signed in
      const signInLink = document.createElement('a');
      signInLink.href = 'acct.html'; // Replace with the actual URL of the sign-in page
      signInLink.textContent = 'Sign In';
      signInLink.addEventListener('click', handleSignIn);
      navbar.appendChild(signInLink);
    }
  });
}

function handleSignOut() {
  signOut(auth)
    .then(() => {
      // Refresh the current page after sign-out
      window.location.reload();
    })
    .catch((error) => {
      console.log('Error signing out:', error);
    });
}

export { initAuthState };
