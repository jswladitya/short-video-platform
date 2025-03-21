// connecting to mongoDB
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("Please check the mongoDB URI connection string")
}


// creating a cashed connection
let cached = global.mongoose;
// globalThis does not know about mongoose so, lets make global know about mongoose type in types.d.ts
// in types.d.ts , im defining the type of mongoose

if(!cached) {
    cached = global.mongoose = {conn:null, promise:null}
}

export async function connectToDatabase() {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      const opts = {
        bufferCommands: true,
        maxPoolSize: 10,
      };
  
      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then(() => mongoose.connection);
    }
  
    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }
  
    return cached.conn;
  }