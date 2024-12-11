import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Join from "./pages/Join";
import Chat from "./pages/Chat";

const App = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Join setRoomId={setRoomId} setUserName={setUserName} />}
        />
        <Route
          path="/chat"
          element={<Chat roomId={roomId} userName={userName} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
