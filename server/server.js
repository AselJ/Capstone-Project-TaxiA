require('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = 4000;
const bodyParser = require('body-parser');
const {SERVER_PORT} = process.env
const { seed } = require('./seed.js');
const { registerDriver, getDrivers, deleteDriver } = require('./driver-controller.js');
const { getVehicles, addVehicle, updateVehicle, getVehiclesByDriverId, deleteVehicle } = require('./vehicles-controller.js');
const app = express()

//serve static files from the "public" folder
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// Endpoints
app.post('/seed', seed);
// Vehicles
// get all vehicles. 
app.get('/api/vehicles', getVehicles)
// add a vehicle
app.post('/api/vehicles',addVehicle)
// edit vehicle
app.put('/api/vehicles', updateVehicle)
// delete vehicle
app.delete('/api/vehicles/:id', deleteVehicle)

// Drivers
//create drivers
app.post('/api/drivers', registerDriver)
//get drivers
app.get('/api/drivers', getDrivers)
//get drivers
app.get('/api/drivers/:id/vehicles', getVehiclesByDriverId)
// delete drivers
app.delete('/api/drivers/:id', deleteDriver)

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
})


