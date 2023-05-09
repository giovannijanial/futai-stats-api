import "dotenv/config";
import express from "express";
import { route } from "./routes";

const app = express();

app.use(express.json());
app.use(route)

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log("server running at port ", PORT));

