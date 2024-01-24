import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors())




const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`server is running on port:${port}`);
  
});
