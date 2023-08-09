const {sequelize} = require('./sequelize');

module.exports = {
  seed: (req, res) => {
    const createDriverTableQuery = `
    CREATE TABLE drivers (
      driver_id SERIAL PRIMARY KEY,
      first_name VARCHAR(50)NOT NULL,
      last_name VARCHAR(50)NOT NULL,
      dob DATE NOT NULL,
      email VARCHAR(50)NOT NULL,
      driver_license VARCHAR(50)NOT NULL
    );
    `
    const createVehicleTableQuery = `
      CREATE TABLE vehicles (
        vehicle_id SERIAL PRIMARY KEY,
        driver_id INT REFERENCES drivers(driver_id) ON DELETE CASCADE,
        make VARCHAR(50) NOT NULL,
        model VARCHAR(50) NOT NULL,
        year INT NOT NULL,
          color VARCHAR(50) NOT NULL,
          isSelected BOOLEAN
    );
    `
    const insertDriversQuery = `
        INSERT INTO drivers(first_name, last_name, dob, email, driver_license)
        VALUES 
        ('Janatbek', 'Orozaly', '08/02/1986', 'janatbek@gmail.com', 'abc37'),
        ('Asel', 'Orozaly', '09/12/1984', 'asya8427@gmail.com', 'xyz'),
        ('John', 'Doe','03/30/1989', 'john@example.com', 'DL123456');
    `
    const insertVehicleQuery = `
      INSERT INTO vehicles (driver_id, make, model, year, color, isSelected)
      VALUES
      (1, 'Honda', 'Civic', 2018, 'Blue', false),
      (1, 'Lexus', 'GX 460', 2010, 'White', false),
      (2, 'Toyota', 'Camry', 2022, 'Green', false);
    `
    sequelize.query(
      `
      drop table drivers CASCADE;
      drop table vehicles;
      ${createDriverTableQuery}
      ${createVehicleTableQuery}
      ${insertDriversQuery}
      ${insertVehicleQuery}
    `)

    .then(() => {
      console.log('DB seeded!')
      res.sendStatus(200)
  }).catch(err => console.log('error seeding DB', err))
  }
}