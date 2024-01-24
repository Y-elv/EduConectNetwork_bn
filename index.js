import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routers/userRouters.js"

const app = express();

app.use(express.json());

app.use(cors())

dotenv.config();



const connectToMongodb = () => {
  mongoose
    .connect(process.env.MONG_URL, {
      
    })
    .then(() => {
      console.log(`connected to mongoDB`);
    })
    .catch((err) => {
      console.log(`can't connect to mongDB ${err}`);
    });
};

app.get("/", (req, res) => {
    res.send("welcome to EduConnect Network APIS...");
  });

  app.use("/api/edu/user", userRoute);



const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`server is running on port:${port}`);
  connectToMongodb();
});
