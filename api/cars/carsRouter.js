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

module.exports = router;