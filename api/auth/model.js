const db = require("../../data/dbConfig");

function findById(user_id) {
  return db("users").where(user_id).first();
}

async function add(user) {
  const id = await db("users").insert(user);

  return findById(id);
}

function findBy(filter) {
  return db("users").where(filter);
}

module.exports = { findById, add, findBy };
