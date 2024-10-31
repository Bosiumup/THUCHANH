import express from "express";
import dotenv from "dotenv";
import viewEngine from "./config/viewEngine";
import initRoutes from "./routes/routes";
import authRoutes from "./routes/auth";
import bodyParser from "body-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
viewEngine(app);
initRoutes(app);
authRoutes(app);
// Initialize client.
let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
});

// Initialize session storage.
app.use(
    session({
        store: redisStore,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        secret: "keyboard cat",
    })
);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
