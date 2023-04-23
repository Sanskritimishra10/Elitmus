/* eslint-disable react/no-unescaped-entities */
import { login } from "@/actions/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const Router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Perform login logic based on email, password, and isAdmin
    if (isAdmin) {
    } else {
      login({ email, password }).then((res) => {
        if (res.status === 200) {
          alert("Login Successful");
          console.log("Res is :- ", res);
          localStorage.setItem("userdata", JSON.stringify(res.data.data));
          Router.push("/dashboard");
        } else {
          console.log("Res is :- ", res);
          alert(res.message);
        }
      });
    }
  };


  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundColor: "rgb(0,4,15,0.97)",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="border border-gray-400 p-2 w-full rounded-md"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="border border-gray-400 p-2 w-full rounded-md"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="admin"
              className="mr-2"
              checked={isAdmin}
              onChange={handleAdminChange}
            />
            <label htmlFor="admin" className="text-gray-700 font-bold">
              Login as admin
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-white"
            style={{
              background:
                "linear-gradient(157.81deg,#def9fa -43.27%,#bef3f5 -21.24%,#9dedf0 12.19%,#7de7eb 29.82%,#5ce1e6 51.94%,#33bbcf 90.29%)",
            }}
          >
            Login
          </button>
        </form>
        <p className="text-sm mt-4">
          Don`&apos;`t have an account?
          <Link href="signup" className="text-blue-500 font-bold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
