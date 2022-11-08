import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

export const collection: { Meals?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_CONN!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const mealsCollection: mongoDB.Collection = db.collection(
    process.env.COLLECTION_NAME!
  );

  collection.Meals = mealsCollection;
}
