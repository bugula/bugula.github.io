import firebaseConfig from './fbconfig.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, getDocs, doc, getDoc, collection, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);


// Get the UID from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');


// Function to create the list items
function createListItem(item) {
  const listItem = document.createElement('li');
  listItem.textContent = item.itemName;
  return listItem;
}

// Function to display the list
function displayList(listContainer, listItems) {
  if (listItems.length > 0) {
    listItems.forEach((item) => {
      const listItem = createListItem(item);
      listContainer.appendChild(listItem);
    });
  } else {
    const noItemsMessage = document.createElement('p');
    noItemsMessage.textContent = 'No items in this list. Go find something to add!';
    listContainer.appendChild(noItemsMessage);
  }
}


// Get a reference to the user's collections
const wishlistRef = collection(firestore, 'users', uid, 'wishlist');
const haveRef = collection(firestore, 'users', uid, 'have');
const tradeRef = collection(firestore, 'users', uid, 'trade');

// Get the documents from Firestore
const getWishlist = getDocs(wishlistRef);
const getHaveList = getDocs(haveRef);
const getTradeList = getDocs(tradeRef);

// Display the lists when the data is ready
Promise.all([getWishlist, getHaveList, getTradeList])
  .then(([wishlistSnapshot, haveSnapshot, tradeSnapshot]) => {
    const wishlistContainer = document.getElementById('wishlist');
    const haveContainer = document.getElementById('have');
    const tradeContainer = document.getElementById('trade');

    displayList(wishlistContainer, wishlistSnapshot.docs.map((doc) => doc.data()));
    displayList(haveContainer, haveSnapshot.docs.map((doc) => doc.data()));
    displayList(tradeContainer, tradeSnapshot.docs.map((doc) => doc.data()));
  })
  .catch((error) => {
    console.log('Error getting collections:', error);
  });

// Initialize the authentication state
initAuthState();
