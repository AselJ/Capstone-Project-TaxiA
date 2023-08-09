const { request } = require("express");
const { sequelize } = require('./sequelize.js');

module.exports = {
    getVehicles: (req, res) => {
        sequelize
        .query(`
            SELECT * FROM vehicles
        `)
        .then(dbResult => {
            res.status(200).send(dbResult[0])
        })
        .catch(err=> res.status(500).send(err))
    },

    addVehicle: (req, res) => {
        const { driverId, make, model, year, color, isSelected} = req.body;
        console.log(req.body)
        sequelize
        .query(`
            INSERT INTO vehicles(driver_id, make, model, year, color, isSelected)
            VALUES(${driverId}, '${make}', '${model}', ${year}, '${color}', ${isSelected}) returning *;
        `).then(dbResult => {
            res.status(200).send(dbResult[0])
        }).catch(err=> {
            console.error(err)
            res.status(500).send(err)
        });
    },

    updateVehicle: (request, response) => {
        const { vehicleId, driverId } = request.body;
        sequelize.query(
            `
            -- set everything to false
            update vehicles 
            set isSelected = false
            where driver_id = ${driverId};

            -- set specific vehicle to true
            update vehicles 
            set isSelected = true
            where driver_id = ${driverId} and vehicle_id = ${vehicleId};
            `
        ).then(function(dbResult){
            response.status(200).send(dbResult[0]);
        }).catch(function( error){
            // log to rollbar
            response.status(500).send(error);
        })
    },
    getVehiclesByDriverId: (request, response) => {
        const driverId = +request.params.id;
        console.log(driverId);
        sequelize
        .query(`
            select * from vehicles where driver_id = ${driverId};
        `)
        .then(dbResult => response.status(200).send(dbResult[0]))
        .catch(error => {
            // log to rollbar.
            response.status(500).send(error);
        });
    },
    deleteVehicle: (request, response) => {
        const vehicleId = request.params.id;
        sequelize.query(`
        DELETE FROM vehicles WHERE vehicle_id = ${vehicleId};
        `)
        .then(dbResult => response.status(200).send(dbResult[0]))
        .catch(error => {
            // log to rollbar.
            response.status(500).send(error);
        });
    }

}






