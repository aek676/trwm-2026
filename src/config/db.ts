import { connect } from "mongoose";

export const connectDB = async () => {
	if (!Bun.env.MONGODB_URI) {
		throw new Error("MONGODB_URI is not set");
	}

	try {
		await connect(Bun.env.MONGODB_URI, {
			dbName: Bun.env.MONGODB_DB_NAME,
			autoIndex: true,
		});
		console.log("✅ MongoDB connected");
	} catch (error) {
		console.error("❌ MongoDB connection failed:", error);
		throw error;
	}
};
