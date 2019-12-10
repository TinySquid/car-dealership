const router = require('express').Router();

const carsRouter = require('./cars/carsRouter');
const salesRouter = require('./sales/salesRouter');

router.use("/cars", carsRouter);
router.use("/sales", salesRouter);

module.exports = router;