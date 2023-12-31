import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`
    Running API AutoGoGo on port ${PORT},
    Url: http://localhost:${PORT} 
`));