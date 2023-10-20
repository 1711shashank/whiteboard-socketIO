const express = require('express');
const app = express();
const { createServer } = require('http');
const server = createServer(app);
const { Server } = require("socket.io");
const { getData, addData } = require('./src/controller/canvasController');


var cors = require("cors");
app.use(cors({ origin: '*', optionsSuccessStatus: 200, credentials: true }));
app.options("*", cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));


const io = new Server(server, { cors: { origin: process.env.BASE_URL } });

io.on('connection', (socket) => {
    // console.log(`a user connected: ${socket.id}`);

    socket.on("join room", (room) => {
        socket.join(room);
        console.log(`joined room: ${room}`);
    });

    socket.on("send_data", ({ room, canvasData }) => {
        console.log("sendData", room);
        io.to(room).emit("receive_data", canvasData);
    });
});


const port = 5000 || process.env.PORT;
server.listen(port, () => {
    console.log(`listening on ${port}`);
});


app.use(express.json());

app.get("/getData", getData);
app.post("/addData", addData);
