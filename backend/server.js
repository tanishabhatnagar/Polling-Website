const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "intervuepoll.netlify.app", 
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for dev
    methods: ["GET", "POST"],
  },
});

// 🧠 Poll state
let currentQuestion = null;
let pollResults = {};
let pollHistory = []; // ✅ New array to store history

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  // Send current question immediately if available
  if (currentQuestion) {
    socket.emit("new-question", currentQuestion);
    socket.emit("poll-update", pollResults);
  }

  // 📤 Dynamic fetch of current data
  socket.on("get-current-data", () => {
    setTimeout(() => {
      if (currentQuestion) {
        socket.emit("new-question", currentQuestion);
        socket.emit("poll-update", pollResults);
      }
    }, 100); // delay to avoid race condition
  });

  
  // 📜 Provide poll history to client
  socket.on("get-poll-history", () => {
    socket.emit("poll-history", pollHistory);
  });

  // 📝 Teacher creates a new question
  socket.on("create-question", (questionData) => {
    currentQuestion = questionData;
    pollResults = {};

    // ✅ Store in history with timestamp
    pollHistory.push({
      ...questionData,
      createdAt: new Date().toISOString(),
    });

    io.emit("new-question", currentQuestion);
  });

  // 🗳️ Students submit answers
  socket.on("submit-answer", (answer) => {
    const trimmed = answer.trim();
    pollResults[trimmed] = (pollResults[trimmed] || 0) + 1;
    io.emit("poll-update", pollResults);
  });

  // ❌ On disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Backend server running on http://localhost:5000");
});
