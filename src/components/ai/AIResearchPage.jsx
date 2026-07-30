import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, BookOpen, FileText, ArrowRight, ShieldAlert, BadgeCheck, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { mockAiAnswers } from "../../services/mockData";

export default function AIResearchPage() {
  const { addRecentSearch } = useApp();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome to LegalOS AI Research. Ask any constitutional query, cite case laws, or ask for legal advice based on bare acts. I will synthesize answer structures based only on verifiable citations.",
      sources: [],
      confidence: "100%"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSources, setActiveSources] = useState([]);
  const messageEndRef = useRef(null);

  const presets = [
    "Privacy judgement after Puttaswamy",
    "Basic Structure Doctrine"
  ];

  const handleSend = (text) => {
    if (!text.trim() || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInputValue("");
    setLoading(true);
    addRecentSearch(text);

    // Simulate AI synthesis latency
    setTimeout(() => {
      const queryKey = text.toLowerCase().trim();
      let responseMessage = {
        role: "assistant",
        content: `I could not find an exact landmark database match for "${text}". \n\nHowever, analyzing standard statutory provisions under the Constitution of India, legal remedies are typically sought under Article 32 (Supreme Court) or Article 226 (High Courts). In criminal matters, procedural compliance must be followed under CrPC/CrPC sections. Please consult specific Bare Acts or refine your prompt.`,
        sources: [
          { title: "Constitution of India, Article 32", citation: "Article 32", id: "constitution-of-india", type: "act" }
        ],
        confidence: "80%"
      };

      if (queryKey.includes("privacy") || queryKey.includes("puttaswamy")) {
        const data = mockAiAnswers["privacy judgement after puttaswamy"];
        responseMessage = {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
          confidence: data.confidence
        };
      } else if (queryKey.includes("basic structure") || queryKey.includes("kesavananda")) {
        const data = mockAiAnswers["basic structure doctrine"];
        responseMessage = {
          role: "assistant",
          content: data.answer,
          sources: data.sources,
          confidence: data.confidence
        };
      }

      setMessages((prev) => [...prev, responseMessage]);
      setActiveSources(responseMessage.sources);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="h-[calc(100vh-6.5rem)] flex overflow-hidden gap-4 select-none max-w-7xl mx-auto">
      {/* Left Column: Interactive Chat Terminal */}
      <section className="flex-1 border border-border bg-white rounded-xl flex flex-col overflow-hidden shadow-subtle">
        {/* Terminal Header */}
        <div className="px-4 py-3 border-b border-border bg-background/20 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primaryBlue" />
            <h2 className="text-xs font-bold text-primaryText uppercase tracking-wider">Legal Research Chat</h2>
          </div>
          <span className="text-[9px] text-secondaryText font-mono font-medium">Model: Legal-LLM-v2.1</span>
        </div>

        {/* Scrollable messages log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-3xl ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border text-xs font-bold ${
                  msg.role === "user"
                    ? "bg-primaryText text-white border-primaryText"
                    : "bg-primaryBlue/10 text-primaryBlue border-primaryBlue/20"
                }`}
              >
                {msg.role === "user" ? "ME" : "AI"}
              </div>

              <div
                className={`p-3.5 rounded-xl text-xs leading-relaxed space-y-2 font-medium ${
                  msg.role === "user"
                    ? "bg-primaryBlue text-white"
                    : "bg-background border border-border text-primaryText"
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>
                {msg.role === "assistant" && msg.sources.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/60">
                    <span className="text-[9px] text-secondaryText uppercase tracking-wider">Cites:</span>
                    <div className="flex flex-wrap gap-1">
                      {msg.sources.map((src, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[9px] bg-white border border-border/80 text-primaryText font-mono px-1.5 py-0.25 rounded"
                        >
                          {src.citation}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 mr-auto items-center animate-pulse">
              <div className="w-7 h-7 rounded-full bg-primaryBlue/5 flex items-center justify-center text-xs text-primaryBlue border border-border">
                AI
              </div>
              <div className="bg-background border border-border p-3 rounded-xl space-y-2 w-64">
                <div className="h-3 bg-border rounded w-5/6"></div>
                <div className="h-3 bg-border rounded w-2/3"></div>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>

        {/* Quick presets & Text Input Form */}
        <div className="p-4 border-t border-border bg-background/10 shrink-0 space-y-3">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] text-secondaryText font-semibold">Suggested Prompts:</span>
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="text-[10px] text-secondaryText hover:text-primaryText hover:bg-white hover:border-secondaryText/30 border border-border/80 px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium"
                >
                  "{p}"
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex gap-2 bg-white border border-border rounded-xl p-2 items-center"
          >
            <input
              type="text"
              placeholder="Ask a question or enter key legal principle..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
              className="flex-1 bg-transparent border-0 outline-none text-xs text-primaryText placeholder:text-secondaryText/45 px-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 bg-primaryText hover:bg-primaryText/90 disabled:bg-secondaryText/30 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {/* Right Column: Source authority indices */}
      <aside className="w-80 border border-border bg-white rounded-xl flex flex-col overflow-hidden shrink-0 shadow-subtle">
        <div className="px-4 py-3 border-b border-border bg-background/20">
          <h2 className="text-xs font-bold text-primaryText uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primaryBlue" />
            <span>Active Sources Deck</span>
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
          {activeSources.length === 0 ? (
            <div className="text-center py-10 space-y-3 text-secondaryText">
              <ShieldAlert className="w-7 h-7 mx-auto text-secondaryText/40" />
              <p className="text-[11px] font-medium leading-relaxed max-w-[200px] mx-auto">
                No active sources. Submit a query to index citations, reference acts, and calculate confidence.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Confidence Meter */}
              <div className="p-3 border border-border rounded-lg bg-green/5 flex justify-between items-center text-xs">
                <span className="font-semibold text-primaryText">AI Validation Rating</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-green">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  98% Verified
                </span>
              </div>

              {activeSources.map((src, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-border rounded-lg bg-background/10 space-y-2 hover:border-secondaryText/35 transition-all"
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                      src.type === "judgment" ? "text-primaryBlue bg-primaryBlue/5" : "text-green bg-green/5"
                    }`}>
                      {src.type}
                    </span>
                    <span className="font-mono text-secondaryText">{src.citation}</span>
                  </div>
                  <h3 className="text-xs font-bold text-primaryText line-clamp-2 leading-snug">
                    {src.title}
                  </h3>
                  <a
                    href={src.type === "judgment" ? `/judgment/${src.id}` : `/acts`}
                    className="text-[10px] text-primaryBlue font-semibold hover:underline flex items-center gap-0.5"
                  >
                    <span>Inspect Document</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
