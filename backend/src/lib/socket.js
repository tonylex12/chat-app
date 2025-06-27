import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {};

import User from "../models/user.model.js";

io.on("connection", async (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    // Update lastSeen to null when user connects
    await User.findByIdAndUpdate(userId, { lastSeen: null });
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", async () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    // Update lastSeen to current time when user disconnects
    await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
