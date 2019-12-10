
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("sales").truncate()
    .then(function () {
      // Inserts seed entries
      return knex("sales").insert([
        {
          carId: 1,
          price: 500
        }
      ]);
    });
};
