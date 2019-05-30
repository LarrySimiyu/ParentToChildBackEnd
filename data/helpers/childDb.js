const db = require("../dbConfig.js");

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(id) {
  if (id) {
    return db("child")
      .where({ id: Number(id) })
      .first();
  } else {
    return db("child");
  }
}

function insert(child) {
  return db("child")
    .insert(child)
    .then(ids => ({ id: ids[0] }));
}

function update(id, child) {
  return db("child")
    .where("id", Number(id))
    .update(child);
}

function remove(id) {
  return db("child")
    .where("id", Number(id))
    .del();
}
