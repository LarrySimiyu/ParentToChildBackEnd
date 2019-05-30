exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("parent")
    .createTable("parent", table => {
      table.increments("id");

      table.string("name", 250);

      table
        .integer("categoryId")
        .references("id")
        .inTable("category");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("parent");
};
