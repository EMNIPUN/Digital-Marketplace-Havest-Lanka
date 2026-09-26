import mongoose from "mongoose";
import dns from "node:dns";

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in the environment");
    }

    const dnsServers = process.env.MONGODB_DNS_SERVERS?.split(",")
      .map((server) => server.trim())
      .filter(Boolean);

    if (dnsServers?.length) {
      dns.setServers(dnsServers);
    }

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error.message);
  }
};

export default connectDB;
