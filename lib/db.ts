import { error } from "console";
import mongoose from "mongoose";

const MONGODB_URI =process.env.MONGODB_URI!;

if(!MONGODB_URI){
    throw new Error("plese defin uri in env");

}

// cached variable -- keep the connection same if connected ,,if no connection it will make new connection

let cached =global.mongoose

if(!cached){
  cached=  global.mongoose={conn:null,promise:null}
}


export async function connectedToDatabase(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        mongoose
        .connect(MONGODB_URI)
        .then(() => mongoose.connection)
    }
    return cached.conn
}