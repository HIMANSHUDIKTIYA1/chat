import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Join = ({ setRoomId, setUserName }) => {
  const [roomName, setRoomName] = useState("");
  const [localUserName, setLocalUserName] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (roomName && localUserName) {
      setRoomId(roomName);
      setUserName(localUserName);
      navigate("/chat");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="join-container">
      <div className="join-box">
        <h1 className="join-title">Welcome to the Chat Room</h1>
        <form onSubmit={handleJoin} className="join-form">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="join-input"
          />
          <input
            type="text"
            placeholder="Enter Your Name"
            value={localUserName}
            onChange={(e) => setLocalUserName(e.target.value)}
            className="join-input"
          />
          <button type="submit" className="join-button">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
