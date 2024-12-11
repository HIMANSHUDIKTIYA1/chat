import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "https://hd-chat.netlify.app/"; // Use CLIENT_ORIGIN from environment

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join", ({ roomId, userName }) => {
    socket.join(roomId);
    console.log(`${userName} joined room: ${roomId}`);
    io.to(roomId).emit("message", { user: "System", text: `${userName} has joined the room.` });
  });

  socket.on("message", ({ roomId, userName, text }) => {
    console.log(`Message from ${userName} in room ${roomId}: ${text}`);
    io.to(roomId).emit("message", { user: userName, text });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
