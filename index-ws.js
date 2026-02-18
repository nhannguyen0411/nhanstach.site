const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", (_, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
