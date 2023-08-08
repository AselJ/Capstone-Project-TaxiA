
const drivers = [{
  id: 1,
  email: 'janatbek@gmail.com',
  password: 'Ariana2016!',
  firstName: 'Janatbek',
  lastName: 'Orozaly',
  dob: '08/02/1986',
  licenseNumber: 'xyz',
  vehicles: [
    {
      make: 'Honda',
      model: 'Civic',
      year: 2018,
      color: 'Blue',
      isSelected: false
    }
  ]
},
{
  id: 2,
  email: 'asya8427@gmail.com',
  password: 'Ariana2016!',
  firstName: 'Asel',
  lastName: 'Orozaly',
  dob: '09/12/1984',
  licenseNumber: 'abc',
  vehicles: [
    {
      make: 'Lexus',
      model: 'GX 460',
      year: 2010,
      color: 'White',
      isSelected: false
    }
  ]
}
]
let baseUrl = 'http://localhost:4000'
// end of register feature

// vehicle features
const selectVehicle = id => {
  axios.put(`${baseUrl}/api/vehicles/${id}`).then(({data}) => {
    buildUI(data);  
  })
}
const getVehicles = () => {
  // call api to get vehicles. 
  axios.get(`${baseUrl}/api/vehicles`).then(({ data }) => {
      console.log(data);
      buildUI(data);
    });
}
const addVehicle = event => {
  event.preventDefault();
  const make = document.getElementById('make').value;
  const model = document.getElementById('model').value;
  const year = document.getElementById('year').value;
  const color = document.getElementById('color').value;
  const isSelected = false;

  const body = {
      make, model, year, color, isSelected
  }
  axios.post(`${baseUrl}/api/vehicles`, body).then(({data}) => {
      console.log(data);
      buildUI(data);
  });
  console.log('adding vehicle');
}
const vehicleForm = document.getElementById('vehicleForm');
vehicleForm.addEventListener('submit', addVehicle);
// end of vehicle features

// Helper Functions.

const buildUI = (driver) => {
  const driversListDiv = document.getElementById('drivers-list');
  driversListDiv.innerHTML = '';
  drivers.forEach(driver => {
    let driverCardElement = createDriversCard(driver);
    driversListDiv.appendChild(driverCardElement);
    const vehicleContainer = document.getElementById(driver.id);
    driver.vehicles.forEach(vehicle => {
        const li = createVehicleList(vehicle);
        vehicleContainer.appendChild(li);
    });
  })
}
const createDriversCard = (driver) => {
  const driverCard = document.createElement('div'); 
  driverCard.className = 'card';
  driverCard.innerHTML = 
  `
  <div class="card-header">
  <h5>${driver.firstName} ${driver.lastName}</h5>
  </div>
          <div class="card-body">
          <p>Email: <span>${driver.email}</span></p>
            <p>Date of Birth: <span>${driver.dob} </span></p>
            <p>Driver's License #: <span>${driver.licenseNumber}</span></p>
            <p>Vehicles: </p>
            <ul id="${driver.id}" class="vehicle-list"></ul>
            <p>Please select the car driver wants to use</p>
          </div>
  `
  return driverCard;
}
const createVehicleList = vehicle => {
  const selectVehicleText = vehicle.isSelected ? 'Selected' : 'Select Vehicle';
      const li = document.createElement('li');
      li.innerHTML = 
      `
        <div>
            <strong>${vehicle.make} ${vehicle.model}</strong>
            <span>${vehicle.year}</span>
            <span>${vehicle.color}</span>
            <button onclick="selectVehicle('${vehicle.id}')">${selectVehicleText}</button>
        </div>
        `
      return li;
}

buildUI();

// getVehicles();



