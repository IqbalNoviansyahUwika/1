// Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "coffee-pos.firebaseapp.com",
    projectId: "coffee-pos",
    storageBucket: "coffee-pos.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Save transaction
function saveTransaction(transaction) {
    db.collection('transactions').add({
        ...transaction,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}