// Chat.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import './chat.css'

const socket = io("http://localhost:3000");

const Chat = ({ roomId, userName }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [wallpaper, setWallpaper] = useState("default-wallpaper.jpg");

  useEffect(() => {
    if (!roomId || !userName) {
      navigate("/"); // Redirect to Join if no room or user name
    }

    socket.emit("join", { roomId, userName });

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, userName, navigate]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", { roomId, userName, text: message });
      setMessage("");
    }
  };

  const handleWallpaperChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setWallpaper(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="chat-container" style={{ backgroundImage: `url(${wallpaper})` }}>
      <header className="chat-header">
        <h1>Room: {roomId}</h1>
        <div className="chat-actions">
          <label className="upload-wallpaper">
            📷
            <input type="file" accept="image/*" onChange={handleWallpaperChange} />
          </label>
          <button className="camera-btn">🎥</button>
        </div>
      </header>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === userName ? "self" : "other"}`}
          >
            <span className="message-user">{msg.user}</span>
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;