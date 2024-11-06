const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    // Check if the collection exists
    const modelExists = await db.db.listCollections({ name: collectionName }).toArray();

    if (modelExists.length) {
      console.log(`Dropping collection: ${collectionName}`);
      await db.dropCollection(collectionName);
      console.log(`${collectionName} collection dropped successfully.`);
    } else {
      console.log(`${collectionName} collection does not exist.`);
    }
  } catch (err) {
    console.error(`Error dropping collection ${collectionName}:`, err);
    throw err;
  }
};
