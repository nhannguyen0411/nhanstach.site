const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", (_, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);

server.listen(3001, () => {
  console.log("Server is running on port 3000");
});

/** Begin WebSocket */
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  const numClients = wss.clients.size;

  console.log("Clients connected: ", numClients);

  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send(`Welcome to my websocket server!`);
  }

  ws.on("close", () => {
    wss.broadcast(`Client disconnected: ${numClients}`);
    console.log("A client has disconnected");
  });
});

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};
