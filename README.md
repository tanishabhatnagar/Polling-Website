Live Polling System

A real-time interactive live polling system built using React, Tailwind CSS, Express, and Socket.io.

🚀 Project Features

✍️ Teacher

Create new polls with multiple options.

View live results of student submissions in real-time.

Can only ask a new question if:

No question is currently active, or

All students have submitted their answers.

👩‍🏫 Student

Enters name once per tab (unique to that tab using sessionStorage).

Can submit answers when a question is live.

Gets 60 seconds to submit an answer, after which results are auto-displayed.

Can view live poll results immediately after submitting.

🚀 Real-Time Capabilities

All poll updates and submissions are powered by Socket.io, ensuring real-time updates across all connected clients.

🧲 Technologies Used

Frontend: React, Tailwind CSS

Backend: Express.js, Socket.io

Others: sessionStorage, Local state management

🚧 Setup Instructions

1. Clone the repository

git clone https://github.com/your-username/live-polling-system.git
cd live-polling-system

2. Run the Backend Server

cd backend
npm install
node server.js

Runs on: http://localhost:3001

3. Run the Frontend App

cd frontend
npm install
npm start

Runs on: http://localhost:3000

Ensure the backend is running before starting the frontend to enable socket communication.