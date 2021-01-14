const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server,{cors: {origin: "*"}});


const rooms = new Map();

app.get("/rooms", (req, res) => {
    res.json({ hello: "world" })
});

io.on("connection", socket => {
    console.log("socket connected", socket.id);
})

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    } else {
        console.log("The server is running on port 9999")
    }
});