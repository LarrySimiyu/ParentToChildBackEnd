exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("parent")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("parent").insert([
        { categoryId: 1, name: "Nick" },
        { categoryId: 1, name: "Larry" },
        { categoryId: 1, name: "Joel" },
        { categoryId: 1, name: "Skyelar" },
        { categoryId: 1, name: "Xander" },
        { categoryId: 1, name: "Corey" }
      ]);
    });
};
