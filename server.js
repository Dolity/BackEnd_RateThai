import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, get, update, remove } from 'firebase/database';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import express from 'express';

var app2 = express()
var server = app2.listen(5100, console.log('Server is running on port 5100'));

// const fs = express.request('firebase-admin');
// const serviceAccount = ('./key.json');
// fs.initializeApp({
//     credential: fs.credential.cert(serviceAccount)
// });

const firebaseConfig = {
    databaseURL: "https://currencyexchangebc-default-rtdb.firebaseio.com/"
}
const firebaseConfig2 = {
    getDatabase: "./key.json"
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

//firestore crud
app2.get('/getfirestoreall',async(req,res) => {
    
    try {
        const userRef = db.collection("users");
        const response = await userRef.get();
        let responseArr = [];
        response.forEach(doc =>{
            responseArr.push(doc.data());
        })
        res.send(responseArr.data());
      } catch(error) {
        res.send(error);
      }
})


//Create
app2.post('/create', (req,res) => {
    var fullname = req.body.fullname;
    
    try {
        console.log('>>>> fullname', fullname);
        console.log('path', 'users/' + fullname); 
        set(ref(db, 'dbExtract'), {
            name: fullname,
            balance: 100,
            mill: new Date().getTime(),
            date: new Date() + ''
        })
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'good'
        })
        
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})


//get
app2.get('/get', (req, res) =>{

    try {
        get(ref(db, 'dbExtract'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//get by currency ....
app2.post('/getByCurrency', (req, res) =>{
    var fullname = req.params.fullname

    try {
        get(ref(db, 'dbExtract/' + fullname))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//update
app2.put('/updateCurrency', (req, res) =>{
    var fullname = req.body.fullname
    var balance = req.body.balance

    try {
        var update = {};
        update[`dbExtract/${fullname}/balance`] = balance;
        // update[`dbExtract/${fullname}/name`] = 'uplawlaw';

        update(ref(db), update)
        .then(() => {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'bad' + err2.message
            })
        })    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//delete
app2.delete('/deleteCurrency', (req, res) =>{
    var fullname = req.body.fullname

    try {
        remove(ref(db, "dbExtract/" + fullname))
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good',
            })
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'bad' + err2.message
            })
        })   
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})




//WebExtract_SPO
app2.get('/getSPO', (req, res) =>{

    try {
        get(ref(db, 'WebExtract_SPO'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//WebExtract_XNE
app2.get('/getXNE', (req, res) =>{

    try {
        get(ref(db, 'WebExtract_XNE'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//WebExtract_SRG
app2.get('/getSRG', (req, res) =>{

    try {
        get(ref(db, 'WebExtract_SRG'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//WebExtract_TWV
app2.get('/getTWV', (req, res) =>{

    try {
        get(ref(db, 'WebExtract_TWV'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})
//WebExtract_SME
app2.get('/getSME', (req, res) =>{

    try {
        get(ref(db, 'WebExtract_SME'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})
//WebExtract_VSU
app2.get('/getVSU', (req, res) =>{

    try {
        get(ref(db, 'WebExtract_VSU'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})
//WebExtract_VPC
app2.get('/getVPC', (req, res) =>{

    try {
        get(ref(db, 'WebExtract_VPC'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})
//WebExtract_K79
app2.get('/getK79', (req, res) =>{

    try {
        get(ref(db, 'WebExtract_K79'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if ( snapshot.exists() ){
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            } else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch(() => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err.message
            })
        })
    
    } catch (error) {
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})
