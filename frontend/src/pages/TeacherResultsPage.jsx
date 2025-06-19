import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket";
import ChatWidget from "./ChatWidget";

export default function TeacherResultsPage() {
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [results, setResults] = useState({});

  useEffect(() => {
    socket.emit("get-current-data");

    socket.on("new-question", (data) => {
      setPoll(data);
    });

    socket.on("poll-update", (data) => {
      setResults(data);
    });

    return () => {
      socket.off("new-question");
      socket.off("poll-update");
    };
  }, []);

  const totalVotes = Object.values(results).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-dark p-6">
      {poll ? (
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Live Results
          </h2>
          <h3 className="text-xl font-medium mb-4">{poll.question}</h3>
          <ul className="space-y-2">
            {poll.options.map((opt, i) => {
              const count = results?.[opt] || 0;
              const percent = totalVotes ? ((count / totalVotes) * 100).toFixed(1) : 0;
              const isCorrect = opt === poll.correctAnswer;

              const bgColor = isCorrect
                ? "bg-green-100 border-green-500"
                : "bg-gray-100 border-gray-300";

              return (
                <li
                  key={i}
                  className={`flex justify-between items-center px-4 py-2 border rounded ${bgColor}`}
                >
                  <span>{opt}</span>
                  <span>{percent}% ({count} votes)</span>
                </li>

                
              );
            })}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Green = correct answer
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/teacher/create-question")}
              className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-xl font-semibold"
            >
              Ask New Question
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-grayish text-white px-6 py-3 rounded-xl font-semibold"
            >
              Back to Home
            </button>


            
             <ChatWidget name="Teacher" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 bg-white shadow-lg rounded-lg max-w-md mx-auto">
          <svg
            className="animate-spin h-10 w-10 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold text-primary">
            Waiting for poll data...
          </h2>
          <p className="text-grayish">
            This page will automatically update once a poll starts.
          </p>
          
        </div>

        
      )}
    </div>
  );
}
