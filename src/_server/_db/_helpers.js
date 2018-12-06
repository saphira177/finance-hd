import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URL;

export const getConnection = () => MongoClient.connect(url);

export const getCollection = async (collectionName) => {
  const conn = await getConnection();
  const db = conn.db(process.env.MONGO_DB);
  return db.collection(collectionName);
};

export const find = async (collectionName, query) => {
  try {
    const collection = await getCollection(collectionName);
    const items = await collection.find(query).toArray();
    return items;
  } catch (errror) {
    return [];
  }
};

export const get = async (collectionName, id) => {
  const collection = await getCollection(collectionName);
  const item = await collection.findOne({ _id: id });
  return item;
};

export const insertOne = async (collectionName, data) => {
  try {
    const collection = await getCollection(collectionName);
    await collection.insertOne(data);
    return true;
  } catch (error) {
    return false;
  }
};

export const updateOne = async (collectionName, id, data) => {
  try {
    const collection = await getCollection(collectionName);
    await collection.updateOne(
      { _id: id },
      { $set: data },
    );
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export const deleteMany = async (collectionName, query) => {
  try {
    const collection = await getCollection(collectionName);
    await collection.deleteMany(query);
    return true;
  } catch (error) {
    return false;
  }
};
