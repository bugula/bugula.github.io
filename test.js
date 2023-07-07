import firebaseConfig from './fbconfig.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, getDocs, doc, getDoc, collection, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

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

// Get a reference to the "items" collection
const itemsCollection = collection(firestore, 'items');

// Execute the query to retrieve all documents in the collection
getDocs(itemsCollection)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const itemData = doc.data();

            console.log(itemData);

            // Create a div element for the card
            const card = document.createElement('div');

            // Access and display the desired fields
            const itemID = doc.id;
            const name = itemData.name;
            const type = itemData.type;
            const barrel = itemData.barrel;

            // Set the text content of the card
            card.innerHTML = `Name: <a href="testdetails.html?id=${itemID}">${name}</a>, Type: ${type}, Barrel: ${barrel}`;

            // Create a button element for each list
            const lists = ['wishlist', 'have', 'trade'];
            lists.forEach((listName) => {
                const button = document.createElement('button');
                button.textContent = `Add to ${listName} List`;
                card.appendChild(button);

                // Add event listener to the button
                button.addEventListener('click', () => {
                    handleListButton(button, listName, itemID, name);
                });
            });

            // Append the card to the itemContainer
            document.getElementById('itemContainer').appendChild(card);
        });
    })
    .catch((error) => {
        console.log('Error getting items:', error);
    });
