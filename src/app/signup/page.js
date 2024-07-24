"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

export default function signupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[400px] h-[370px] p-5 rounded-lg bg-gray-400 mx-auto mt-10">
      <h1 className="text-center font-mono text-lg font-bold">{loading ? "Proccessing":"Signup"}</h1>
      <div className="flex flex-col justify-center gap-10 mt-5">
        <input
          type="text"
          placeholder="Enter Your Name"
          className="py-2 pl-2 rounded-md"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="py-2 pl-2 rounded-md"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="py-2 pl-2 rounded-md"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="submit"
          className="py-2 px-5 bg-green-400 font-bold rounded-md font-serif"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
