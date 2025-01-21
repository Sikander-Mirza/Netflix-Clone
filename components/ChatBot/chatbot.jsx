import React, { useState } from "react";
import "./chatbot.css"; 

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (userInput.trim()) {
      const userMessage = { sender: "user", text: userInput };
      setMessages((prev) => [...prev, userMessage]);
      setUserInput("");

      try {
        const response = await fetch("http://localhost:3000/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userInput }),
        });
        const responseData = await response.json();
        const botMessage = {
          sender: "bot",
          text: responseData.response || "Unexpected response",
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error connecting to server." },
        ]);
      }
    }
  };

  return (
    <div>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={() => setIsOpen((prev) => !prev)}>
        💬
      </div>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbox-message ${
                  message.sender === "user" ? "user-message" : "bot-message"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="chatbox-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message"
              className="chatbox-text-input"
            />
            <button onClick={handleSend} className="chatbox-send-button">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
