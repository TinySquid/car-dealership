const knex = require('../../data/dbConfig');

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(carId) {
  if (carId) {
    //? SELECT * FROM cars WHERE carId = carId
    return knex
      .select("*")
      .from("cars")
      .where({ carId: carId })
      .first();
  } else {
    //? SELECT * FROM cars
    return knex
      .select("*")
      .from("cars");
  }
}

//? INSERT INTO cars (vin, make, model, year, mileage, [transmission, title]) VALUES(...car)
function insert(car) {
  return knex("cars")
    .insert(car, "carId");
}

//? UPDATE cars SET {...changes} WHERE carId = req.params.carId
function update(carId, changes) {
  return knex("cars")
    .where({ carId })
    .update(changes);
}

//? DELETE FROM cars WHERE carId = carId
function remove(carId) {
  return knex("cars")
    .where({ carId: carId })
    .del();
}