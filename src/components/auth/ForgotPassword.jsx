import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Gavel, Mail } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { addToast } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      addToast("Please enter your email", "error");
      return;
    }
    addToast(`Password recovery link sent to ${email}`, "success");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-semibold text-xl tracking-tight text-primaryText mb-6">
          <Gavel className="w-6 h-6 text-primaryBlue" />
          <span>Legal<span className="text-primaryBlue">OS</span></span>
        </Link>
        <h2 className="text-xl font-bold tracking-tight text-primaryText">
          Reset your password
        </h2>
        <p className="mt-2 text-xs text-secondaryText">
          Enter your email address and we'll send you a recovery link.
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

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-xs font-semibold text-white bg-primaryBlue hover:bg-primaryBlue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue transition-all cursor-pointer"
            >
              Send recovery link
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs font-semibold">
            <Link to="/auth/login" className="text-primaryBlue hover:underline">
              Back to Login
            </Link>
            <Link to="/auth/signup" className="text-primaryBlue hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
