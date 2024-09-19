import express from "express";
import dotenv from "dotenv/config";
import viewEngine from "./viewEngine";
import date from "./date";
import getURL from "./getURL";

const app = express();
const port = process.env.PORT;
viewEngine(app);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/date", (req, res) => {
    res.send(date());
});

app.get("/geturl", (req, res) => {
    const path = getURL.getPath(req);
    const params = getURL.getParamsURL(req);
    res.send({ path, params });
});

app.get("/ejs", (req, res) => {
    res.render("test");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
