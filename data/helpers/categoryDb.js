const db = require("../dbConfig.js");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(id) {
  if (id) {
    return db("category")
      .where({ id: Number(id) })
      .first();
  } else {
    return db("category");
  }
}

function insert(category) {
  return db("category")
    .insert(category)
    .then(ids => ({ id: ids[0] }));
}

function update(id, category) {
  return db("category")
    .where("id", Number(id))
    .update(category);
}

function remove(id) {
  return db("category")
    .where("id", Number(id))
    .del();
}
