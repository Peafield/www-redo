import { MongoClient } from "mongodb";

const globalWithMongo = global as typeof globalThis & {
	_mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient>;

const options = { appName: "Wendi's Worminghall Whimsies" };

const getClientPromise = () => {
	if (process.env.NODE_ENV === "development") {
		if (globalWithMongo._mongoClientPromise) {
			return globalWithMongo._mongoClientPromise;
		}
	}
	if (clientPromise) {
		return clientPromise;
	}

	const uri = process.env.MONGODB_URI;
	if (!uri) {
		throw new Error("Invalid/Missing environment variable: MONGODB_URI");
	}

	const client = new MongoClient(uri, options);
	const newPromise = client.connect();

	if (process.env.NODE_ENV === "development") {
		globalWithMongo._mongoClientPromise = newPromise;
	} else {
		clientPromise = newPromise;
	}

	return newPromise;
};

export default getClientPromise;
