exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("child")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("child").insert([
        { parentId: 1, name: "Leslie" },
        { parentId: 2, name: "Crazy Mary" },
        { parentId: 2, name: "Lois the Great" },
        { parentId: 4, name: "Avatar" },
        { parentId: 3, name: "Jenny Mae" },
        { parentId: 1, name: "Little Suzie Lee" }
      ]);
    });
};
