const { sequelize } = require('./sequelize.js');

module.exports = {
    getDrivers: (req, res) => {
      sequelize
      .query(`
          SELECT * FROM drivers
      `)
      .then(dbRes => {
        res.status(200).send(dbRes[0])
      })
      .catch(err=> res.status(500).send(err))
    },
    registerDriver: (req, res) => {
        const { firstName, lastName, email, dob, driverLicense } = req.body;
        
        sequelize
        .query(`
            INSERT INTO drivers(first_name, last_name, email, dob, driver_license)
            VALUES('${firstName}', '${lastName}', '${email}', '${dob}', '${driverLicense}') returning *;
        `).then(dbResult => {
            res.status(200).send(dbResult[0])
        }).catch(err=> {
            console.error(err)
            res.status(500).send(err)
        });
    },
    deleteDriver: (request, response) => {
        const driverId = request.params.id;
        sequelize.query(`
        DELETE FROM drivers WHERE driver_id = ${driverId};
        `)
        .then(dbResult => response.status(200).send(dbResult[0]))
        .catch(error => {
            console.error(error)
            // log to rollbar.
            response.status(500).send(error);
        });
    }

}
