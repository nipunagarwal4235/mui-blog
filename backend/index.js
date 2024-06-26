import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./databse/connect.js";
import router from "./routes/users.js";

const app = express();

app.use(cors());

dotenv.config({ path: ".env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", router);

const PORT = process.env.PORT || 8080;
connectDB();

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});
