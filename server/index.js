import express from 'express';
import env from './config/environment.js';
import { connectDB } from './config/db.js';
import approutes from "./routes/auth.route.js";
import path from "path";
import { ValidationError } from 'express-validation';

const app=express();
const port=env.port || 5000

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const __dirname = path.resolve();

app.get('/api/v1/getData',(req,res)=>{
    return res.status(200).json({
         success:false,
         message:'i am at work'
    })
})

app.use("/", approutes);

if(env.name === "production"){
  app.use(express.static(path.join(__dirname,"frontend","dist")));
  app.get("*", (req, res) => {
    return res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}else{
    app.all("/*", (req, res) => {
        return res.status(400).json({
          success: false,
          error: "no api found",
        });
      });
}

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  return res.status(500).json(err);
});


connectDB().then((connectedDb)=>{
    app.listen(port, () => {
        console.log(`app listening on port ${port}`);
        console.log(`connected to DB :: ${connectedDb.name}`);
      });
    })
    .catch((error) => console.log(`${error} did not connect`));