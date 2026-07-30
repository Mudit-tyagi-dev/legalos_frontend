import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Gavel, Mail, Lock, User, Building } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firm, setFirm] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, addToast } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast("Please fill in all required fields", "error");
      return;
    }
    setUser({
      name: name,
      email: email,
      role: "Lawyer",
      firm: firm
    });
    addToast("Account created successfully! Welcome to LegalOS.", "success");
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
          Create a new trial account
        </h2>
        <p className="mt-2 text-xs text-secondaryText">
          Or{" "}
          <Link to="/auth/login" className="font-medium text-primaryBlue hover:underline">
            sign in to existing workspace
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-border sm:rounded-xl sm:px-10 shadow-subtle">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-primaryText">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-secondaryText/60" />
                </div>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-white border border-border rounded-lg text-xs placeholder:text-secondaryText/45 focus:outline-none focus:border-primaryBlue/70 focus:ring-1 focus:ring-primaryBlue/70"
                  placeholder="Justice Malhotra"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-primaryText">
                Work Email
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
              <label htmlFor="firm" className="block text-xs font-semibold text-primaryText">
                Law Firm / Chamber (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-4 w-4 text-secondaryText/60" />
                </div>
                <input
                  id="firm"
                  type="text"
                  value={firm}
                  onChange={(e) => setFirm(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-white border border-border rounded-lg text-xs placeholder:text-secondaryText/45 focus:outline-none focus:border-primaryBlue/70 focus:ring-1 focus:ring-primaryBlue/70"
                  placeholder="Supreme Chambers"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-primaryText">
                Password
              </label>
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
                id="terms"
                type="checkbox"
                required
                defaultChecked
                className="h-3.5 w-3.5 text-primaryBlue border-border rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-[11px] text-secondaryText">
                I agree to the LegalOS{" "}
                <a href="#" className="text-primaryBlue hover:underline">
                  Terms of Service
                </a>{" "}
                &{" "}
                <a href="#" className="text-primaryBlue hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white bg-primaryBlue hover:bg-primaryBlue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue transition-all cursor-pointer"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
