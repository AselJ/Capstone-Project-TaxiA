
const vehicleDatabase = require("./src/vehiclesData");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    getVehicles: (req, res) => {
        res.status(200).send(vehicleDatabase)
    },
    addVehicle: (req, res) => {
        const vehicle = req.body;
        vehicle.id = uuidv4();
        vehicleDatabase.push(vehicle);
        res.status(200).send(vehicleDatabase);
    },

    updateVehicle: (req, res) => {
        try {
            const id = req.params.id;
            const selectedVehicle = vehicleDatabase.find(vehicle => vehicle.isSelected == true);
            if (selectedVehicle) {
                selectedVehicle.isSelected = false;
            }
            const vehicle = vehicleDatabase.find(vehicle => vehicle.id === id);
            if (vehicle) {
                vehicle.isSelected = true;
            }
            res.status(200).send(vehicleDatabase);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
        
              
            
            
              






