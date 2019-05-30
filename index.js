require("dotenv").config;
const express = require("express");
const knex = require("./data/dbConfig");
const middleware = require("./middleware/config");
const category = require("./routes/categoryRoute.js");
const parent = require("./routes/parentRoute.js");
const child = require("./routes/childRoute.js");

const server = express();

//middleware
middleware(server);

//routes
server.get("/", (req, res) => {
  res.status(200).json({ message: "server up" });
});

server.use("/category", category);
server.use("/parent", parent);
server.use("/child", child);

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
