import { MongoClient, type Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Environment variable MONGODB_URI is required for MongoDB connection.");
}

const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | null;
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | null;
}

if (process.env.NODE_ENV === "development") {
  cachedClient = global._mongoClient ?? null;
  cachedPromise = global._mongoClientPromise ?? null;
}

if (!cachedClient) {
  const client = new MongoClient(uri);
  cachedClient = client;
  cachedPromise = client.connect();

  if (process.env.NODE_ENV === "development") {
    global._mongoClient = cachedClient;
    global._mongoClientPromise = cachedPromise;
  }
}

async function connectMongo(): Promise<Db> {
  if (!cachedPromise) {
    throw new Error("MongoDB client promise is not initialized.");
  }

  const client = await cachedPromise;
  return client.db("api-blog");
}

export { connectMongo };
