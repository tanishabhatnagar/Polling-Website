

import { io } from "socket.io-client";

const socket = io("https://intervuepoll.onrender.com", {
  transports: ["websocket"], 
});

export default socket;
