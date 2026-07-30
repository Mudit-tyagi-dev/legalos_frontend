import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Pin,
  BookOpen,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  Bookmark,
  Folder,
  Sliders,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { mockDashboardData } from "../../services/mockData";

export default function Dashboard() {
  const { recentSearches, documents, bookmarks, addRecentSearch } = useApp();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    addRecentSearch(query);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Good morning";
    if (hr < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8 select-none max-w-7xl mx-auto">
      {/* Header Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-primaryText">
            {getGreeting()}, Counselor
          </h1>
          <p className="text-xs text-secondaryText mt-0.5">
            Chamber status: Active • 3 research collections updated today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/ai-research"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primaryBlue text-white hover:bg-primaryBlue/90 rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Draft Research</span>
          </Link>
          <Link
            to="/workspace"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border hover:border-secondaryText/40 rounded-lg text-xs font-semibold text-primaryText transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-secondaryText" />
            <span>Upload Document</span>
          </Link>
        </div>
      </div>

      {/* Main Search Panel - Perplexity Inspired */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-subtle">
        <h2 className="text-xs font-bold uppercase tracking-wider text-secondaryText/70 mb-4 flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-primaryBlue" />
          <span>Universal AI Research Engine</span>
        </h2>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search judgments, citations, sections, acts, or search in natural language (e.g. 'Privacy judgement after Puttaswamy')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-4 pr-24 py-3.5 bg-background border border-border rounded-xl text-xs placeholder:text-secondaryText/50 focus:outline-none focus:border-primaryBlue/70 focus:ring-1 focus:ring-primaryBlue/70 text-primaryText transition-all"
          />
          <button
            type="submit"
            className="absolute right-2.5 top-2.5 bg-primaryText hover:bg-primaryText/90 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Suggestion tags */}
        <div className="flex flex-wrap gap-2 mt-4 items-center">
          <span className="text-[10px] text-secondaryText font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-primaryBlue" />
            <span>Trending:</span>
          </span>
          {recentSearches.slice(0, 3).map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(item.query);
                addRecentSearch(item.query);
                navigate(`/search?q=${encodeURIComponent(item.query)}`);
              }}
              className="text-[10px] text-secondaryText hover:text-primaryText hover:bg-background border border-border/80 px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium"
            >
              {item.query}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2 columns - Primary Workspace items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pinned Judgments */}
          <div className="bg-white border border-border rounded-xl shadow-subtle overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-background/20">
              <h3 className="text-xs font-bold text-primaryText flex items-center gap-2">
                <Pin className="w-3.5 h-3.5 text-primaryBlue transform rotate-45" />
                <span>Pinned Landmark Judgments</span>
              </h3>
              <Link to="/bookmarks" className="text-[10px] text-primaryBlue hover:underline flex items-center gap-0.5">
                <span>View all Bookmarks</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {mockDashboardData.pinnedJudgments.map((item) => (
                <div key={item.id} className="p-4 hover:bg-background/40 transition-colors flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <Link to={`/judgment/${item.id}`} className="text-xs font-semibold text-primaryText hover:text-primaryBlue hover:underline line-clamp-1">
                      {item.title}
                    </Link>
                    <div className="flex gap-2 text-[10px] text-secondaryText">
                      <span className="bg-background px-1.5 py-0.5 border border-border/50 rounded font-mono font-medium">{item.citation}</span>
                      <span>{item.court}</span>
                    </div>
                  </div>
                  <Link to={`/judgment/${item.id}`} className="text-[10px] text-secondaryText hover:text-primaryText flex items-center gap-0.5 shrink-0 bg-background/50 hover:bg-background border border-border/60 px-2 py-1 rounded-md transition-all font-medium">
                    <span>Read Brief</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Bookmarked Acts & Sections */}
          <div className="bg-white border border-border rounded-xl shadow-subtle overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-background/20">
              <h3 className="text-xs font-bold text-primaryText flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-green" />
                <span>Bare Acts Quick Reference</span>
              </h3>
              <Link to="/acts" className="text-[10px] text-primaryBlue hover:underline flex items-center gap-0.5">
                <span>Browse Acts</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-border">
              {mockDashboardData.bookmarkedActs.map((item) => (
                <div key={item.id} className="p-4 hover:bg-background/40 transition-colors flex justify-between items-center">
                  <div className="space-y-1">
                    <Link to={`/acts/${item.id}`} className="text-xs font-semibold text-primaryText hover:text-primaryBlue hover:underline">
                      {item.title}
                    </Link>
                    <p className="text-[10px] text-secondaryText">
                      Last referenced: <span className="text-primaryText font-medium">{item.activeArticle}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-secondaryText bg-background px-2 py-0.5 border border-border rounded-full font-medium">
                      {item.bookmarkedCount} bookmarks
                    </span>
                    <Link to={`/acts/${item.id}`} className="p-1 hover:bg-background rounded text-secondaryText hover:text-primaryText">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 column - Analytics and Activities */}
        <div className="space-y-6">
          {/* Continue Reading (Tracking Progress) */}
          <div className="bg-white border border-border rounded-xl shadow-subtle p-5">
            <h3 className="text-xs font-bold text-primaryText mb-4 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-yellow" />
              <span>Continue Reading</span>
            </h3>
            <div className="space-y-4">
              {mockDashboardData.continueReading.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-start text-xs">
                    <span className="font-semibold text-primaryText line-clamp-1 flex-1 pr-2">{item.title}</span>
                    <span className="text-[10px] text-secondaryText shrink-0 font-medium">{item.progress}%</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-background rounded-full h-1.5 overflow-hidden border border-border/40">
                    <div
                      className="bg-primaryBlue h-full rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-secondaryText">
                    <span className="uppercase font-semibold tracking-wider text-[8px] bg-background px-1.5 py-0.5 border border-border/50 rounded">{item.type}</span>
                    <span>Read {item.lastRead}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white border border-border rounded-xl shadow-subtle p-5">
            <h3 className="text-xs font-bold text-primaryText mb-4 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-primaryBlue" />
              <span>Quick Actions</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/workspace" className="p-3 text-center border border-border hover:border-primaryBlue/30 hover:bg-primaryBlue/[0.02] rounded-lg transition-all group">
                <FileText className="w-4 h-4 text-secondaryText group-hover:text-primaryBlue mx-auto mb-1.5" />
                <span className="text-[10px] font-semibold text-primaryText">Analyze Brief</span>
              </Link>
              <Link to="/bookmarks" className="p-3 text-center border border-border hover:border-primaryBlue/30 hover:bg-primaryBlue/[0.02] rounded-lg transition-all group">
                <Bookmark className="w-4 h-4 text-secondaryText group-hover:text-primaryBlue mx-auto mb-1.5" />
                <span className="text-[10px] font-semibold text-primaryText">Collections</span>
              </Link>
              <Link to="/ai-research" className="p-3 text-center border border-border hover:border-primaryBlue/30 hover:bg-primaryBlue/[0.02] rounded-lg transition-all group">
                <Sparkles className="w-4 h-4 text-secondaryText group-hover:text-primaryBlue mx-auto mb-1.5" />
                <span className="text-[10px] font-semibold text-primaryText">AI Drafter</span>
              </Link>
              <Link to="/settings" className="p-3 text-center border border-border hover:border-primaryBlue/30 hover:bg-primaryBlue/[0.02] rounded-lg transition-all group">
                <Sliders className="w-4 h-4 text-secondaryText group-hover:text-primaryBlue mx-auto mb-1.5" />
                <span className="text-[10px] font-semibold text-primaryText">Preferences</span>
              </Link>
            </div>
          </div>

          {/* Recent Document Statuses */}
          <div className="bg-white border border-border rounded-xl shadow-subtle p-5">
            <h3 className="text-xs font-bold text-primaryText mb-4 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-primaryBlue" />
              <span>AI Upload Workspace</span>
            </h3>
            <div className="space-y-3">
              {documents.slice(0, 2).map((doc) => (
                <div key={doc.id} className="flex justify-between items-center text-xs p-2.5 border border-border/80 rounded-lg hover:border-secondaryText/30 transition-all">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="font-semibold text-primaryText truncate">{doc.name}</p>
                    <span className="text-[10px] text-secondaryText">{doc.size} • {doc.date}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    doc.status === "Analyzed" ? "text-green bg-green/5 border border-green/10" : "text-yellow bg-yellow/5 border border-yellow/10 animate-pulse"
                  }`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
