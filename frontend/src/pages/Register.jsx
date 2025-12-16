import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-black/60 backdrop-blur-md p-6 rounded-xl border border-green-500"
      >
        <h2 className="text-2xl text-green-400 mb-5 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 rounded bg-black border border-gray-700 text-white"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-black border border-gray-700 text-white"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 p-2 rounded bg-black border border-gray-700 text-white"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
