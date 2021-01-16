const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.json());

const rooms = new Map();

app.get("/rooms", (req, res) => {
    res.json({ hello: "world" })
});

io.on("connection", socket => {
    socket.on('ROOM:JOIN', (data) => {
        console.log(data);
    })
    console.log("socket connected", socket.id);
})

app.post("/rooms", (req, res) => {
    const { roomId, username } = req.body;

    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]))
    }

    res.send(rooms);
})

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    } else {
        console.log("The server is running on port 9999")
    }
});