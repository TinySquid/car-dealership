const router = require('express').Router();

const salesDB = require('./salesDB');

//* GET / - Returns all sales in inventory.
router.get("/", (req, res) => {
  salesDB.get()
    .then(sales => {
      if (sales.length > 0) {
        res.status(200).json(sales);
      } else {
        res.status(404).json({ message: "No sales found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error getting sales" });
    });
});

//* GET /:id - Returns sale by ID.
router.get("/:id", (req, res) => {
  const id = req.params.id;
  salesDB.get(id)
    .then(sale => {
      if (sale) {
        res.status(200).json(sale);
      } else {
        res.status(404).json({ message: "sale not found with specified id" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error getting sale" });
    });
});

//* POST / - Adds a new sale.
router.post("/", validateSale, (req, res) => {
  const sale = req.body;

  salesDB.insert(sale)
    .then(ids => {
      salesDB.get(ids[0])
        .then(sale => {
          //Send new sale back to client
          res.status(201).json(sale);
        })
        .catch(error => {
          res.status(500).json({
            message: "Error getting sale"
          });
        });
    })
    .catch(error => {

      if (error.errno === 19) {
        res.status(400).json({ message: "sale with specific VIN already exists in inventory!" });
      } else {
        res.status(500).json({ message: "Error adding a sale" });
      }
    });
});

//* PUT /:id - Update a sale by ID.
router.put("/:id", validateSaleId, validateSale, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  salesDB.update(id, changes)
    .then(count => {
      if (count > 0) {
        salesDB.get(id)
          .then(sale => {
            //Send updated sale back to client
            res.status(201).json(sale);
          })
          .catch(error => {
            res.status(500).json({
              message: "Error getting sale"
            });
          });
      } else {
        res.status(404).json({ message: "sale not found" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error updating sale"
      });
    });
});

//* DELETE /:id - Delete a sale by id.
router.delete("/:id", validateSaleId, (req, res) => {
  const id = req.params.id;

  salesDB.remove(id)
    .then(count => {
      res.status(200).json({ message: `${count} record(s) removed` });
    })
    .catch(error => {
      res.status(500).json({
        message: "Error removing sale"
      });
    });
});

//MIDDLEWARE
function validateSale(req, res, next) {
  const { carId, price } = req.body;

  if (carId && price) {
    next();
  } else {
    res.status(400).json({ message: "Please car id & price of sale" });
  }
}

function validateSaleId(req, res, next) {
  const id = req.params.id;

  salesDB.get(id)
    .then(sale => {
      if (sale) {
        next();
      } else {
        res.status(400).json({ message: "Invalid sale ID" });
      }
    })
}

module.exports = router;