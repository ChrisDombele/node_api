let realms = require('../data/realms.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');
const thing = require('../server');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(realms);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const realm = realms.find((p) => p.id === id);
    resolve(realm);
  });
}

function create(realm) {
  return new Promise((resolve, reject) => {
    const newData = { id: uuidv4(), ...realm };
    realms.push(newData);
    writeDataToFile('./data/realms.json', realms);
    resolve(newData);
  });
}

function update(id, realm) {
  return new Promise((resolve, reject) => {
    const index = realms.findIndex((p) => p.id === id);
    realms[index] = { id, ...realm };
    writeDataToFile('./data/realms.json', realms);
    resolve(realms[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    realms = realms.filter((p) => p.id !== id);
    writeDataToFile('./data/realms.json', realms);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
