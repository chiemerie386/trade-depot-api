const admin = require('firebase-admin');
const serviceAccount = require("./firebase.json");




// productRef.get().then((querySnapshot) =>{
//     querySnapshot.forEach((document)=>{
//         console.log(document.data())
//     })
// })




const firestoreUpload = (data) =>{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      
      const db = admin.firestore();
      
      const productRef = db.collection("product")
    productRef.doc(data.id.toString()).set(data)

}

module.exports = firestoreUpload

