const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rooms = new Map();

app.get("/rooms/:id", (req, res) => {
  const { id : roomId } = req.params;
  const obj = rooms.has(roomId) ? {
    users: [...rooms.get(roomId).get("users").values()],
    messages: [...rooms.get(roomId).get("messages").values()],
  } : { users: [], messages: [] };
  res.json(obj);
});

io.on("connection", (socket) => {
  socket.on("ROOM:JOIN", ({ roomId, username }) => {
    socket.join(roomId);
    rooms.get(roomId).get("users").set(socket.id, username);
    const users = [...rooms.get(roomId).get("users").values()];
    socket.to(roomId).broadcast.emit("ROOM:SET_USERS", users); // everyone except me
  });

  socket.on("disconnect", () => {
    rooms.forEach((value, roomId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...value.get("users").values()];
        socket.to(roomId).broadcast.emit("ROOM:SET_USERS", users); // everyone except me
      }
    });
  });

  console.log("socket connected", socket.id);
});

app.post("/rooms", (req, res) => {
  const { roomId, username } = req.body;

  if (!rooms.has(roomId)) {
    rooms.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }

  res.send(rooms);
});

server.listen(9999, (err) => {
  if (err) {
    throw Error(err);
  } else {
    console.log("The server is running on port 9999");
  }
});
