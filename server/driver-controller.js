const driverDatabase = require("./src/driversData");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getUsers: (req, res) => {
        res.status(200).send(vehicleDatabase)
    },
    registerDriver: (req, res) => {
        const vehicle = req.body;
        vehicle.id = uuidv4();
        vehicleDatabase.push(vehicle);
        res.status(200).send(vehicleDatabase);
    },
  }