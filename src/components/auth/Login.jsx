import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gavel, Mail, Lock } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Login() {
  const [email, setEmail] = useState("partner@legalos.ai");
  const [password, setPassword] = useState("password");
  const { setUser, addToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Please fill in all fields", "error");
      return;
    }
    // Simulate login
    setUser({
      name: "Senior Partner",
      email: email,
      role: "Lawyer"
    });
    addToast("Logged in successfully", "success");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-semibold text-xl tracking-tight text-primaryText mb-6">
          <Gavel className="w-6 h-6 text-primaryBlue" />
          <span>Legal<span className="text-primaryBlue">OS</span></span>
        </Link>
        <h2 className="text-xl font-bold tracking-tight text-primaryText">
          Sign in to your account
        </h2>
        <p className="mt-2 text-xs text-secondaryText">
          Or{" "}
          <Link to="/auth/signup" className="font-medium text-primaryBlue hover:underline">
            create a new 14-day trial
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-border sm:rounded-xl sm:px-10 shadow-subtle">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-primaryText">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-secondaryText/60" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-white border border-border rounded-lg text-xs placeholder:text-secondaryText/45 focus:outline-none focus:border-primaryBlue/70 focus:ring-1 focus:ring-primaryBlue/70"
                  placeholder="name@firm.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-semibold text-primaryText">
                  Password
                </label>
                <Link to="/auth/forgot-password" className="text-[10px] font-semibold text-primaryBlue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-secondaryText/60" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-white border border-border rounded-lg text-xs placeholder:text-secondaryText/45 focus:outline-none focus:border-primaryBlue/70 focus:ring-1 focus:ring-primaryBlue/70"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                defaultChecked
                className="h-3.5 w-3.5 text-primaryBlue border-border rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-[11px] text-secondaryText">
                Remember this browser for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white bg-primaryBlue hover:bg-primaryBlue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue transition-all cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
