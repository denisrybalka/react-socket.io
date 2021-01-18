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
    socket.on('ROOM:JOIN', ({roomId, username}) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, username);
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).broadcast.emit("ROOM:JOINED", users); // everyone except me
    });
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