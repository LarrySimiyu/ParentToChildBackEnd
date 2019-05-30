const db = require("../dbConfig.js");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(id) {
  if (id) {
    return db("parent")
      .where({ id: Number(id) })
      .first();
  } else {
    return db("parent");
  }
}

function insert(parent) {
  return db("parent")
    .insert(parent)
    .then(ids => ({ id: ids[0] }));
}

function update(id, parent) {
  return db("parent")
    .where("id", Number(id))
    .update(parent);
}

function remove(id) {
  return db("parent")
    .where("id", Number(id))
    .del();
}
