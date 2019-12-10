const router = require('express').Router();

const carsDB = require('./carsDB');

//* GET / - Returns all cars in inventory.
router.get("/", (req, res) => {
  carsDB.get()
    .then(cars => {
      if (cars.length > 0) {
        res.status(200).json(cars);
      } else {
        res.status(404).json({ message: "No cars found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error getting cars" });
    });
});

//* GET /:id - Returns car by ID.
router.get("/:id", (req, res) => {
  const id = req.params.id;
  carsDB.get(id)
    .then(car => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({ message: "car not found with specified id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error getting car" });
    });
});

//* POST / - Adds a new car.
router.post("/", validateCar, (req, res) => {
  const car = req.body;

  carsDB.insert(car)
    .then(ids => {
      carsDB.get(ids[0])
        .then(car => {
          //Send new car back to client
          res.status(201).json(car);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error getting car"
          });
        });
    })
    .catch(error => {
      console.log(error);
      if (error.errno === 19) {
        res.status(400).json({ message: "Car with specific VIN already exists in inventory!" });
      } else {
        res.status(500).json({ message: "Error adding a car" });
      }
    });
});

//MIDDLEWARE
function validateCar(req, res, next) {
  const { vin, make, model, year, mileage } = req.body;

  if (vin && make && model && year && mileage) {
    next();
  } else {
    res.status(400).json({ message: "Please provide a VIN, make, model, year, and mileage of car" });
  }
}

function validateCarId(req, res, next) {
  const id = req.params.id;

  carsDB.get(id)
    .then(car => {
      if (car) {
        next();
      } else {
        res.status(400).json({ message: "Invalid car ID" });
      }
    })
}

module.exports = router;