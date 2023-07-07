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


// Check for id parameter in URL
const urlParams = new URLSearchParams(window.location.search);
const releaseId = urlParams.get('id');

// Get a reference to the "items" collection
const itemsCollection = collection(firestore, 'items');

// Get the specific document by its ID
const docRef = doc(itemsCollection, releaseId);

// Function to handle adding/removing items from a list
function handleListButton(button, listName, releaseId, name) {
    const user = auth.currentUser;
    if (user) {
        const userListRef = doc(collection(firestore, 'users', user.uid, listName), releaseId);
        getDoc(userListRef)
            .then((listDocSnapshot) => {
                if (listDocSnapshot.exists()) {
                    // Item already in list, remove it
                    deleteDoc(userListRef)
                        .then(() => {
                            button.textContent = `Add to ${listName} List`;
                        })
                        .catch((error) => {
                            console.log(`Error removing item from ${listName} list:`, error);
                        });
                } else {
                    // Item not in list, add it
                    const listData = {
                        itemId: releaseId,
                        itemName: name,
                    };
                    setDoc(userListRef, listData)
                        .then(() => {
                            button.textContent = `Remove from ${listName} List`;
                        })
                        .catch((error) => {
                            console.log(`Error adding item to ${listName} list:`, error);
                        });
                }
            })
            .catch((error) => {
                console.log(`Error checking ${listName} list document:`, error);
            });
    } else {
        // User not signed in, show sign-in prompt or redirect to sign-in page
        // ...
    }
}

// Retrieve the document using the document reference
getDoc(docRef)
    .then((docSnapshot) => {
        if (docSnapshot.exists()) {
            const itemData = docSnapshot.data();

            console.log(itemData);

            // Access the desired fields
            const name = itemData.name;
            const type = itemData.type;
            const barrel = itemData.barrel;

            // Create a div element for the details
            const detailsDiv = document.createElement('div');

            // Set the text content of the details
            detailsDiv.innerHTML = `Name: ${name}, Type: ${type}, Barrel: ${barrel}`;

            // Append the details to the itemContainer
            document.getElementById('itemContainer').appendChild(detailsDiv);

            // Create a button element for each list
            const lists = ['wishlist', 'have', 'trade'];
            lists.forEach((listName) => {
                const button = document.createElement('button');
                button.textContent = `Add to ${listName} List`;
                document.getElementById('itemContainer').appendChild(button);

                // Add event listener to the button
                button.addEventListener('click', () => {
                    handleListButton(button, listName, releaseId, name);
                });
            });
        } else {
            console.log('No matching document');
        }
    });