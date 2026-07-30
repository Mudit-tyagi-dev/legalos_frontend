import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, BrainCircuit, FileText, ArrowRight, Gavel, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const [demoQuery, setDemoQuery] = useState("");
  const navigate = useNavigate();

  const sampleQueries = [
    "Privacy judgement after Puttaswamy",
    "Basic Structure Doctrine"
  ];

  const handleDemoSearch = (e) => {
    e.preventDefault();
    if (!demoQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(demoQuery)}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col selection:bg-primaryBlue/15 select-none">
      {/* Top Navbar */}
      <header className="border-b border-[#E2E8F0] bg-white sticky top-0 z-50 px-6 lg:px-16 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <Gavel className="w-5 h-5 text-[#2563EB]" />
          <span>Legal<span className="text-[#2563EB]">OS</span></span>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/auth/login" className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors">
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            Start Free
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-16 text-center max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-xs font-semibold text-[#2563EB] bg-[#2563EB]/5 px-3 py-1.5 rounded-full mb-6 border border-[#2563EB]/15 tracking-wide uppercase">
          Introducing LegalOS 1.0
        </span>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#0F172A] leading-[1.1] mb-6">
          The AI-Powered Legal Operating System.
        </h1>
        <p className="text-base lg:text-lg text-[#64748B] max-w-2xl mb-10 leading-relaxed">
          Consolidate legal research, case analytics, bare acts, and document workflows into a single premium workspace built for modern attorneys.
        </p>

        {/* AI Search Demo Box */}
        <div className="w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-xl shadow-subtle p-4 mb-6">
          <form onSubmit={handleDemoSearch} className="flex gap-2 items-center">
            <Search className="w-4 h-4 text-[#64748B] shrink-0" />
            <input
              type="text"
              placeholder="Search judgements, bare acts, or type a natural language query..."
              value={demoQuery}
              onChange={(e) => setDemoQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-[#64748B]/50 h-10"
            />
            <button
              type="submit"
              className="bg-[#2F3037] hover:bg-[#0F172A] text-white text-xs font-semibold px-4 h-10 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Analyze</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="flex flex-wrap gap-2 mt-4 items-center justify-start border-t border-[#E2E8F0]/50 pt-3">
            <span className="text-[11px] text-[#64748B] font-medium mr-1">Try searching:</span>
            {sampleQueries.map((q) => (
              <button
                key={q}
                onClick={() => setDemoQuery(q)}
                className="text-[11px] text-[#2563EB] bg-[#2563EB]/5 border border-[#2563EB]/10 hover:border-[#2563EB]/30 px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-8 border-y border-[#E2E8F0]/80 bg-white select-none">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          <p className="text-[10px] font-semibold text-[#64748B]/50 uppercase tracking-widest mb-6">
            Trusted by the country's leading legal entities
          </p>
          <div className="flex flex-wrap gap-10 md:gap-16 justify-center items-center opacity-40 grayscale">
            <span className="font-semibold text-sm tracking-widest text-[#0F172A]">VERITAS ADVOCATES</span>
            <span className="font-semibold text-sm tracking-widest text-[#0F172A]">EQUITY LAW CHAMBERS</span>
            <span className="font-semibold text-sm tracking-widest text-[#0F172A]">INDUS LEGAL</span>
            <span className="font-semibold text-sm tracking-widest text-[#0F172A]">APEX CONSTITUTIONAL</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 lg:px-16 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Designed for the 8+ Hour Workday</h2>
          <p className="text-sm text-[#64748B]">Professional grade tools that increase precision and speed up to 10x.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#2563EB]/5 text-[#2563EB] flex items-center justify-center mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm mb-2">Semantic AI Search</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Find landmark rulings using simple natural language. We index judgements by legal sentiment, ratio, and judge.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#16A34A]/5 text-[#16A34A] flex items-center justify-center mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm mb-2">Perplexity-style Legal AI</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Query complex principles and read responses structured with clickable annotations, confidence metrics, and Bare Act clauses.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-6 rounded-xl hover:border-[#CBD5E1] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/5 text-[#F59E0B] flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm mb-2">RAG Workspace</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Upload PDF or DOCX case briefs. Extract key statutory provisions, construct case timelines, and cross-reference citations automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white border-t border-[#E2E8F0] py-20 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Transparent Enterprise Pricing</h2>
            <p className="text-sm text-[#64748B]">Cancel or adjust licenses at any time.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Solo Tier */}
            <div className="border border-[#E2E8F0] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Independent Practitioner</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">₹12,000</span>
                  <span className="text-xs text-[#64748B]">/ user / month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {["Unlimited AI Searches", "Bare Acts Table of Contents", "10 PDF Uploads per month", "Subtle Dark/Light Mode"].map((feat) => (
                    <li key={feat} className="flex gap-2 items-center text-xs text-[#64748B]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/auth/signup"
                className="mt-8 block text-center text-xs font-semibold bg-white border border-[#E2E8F0] hover:border-[#64748B] py-2.5 rounded-lg transition-all"
              >
                Choose Starter
              </Link>
            </div>

            {/* Firm Tier */}
            <div className="border-2 border-[#2563EB] rounded-xl p-6 flex flex-col justify-between bg-[#2563EB]/5 relative">
              <span className="absolute -top-3 left-4 text-[10px] font-bold text-white bg-[#2563EB] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Recommended
              </span>
              <div>
                <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">Enterprise & Firm</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">₹20,000</span>
                  <span className="text-xs text-[#64748B]">/ user / month</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {["Everything in Starter", "Unlimited Workspace Documents", "API Keys (Future Access)", "Collaborative Collections", "Dedicated Account Manager"].map((feat) => (
                    <li key={feat} className="flex gap-2 items-center text-xs text-[#0F172A] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/auth/signup"
                className="mt-8 block text-center text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] py-2.5 rounded-lg transition-all shadow-sm"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E2E8F0] py-6 px-6 lg:px-16 bg-white flex flex-col md:flex-row justify-between items-center text-xs text-[#64748B]">
        <span>© 2026 LegalOS Inc. All rights reserved.</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-[#0F172A]">Terms of Service</a>
          <a href="#" className="hover:text-[#0F172A]">Privacy Policy</a>
          <a href="#" className="hover:text-[#0F172A]">API Status</a>
        </div>
      </footer>
    </div>
  );
}
