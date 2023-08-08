const express = require('express')
const cors = require('cors')
const port = 4000;
const bodyParser = require('body-parser');

const app = express()

//serve static files from the "public" folder
app.use(express.static("public"));
app.use(express.json());
const { getVehicles, addVehicle, updateVehicle } = require('./vehicles-controller.js')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Vehicles
// get all vehicles. 
app.get('/api/vehicles', getVehicles)
// add a vehicle
app.post('/api/vehicles',addVehicle)
// edit vehicle
app.put('/api/vehicles/:id', updateVehicle)
// Endpoints
// get main page. 


// Drivers

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})


