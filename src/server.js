import express from "express";
import dotenv from "dotenv";
import viewEngine from "./config/viewEngine";
import initRoutes from "./routes/routes";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
viewEngine(app);
initRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
