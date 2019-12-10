
exports.up = function (knex) {
  return knex.schema.createTable("sales", tbl => {
    //PRIMARY KEY
    tbl.increments("saleId");

    //REQUIRED 
    tbl.integer("price").notNullable();
    tbl.boolean("sold").defaultTo(false);
    tbl.timestamp("soldAt").defaultTo(null);
    tbl.integer("carId")
      .references("cars.carId")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sales");
};