let baseUrl = 'http://localhost:4000';
// Start of Register Feature
// Add event to the form
const addDriver = event => {
  event.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value;
  const driverLicense = document.getElementById('driverLicense').value;
  // Build drivers body to post
  const driverBody = {
      firstName, lastName, dob, email, driverLicense
  }
  // Register Driver and get driver's driver_id so I can save vehicle
  axios.post(`${baseUrl}/api/drivers`, driverBody)
  .then(result => {
    // retrieve driver data from result. 
    const driver = result.data[0];
    const vehicle = buildVehicleBody();
    // get driver's id from driver result and assign it to vehicle
    vehicle.driverId = driver.driver_id;

    axios.post(`${baseUrl}/api/vehicles`, vehicle).then(result => {
        console.log(result.data[0]);
        getApplicationData();
    });
  });
  
}
const registerDriverForm = document.getElementById('register-driver');
const vehicleForm = document.getElementById('vehicle-form');

function buildVehicleBody() {
  const make = document.getElementById('vehicle-make').value;
  const model = document.getElementById('vehicle-model').value;
  const year = document.getElementById('vehicle-year').value;
  const color = document.getElementById('vehicle-color').value;
  const isSelected = false;

  const  vehicleBody = {
      make, model, year, color, isSelected
  }
  return vehicleBody;
}

// Vehicle features
const selectVehicle = (driverId, vehicleId) => {
	const body = {
		driverId: driverId,
		vehicleId: vehicleId
	}
  axios.put(`${baseUrl}/api/vehicles`, body)
    .then(() => {
      rerenderDriversVehicle(driverId);
    })
}

const addVehicle = event => {
  event.preventDefault();
  const make = document.getElementById('make').value;
  const model = document.getElementById('model').value;
  const year = document.getElementById('year').value;
  const color = document.getElementById('color').value;
  const isSelected = false;
  const driverId = document.getElementById('driverId').value;
  const body = {
      driverId, make, model, year, color, isSelected
  }
  axios.post(`${baseUrl}/api/vehicles`, body).then(({data}) => {
    rerenderDriversVehicle(driverId);
  });
}

const rerenderDriversVehicle = driverId => {
  axios.get(`${baseUrl}/api/drivers/${driverId}/vehicles`).then(result => {
    const vehicleContainer = document.getElementById(driverId);
    vehicleContainer.innerHTML = '';
    result.data.forEach(vehicle => {
      const li = createVehicleList(vehicle);
      vehicleContainer.appendChild(li);
    });
  })
}
// Helper Functions.
const buildUI = async (drivers) => {
  const driversIdSelectElement = document.getElementById('driverId');
  driversIdSelectElement.innerHTML = '<option value="">Select a Driver</option>';
  const driversListDiv = document.getElementById('drivers-list');
  driversListDiv.innerHTML = '';
  drivers.forEach(driver => {
    let optionElement = document.createElement('option');
    optionElement.value = driver.driver_id;
    optionElement.innerText = `${driver.first_name} ${driver.last_name}`;
    driversIdSelectElement.appendChild(optionElement);
    let driverCardElement = createDriversCard(driver);
    driversListDiv.appendChild(driverCardElement);
    const vehicleContainer = document.getElementById(driver.driver_id);

    if(driver.vehicles) {
      driver.vehicles.forEach(vehicle => {
        const li = createVehicleList(vehicle);
        vehicleContainer.appendChild(li);
      });
    }
  })
}

const createDriversCard = (driver) => {
  const driverCard = document.createElement('section'); 
  driverCard.className = 'card';
  driverCard.innerHTML = 
  `
  <div class="card-header">
    <h5>${driver.first_name} ${driver.last_name}</h5>
    <button onClick="deleteDriver(${driver.driver_id})" class="danger-btn">Delete Driver</button>
  </div>
  <div class="card-body">
    <p>Email: <span>${driver.email}</span></p>
    <p>Date of Birth: <span>${driver.dob} </span></p>
    <p>Driver's License #: <span>${driver.driver_license}</span></p>
    <p>Vehicles: </p>
    <ul id="${driver.driver_id}" class="vehicle-list"></ul>
    <p class="select-vehicle-message">Please select the car driver wants to use or add one in <strong>Add a Vehicle for Driver</strong> form
    </p>
  </div>
  `
  return driverCard;
}
// Driver features
const deleteDriver = (driverId) => {

  axios.delete(`${baseUrl}/api/drivers/${driverId}`).then(() => {
    getApplicationData();
  })
}

const createVehicleList = vehicle => {
  const selectVehicleText = vehicle.isselected ? 'Selected' : 'Select Vehicle';
  const li = document.createElement('li');
  li.innerHTML = 
      `
        <div>
            <p>
              <strong>${vehicle.make} ${vehicle.model}</strong>
              <span>${vehicle.year}</span>
              <span>${vehicle.color}</span>
            </p>
            <div>
              <button onclick="selectVehicle(${vehicle.driver_id}, ${vehicle.vehicle_id})" class="primary-btn">${selectVehicleText}</button>
              <button onclick="deleteVehicle(${vehicle.driver_id}, ${vehicle.vehicle_id})" class="danger-btn">Delete Vehicle</button>
            </div>
        </div>
        `
      return li;
}

const deleteVehicle = (driverId, vehicleId) => {
  axios.delete(`${baseUrl}/api/vehicles/${vehicleId}`).then(() => {
    axios.get(`${baseUrl}/api/drivers/${driverId}/vehicles`).then(result => {
      const vehicleContainer = document.getElementById(driverId);
      vehicleContainer.innerHTML = '';
      result.data.forEach(vehicle => {
        const li = createVehicleList(vehicle);
        vehicleContainer.appendChild(li);
      });
    })
  })
}

const getApplicationData = async() => {
  // get all drivers and vehicles data. 
  const drivers = await axios.get(`${baseUrl}/api/drivers`);
  const vehicles = await axios.get(`${baseUrl}/api/vehicles`);
  driversIdList = drivers.data.map(driver => driver.driver_id);
  // loop each driver and find vehicles for that driver
  for(let i = 0; i < drivers.data.length; i++) {
    const driver = drivers.data[i];
    driver.vehicles = vehicles.data.filter(vehicle => vehicle.driver_id === driver.driver_id);
  }
  // build UI passing drivers data.
  buildUI(drivers.data);
}

registerDriverForm.addEventListener('submit', addDriver);
vehicleForm.addEventListener('submit', addVehicle);
getApplicationData();



