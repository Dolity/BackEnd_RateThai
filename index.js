const express = require("express"); 
const app = express();  

const port = 5100;     

// const cors = require("cors");
// var corsOptions = {
//   origin: 'http://example.com',
//   optinoSuccess: 200,
// }

const dbFirestore = require('./APIOnly/agen');

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


//CRUD_FireStore
app.post('/agencies', dbFirestore.CreateAgencies);
app.get('/agencies', dbFirestore.GetAgenciesAll);
app.get('/agencies/:id', dbFirestore.GetAgenciesByID);  // 3Kg2qodXK5DxOZ9sPonV
app.put('/agencies/:id', dbFirestore.UpdateAgencies);
app.delete('/agencies/:id', dbFirestore.DeleteAgencies);

//Pull data in FireStore for API Cal & Reservation
app.get('/getagencies/:currency', dbFirestore.GetAgencies);
app.get('/agencies', dbFirestore.GetAgenciesByFiltering);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});


