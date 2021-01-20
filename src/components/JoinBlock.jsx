import React, { useState } from "react";
import socket from "../socket";
import axios from "axios";

const JoinBlock = ({ onLogin }) => {
  const [input, setInput] = useState({
    roomId: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onEnter = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { roomId, username } = input;
    if (!roomId || !username) {
      setLoading(false);
      return alert("Неверные данные!");
    }

    const user = { roomId, username };
    await axios
      .post("http://localhost:9999/rooms", user)
      .then(() => onLogin(user))
      .catch((e) => {
        setLoading(false);
        alert(e.response.data.message);
      });
  };

  return (
    <form className="join-form" onSubmit={onEnter}>
      <input
        type="text"
        placeholder="ID Комнаты"
        name="roomId"
        value={input.roomId}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Имя"
        name="username"
        value={input.username}
        onChange={handleInputChange}
      />
      <button disabled={loading}>{loading ? "ВХОД..." : "ВОЙТИ"}</button>
    </form>
  );
};

export default JoinBlock;
