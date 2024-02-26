import mongoose, { Mongoose } from "mongoose";


const MONGO_URL = process.env.MONGO_URL;

interface MongooseConn {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
}

let cashedConn: MongooseConn = (global as any).mongoose;

if (!cashedConn) {
    cashedConn = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase = async () => {
    if (!MONGO_URL) throw new Error('Missing mongo url!');
    if (cashedConn.conn) return cashedConn.conn;

    cashedConn.promise = cashedConn.promise || mongoose.connect(MONGO_URL,
        { dbName: 'retouchlabai', bufferCommands: false });
    cashedConn.conn = await cashedConn.promise;
    return cashedConn.conn;
}