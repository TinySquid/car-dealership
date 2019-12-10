Install knex and sqlite3
Database to be called car-dealer.db3, migration table to be called cars.
Knex init with migrations, seeds, config.
Point everything to ./data
  /migrations
  /seeds
  dbConfig.js

cars table must have
  carId - autoincrement PRIMARY KEY
  vin - VINs are always 17 characters so tbl.string('vin', 17)
  make - string
  model - string
  mileage - integer

  also to have (but information possibly unknown on INSERT, so .nullable())
  transmission - string nullable
  title - string nullable

STRETCH GOALS
Add some default cars to seeds file
Add UPDATE & DELETE to API

Add schema for a sales table
  saleId - autoincrement PRIMARY KEY
  price - integer
  sold - boolean
  soldAt - timestamp defaultTo knex.fn.now()
  carId - foreign key (1 to 1) mapping to carId in cars table

//from knex docs for carId in sales table
references — column.references(column)

Sets the "column" that the current column references as a foreign key. "column" can either be "." syntax, or just the column name followed up with a call to inTable to specify the table.

inTable — column.inTable(table)

Sets the "table" where the foreign key column is located after calling column.references.
