const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./keyNew.json")

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})



//Agen_SRO  dem100
app.get('/rate/SRO', async (req, res) => {
    try {
      const docRef = db.collection('getCurrency').doc('livd4moRsHCOU1xz4IIv');
      const doc = await docRef.get();
      if (!doc.exists) {
        res.status(404).send('Exchange rate not found');
        return;
      }
      exchangeRate = doc.data().
      amount = parseFloat(req.query.amount);
      fromCurrency = req.query.fromCurrency || 'USD'; // ใช้ค่าเริ่มต้นเป็น USD ถ้าไม่มีพารามิเตอร์นี้
      toCurrency = req.query.toCurrency || 'THB'; // ใช้ค่าเริ่มต้นเป็น THB ถ้าไม่มีพารามิเตอร์นี้
      convertedAmount = exchangeRate * amount;
      result = {
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: exchangeRate,
        amount: amount,
        convertedAmount: convertedAmount
      };
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Agen_SRG  dem100
app.get('/rate/SRG', async (req, res) => {
    try {
      const docRef = db.collection('getCurrency').doc('fyNEFxgMhFmTW4np5rIt');
      const doc = await docRef.get();
      if (!doc.exists) {
        res.status(404).send('Exchange rate not found');
        return;
      }
      const exchangeRate = doc.data().agency[0].sell;
      const amount = parseFloat(req.query.amount);
      const fromCurrency = req.query.fromCurrency || 'USD'; // ใช้ค่าเริ่มต้นเป็น USD ถ้าไม่มีพารามิเตอร์นี้
      const toCurrency = req.query.toCurrency || 'THB'; // ใช้ค่าเริ่มต้นเป็น THB ถ้าไม่มีพารามิเตอร์นี้
      const convertedAmount = exchangeRate * amount;
      const result = {
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: exchangeRate,
        amount: amount,
        convertedAmount: convertedAmount
      };
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Agen_VSU  dem100
app.get('/rate/VSU', async (req, res) => {
    try {
      const docRef = db.collection('getCurrency').doc('hWEQBsvWiI4Xhv9VtCRd');
      const doc = await docRef.get();
      if (!doc.exists) {
        res.status(404).send('Exchange rate not found');
        return;
      }
      const exchangeRate = doc.data().agency[0].sell;
      const amount = parseFloat(req.query.amount);
      const fromCurrency = req.query.fromCurrency || 'USD'; // ใช้ค่าเริ่มต้นเป็น USD ถ้าไม่มีพารามิเตอร์นี้
      const toCurrency = req.query.toCurrency || 'THB'; // ใช้ค่าเริ่มต้นเป็น THB ถ้าไม่มีพารามิเตอร์นี้
      const convertedAmount = exchangeRate * amount;
      const result = {
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: exchangeRate,
        amount: amount,
        convertedAmount: convertedAmount
      };
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//Agen_TWV  dem100
app.get('/rate/TWV', async (req, res) => {
    try {
      const docRef = db.collection('getCurrency').doc('Nwa1vxBscS9OtmlVWWEz');
      const doc = await docRef.get();
      if (!doc.exists) {
        res.status(404).send('Exchange rate not found');
        return;
      }
      const exchangeRate = doc.data().agency[2].sell;
      const amount = parseFloat(req.query.amount);
      const fromCurrency = req.query.fromCurrency || 'USD'; // ใช้ค่าเริ่มต้นเป็น USD ถ้าไม่มีพารามิเตอร์นี้
      const toCurrency = req.query.toCurrency || 'THB'; // ใช้ค่าเริ่มต้นเป็น THB ถ้าไม่มีพารามิเตอร์นี้
      const convertedAmount = exchangeRate * amount;
      const result = {
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: exchangeRate,
        amount: amount,
        convertedAmount: convertedAmount
      };
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  });





  


//Create
app.post('/create', async (req, res) => {
    try {
      const usersRef = db.collection("getCurrency");
      await usersRef.doc().set(req.body);
      res.send("Document successfully added!");
    } catch (error) {
      res.send(error);
    }
  });
  

//Read All
app.get('/read/all', async (req, res) => {
    try {
      const usersRef = db.collection("getCurrency");
      const response = await usersRef.get();
      let responseArr = [];
      response.forEach(doc => {
        responseArr.push(doc.data());
      });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  });

  //Read Agency All
app.get('/read/agenall', async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency");
    const response = await usersRef.get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    const result = responseArr.map(item => {
      return {
        agenName: item.agenName,
        //agency: item.agency
        //agency: item.agency.filter(a => a.cur === "USD")
      };
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

//Read :id -> document = id EX. 3Kg2qodXK5DxOZ9sPonV
app.get('/read/:id', async (req, res) => {
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
});

// Find agen name
app.get('/read/searchagen', async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency");
    
    if (req.query.agenName) {
      const response = await usersRef.where('agenName', '==', req.query.agenName).get();
      let responseArr = [];
      response.forEach(doc => {
        responseArr.push(doc.data());
      });
      const result = responseArr.map(item => {
        return {
          agenName: item.agenName,
        };
      });
      res.send(usersRef);
    }

    console.log.info(req.query.agenName);

    // else {
    //   const response = await usersRef.get();
    //   let responseArr = [];
    //   response.forEach(doc => {
    //     responseArr.push(doc.data());
    //   });
    //   const result = responseArr.map(item => {
    //     return {
    //       agenName: item.agenName,
    //     };
    //   });
    //   res.send(result);
    // }

  } catch (error) {
    res.send(error);
  }
});





//Update :id
app.put('/update/:id', async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency").doc(req.params.id);
    await usersRef.update(req.body);
    res.send("Document successfully updated!");
  } catch (error) {
    res.send(error);
  }
});

//Delete :id
app.delete('/delete/:id', async (req, res) => {
  try {
    const usersRef = db.collection("getCurrency").doc(req.params.id);
    await usersRef.delete();
    res.send("Document successfully deleted!");
  } catch (error) {
    res.send(error);
  }
});




