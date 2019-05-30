exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("category")
    .createTable("category", table => {
      table.increments("id");
      table.string("name", 250);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("category");
};
