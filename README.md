# **📊 Live Polling System**

A **real-time interactive live polling system** built using **React**, **Tailwind CSS**, **Express**, and **Socket.io**.

---

## 🔗 **Live Demo**

👉 [https://intervuepoll.netlify.app/](https://intervuepoll.netlify.app/)

---

## 🚀 **Project Features**

### ✍️ **Teacher**

- **Create new polls** with multiple options.
- **View live results** of student submissions in real-time.
- Can only ask a new question if:
  - **No question is currently active**, or
  - **All students have submitted** their answers.

---

### 👩‍🏫 **Student**

- **Enters name once per tab** (unique per tab using `sessionStorage`).
- **Can submit answers** when a question is live.
- **Has 60 seconds** to submit an answer, after which:
  - **Answer is auto-submitted**, and
  - **Results are auto-displayed**.
- **Sees live poll results** immediately after submitting.

---

## 🚀 **Real-Time Capabilities**

All poll updates and submissions are powered by **Socket.io**, ensuring **real-time updates** across all connected clients.

---

## 🧲 **Technologies Used**

- **Frontend:** React, Tailwind CSS
- **Backend:** Express.js, Socket.io
- **Other Tools:** `sessionStorage`, Local state management

---

## 🛠️ **How to Run Locally**

### 🔧 Frontend

```bash
cd frontend
npm install
npm start

### 🔧 Backend
cd backend
npm install
node server.js
