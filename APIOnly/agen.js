const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("../key.json")

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Get Agen / Find Rate 
const GetAgencies = async (req, res) => {
  try {
    const currencyFilter = req.params.currency;   //query // รับค่า currency จาก URL parameter
    const usersRef = db.collection("getCurrency");
    const response = await usersRef.get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    const result = responseArr.map(item => {
      return {
        agenName: item.agenName,
        //agency: item.agency[0],
        agency: item.agency.filter(a => a.cur === currencyFilter) // กรองข้อมูลจาก Firebase ด้วยค่า currency
      };
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

//Find Agen
const GetAgenciesByFiltering = async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency");
    const response = await usersRef.get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    const currencyFilter = req.query.agency;
    const result = responseArr.map(item => {
      return {
        agenName: item.agenName.filter(a => a.cur === currencyFilter),
        //agency: item.agency.filter(a => a.cur === currencyFilter)
      };
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }


};









//Create
const CreateAgencies = async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency");
    await usersRef.doc().set(req.body);
    res.send("Document successfully added!");
  } catch (error) {
    res.send(error);
  }
};

//Read All
const GetAgenciesAll = async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency");
    const response = await usersRef.get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
}

//Read :id -> document = id EX. 3Kg2qodXK5DxOZ9sPonV
const GetAgenciesByID = async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency").doc(req.params.id);
    const doc = await usersRef.get();
    if (!doc.exists) {
      res.send("No such document!");
    } else {
      res.send(doc.data());
    }
  } catch (error) {
    res.send(error);
  }
};

//Update :id
const UpdateAgencies = async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency").doc(req.params.id);
    await usersRef.update(req.body);
    res.send("Document successfully updated!");
  } catch (error) {
    res.send(error);
  }
};

//Delete :id
const DeleteAgencies = async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency").doc(req.params.id);
    await usersRef.delete();
    res.send("Document successfully deleted!");
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  CreateAgencies,
  UpdateAgencies,
  GetAgenciesAll,
  GetAgenciesByID,
  UpdateAgencies,
  DeleteAgencies,
  GetAgencies,
  GetAgenciesByFiltering
}


