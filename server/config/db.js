import mongoose from "mongoose";
import env from "./environment.js";

export const connectDB=()=>{
  
  return new Promise(async(resolve,reject)=>{
          try {
            const connection= await mongoose.connect(env.db_url);
            if(connection){
              resolve(connection.connections[0])
            }else{
            throw "failed to find db connection"
            }
          } catch (error) {
            reject(error)
          }
  })
}
