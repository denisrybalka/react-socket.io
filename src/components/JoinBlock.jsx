import React, { useState } from 'react'
import socket from '../socket'
import axios from 'axios'

const JoinBlock = ({ onLogin }) => {

    const [input, setInput] = useState({
        roomId: "",
        username: "",
    })

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            }
        })
    }

    const onEnter = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { roomId, username } = input;
        if (!roomId || !username) {
            return alert("Неверные данные!");
        }

        const user = { roomId, username};
        await axios.post("/rooms", user);
        onLogin(user);
    }

    return (
        <form onSubmit={onEnter}>
            <input
                type="text"
                placeholder="Room ID"
                name="roomId"
                value={input.roomId}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Username"
                name="username"
                value={input.username}
                onChange={handleInputChange}
            />
            <button disabled={loading}>{ loading ? "ВХОД..." : "ВОЙТИ"}</button>
        </form>
    )
}

export default JoinBlock;
