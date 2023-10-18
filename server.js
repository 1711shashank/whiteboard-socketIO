const express = require('express');
const app = express();
const { createServer } = require('http');
const server = createServer(app);

const { Server } = require("socket.io");

const port = 5000;

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" }
});

io.on('connection', (socket) => {
  // console.log(`a user connected: ${socket.id}`);

  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`joined room: ${room}`);
  });

  socket.on("send_data", ({room, canvasData}) => {
    console.log("sendData",room);
    io.to(room).emit("receive_data", canvasData);
  });
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
