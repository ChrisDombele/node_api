const Data = require('../models/realmModel');
const { getPostData } = require('../utils');

// Gets all realms - GET /api/realms
async function getAllData(req, res) {
  try {
    const items = await Data.findAll();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(items));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

// Gets single realm - GET /api/realms/:id
async function getData(req, res, id) {
  try {
    const item = await Data.findById(id);

    if (!item) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: 'Data not found' }));
      res.end();
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(item));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

// Create a realm - POST /api/realms
async function createData(req, res) {
  try {
    const body = await getPostData(req);

    const { realm, description } = JSON.parse(body);

    const data = {
      realm,
      description,
    };

    const newData = await Data.create(data);

    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(newData));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

// Update a realm - PUT /api/realms/:id
async function updateData(req, res, id) {
  try {
    const item = await Data.findById(id);

    if (!item) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: 'Data not found' }));
      res.end();
    } else {
      const body = await getPostData(req);

      const { realm, description } = JSON.parse(body);

      const itemData = {
        realm: realm || item.realm,
        description: description || item.description,
      };

      const updProduct = await Data.update(id, itemData);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(updProduct));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

// Deletes single realm - DELETE /api/realms/:id
async function deleteData(req, res, id) {
  try {
    const item = await Data.findById(id);

    if (!item) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: 'Data not found' }));
      res.end();
    } else {
      await Data.remove(id);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: `Data ${id} removed` }));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
};
