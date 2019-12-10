const knex = require('../../data/dbConfig');

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(saleId) {
  if (saleId) {
    //? SELECT * FROM sales WHERE saleId = saleId
    return knex
      .select("*")
      .from("sales")
      .where({ saleId: saleId })
      .first();
  } else {
    //? SELECT * FROM sales
    return knex
      .select("*")
      .from("sales");
  }
}

//? INSERT INTO sales (carId, price, sold, soldAt) VALUES(...sale)
function insert(sale) {
  return knex("sales")
    .insert(sale, "saleId");
}

//? UPDATE sales SET {...changes} WHERE saleId = req.params.saleId
function update(saleId, changes) {
  return knex("sales")
    .where({ saleId })
    .update(changes);
}

//? DELETE FROM sales WHERE saleId = saleId
function remove(saleId) {
  return knex("sales")
    .where({ saleId: saleId })
    .del();
}