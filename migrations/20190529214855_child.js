exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists("child").createTable("child", table => {
    table.increments("id");

    table.string("name", 250);

    table
      .integer("parentId")
      .references("id")
      .inTable("parent");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("child");
};
