// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*", // Replace with "https://intervuepoll.netlify.app" in production
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*", // Replace with actual frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Poll state
let currentQuestion = null;
let pollResults = {};
let pollHistory = [];
let chatHistory = [];

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  // 🔁 Send current poll state
  if (currentQuestion) {
    socket.emit("new-question", currentQuestion);
    socket.emit("poll-update", pollResults);
  }

  // 🧠 Sync on load
  socket.on("get-current-data", () => {
    setTimeout(() => {
      if (currentQuestion) {
        socket.emit("new-question", currentQuestion);
        socket.emit("poll-update", pollResults);
      }
    }, 100);
  });

  // 📜 Provide poll history
  socket.on("get-poll-history", () => {
    socket.emit("poll-history", pollHistory);
  });

  // 📝 Teacher creates new question
  socket.on("create-question", (questionData) => {
    currentQuestion = questionData;
    pollResults = {};

    pollHistory.push({
      ...questionData,
      createdAt: new Date().toISOString(),
    });

    io.emit("new-question", currentQuestion);
  });

  // 🗳️ Student submits answer
  socket.on("submit-answer", (answer) => {
    const trimmed = answer.trim();
    pollResults[trimmed] = (pollResults[trimmed] || 0) + 1;
    io.emit("poll-update", pollResults);
  });

  // 💬 Chat message handling
  socket.on("chat-message", (message) => {
    chatHistory.push(message);
    io.emit("chat-message", message); // send to all clients
  });

  socket.on("get-chat-history", () => {
    socket.emit("chat-history", chatHistory);
  });

  // 🔌 Disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Backend server running on http://localhost:5000");
});
