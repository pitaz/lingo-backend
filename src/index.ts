import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "./config";
import { router } from "./routes/questionRoutes";
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', router)


app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
