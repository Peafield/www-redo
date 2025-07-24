import { MongoClient } from "mongodb";
import { env } from "@/env";

const uri = env.MONGODB_URI;
const options = { appName: "Wendi's Worminghall Whimsies" };

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (env.NODE_ENV === "development") {
	// In development mode, use a global variable to preserve the value
	// across module reloads caused by HMR (Hot Module Replacement).
	const globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(uri, options);
		globalWithMongo._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	// In production mode, it's best not to use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
