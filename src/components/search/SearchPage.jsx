import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Sparkles, BookOpen, FileText, ExternalLink, ArrowRight, ShieldCheck, Filter } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { mockAiAnswers, mockJudgments, mockActs } from "../../services/mockData";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const { addRecentSearch } = useApp();

  const [inputVal, setInputVal] = useState(queryParam);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all"); // all, judgments, acts

  useEffect(() => {
    setInputVal(queryParam);
    if (queryParam) {
      simulateSearch(queryParam);
    } else {
      setResult(null);
    }
  }, [queryParam]);

  const simulateSearch = (searchQuery) => {
    setLoading(true);
    addRecentSearch(searchQuery);

    setTimeout(() => {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      let matchedAnswer = null;

      // Check exact matches first
      if (normalizedQuery.includes("privacy") || normalizedQuery.includes("puttaswamy")) {
        matchedAnswer = mockAiAnswers["privacy judgement after puttaswamy"];
      } else if (normalizedQuery.includes("basic structure") || normalizedQuery.includes("kesavananda")) {
        matchedAnswer = mockAiAnswers["basic structure doctrine"];
      }

      if (matchedAnswer) {
        setResult(matchedAnswer);
      } else {
        // Build a dynamic simulation based on content available
        const relatedJudgments = mockJudgments.filter(
          j => j.title.toLowerCase().includes(normalizedQuery) || j.fullText.toLowerCase().includes(normalizedQuery)
        );
        const relatedActs = mockActs.filter(
          a => a.title.toLowerCase().includes(normalizedQuery) || a.sections.some(s => s.content.toLowerCase().includes(normalizedQuery))
        );

        const sources = [];
        relatedJudgments.forEach(j => sources.push({ title: j.title, citation: j.citation, id: j.id, type: "judgment" }));
        relatedActs.forEach(a => sources.push({ title: a.title, citation: a.sections[0]?.number || "Bare Act", id: a.id, type: "act" }));

        // Fallback generic AI answer
        setResult({
          query: searchQuery,
          answer: `We analyzed the database for "${searchQuery}". We found ${relatedJudgments.length} landmark judgment(s) and ${relatedActs.length} statutory section(s) closely linked to this query.\n\nBased on judicial precedents in India, issues concerning this domain are governed by fundamental constitutional rights. Courts routinely invoke tests of proportionality and procedural compliance when adjudicating these matters. For precise definitions, refer to the cited judgments and bare act sections.`,
          confidence: sources.length > 0 ? "92%" : "85%",
          sources: sources.length > 0 ? sources : [
            { title: "Constitution of India, Article 21", citation: "Article 21", id: "constitution-of-india", type: "act" },
            { title: "Justice K.S. Puttaswamy v. Union of India", citation: "(2017) 10 SCC 1", id: "puttaswamy-2017", type: "judgment" }
          ]
        });
      }
      setLoading(false);
    }, 1200); // realistic search latency
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setSearchParams({ q: inputVal });
  };

  // Filter sources based on active filters
  const getFilteredSources = () => {
    if (!result) return [];
    if (activeFilter === "all") return result.sources;
    return result.sources.filter(s => s.type === activeFilter.slice(0, -1)); // judgments -> judgment
  };

  return (
    <div className="space-y-6 select-none max-w-7xl mx-auto">
      {/* Search Input Bar */}
      <div className="bg-white border border-border rounded-xl p-5 shadow-subtle">
        <form onSubmit={handleSearchSubmit} className="relative flex gap-2">
          <input
            type="text"
            placeholder="Type a natural language query (e.g. 'Privacy judgement after Puttaswamy')..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full pl-4 pr-24 py-3 bg-background border border-border rounded-lg text-xs placeholder:text-secondaryText/50 focus:outline-none focus:border-primaryBlue/70 focus:ring-1 focus:ring-primaryBlue/70 text-primaryText transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bg-primaryText hover:bg-primaryText/90 text-white text-xs font-semibold px-4 py-1.5 rounded-md transition-colors cursor-pointer"
          >
            Query
          </button>
        </form>
      </div>

      {loading ? (
        // Loading Skeleton
        <div className="grid lg:grid-cols-3 gap-6 animate-pulse">
          <div className="lg:col-span-2 bg-white border border-border rounded-xl p-6 space-y-4">
            <div className="h-4 bg-background w-1/3 rounded"></div>
            <div className="h-3 bg-background w-full rounded"></div>
            <div className="h-3 bg-background w-full rounded"></div>
            <div className="h-3 bg-background w-3/4 rounded"></div>
            <div className="h-10 bg-background w-full rounded-lg mt-6"></div>
          </div>
          <div className="bg-white border border-border rounded-xl p-6 space-y-4">
            <div className="h-4 bg-background w-1/2 rounded"></div>
            <div className="h-20 bg-background w-full rounded-lg"></div>
            <div className="h-20 bg-background w-full rounded-lg"></div>
          </div>
        </div>
      ) : result ? (
        // Search Results Layout
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* Left Panel: AI synthesized answer */}
          <div className="lg:col-span-2 bg-white border border-border rounded-xl p-6 shadow-subtle space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-border/80">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primaryBlue/5 text-primaryBlue flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-xs font-bold text-primaryText uppercase tracking-wider">AI Answer Engine</h2>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-green font-semibold bg-green/5 border border-green/10 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Confidence: {result.confidence}</span>
              </div>
            </div>

            {/* Answer body */}
            <div className="text-xs text-primaryText leading-relaxed space-y-3 whitespace-pre-line font-medium">
              {result.answer.split("\n\n").map((para, pIdx) => {
                // Highlight terms or structure nicely
                return <p key={pIdx}>{para}</p>;
              })}
            </div>

            {/* In-text citations legend */}
            <div className="bg-background/40 border border-border/60 rounded-lg p-3.5 space-y-2">
              <span className="text-[10px] font-bold text-secondaryText uppercase tracking-wider">Citations Map</span>
              <div className="grid sm:grid-cols-2 gap-2 mt-1">
                {result.sources.map((src, sIdx) => (
                  <Link
                    key={sIdx}
                    to={src.type === "judgment" ? `/judgment/${src.id}` : `/acts/${src.id}`}
                    className="flex items-center gap-2 p-2 border border-border hover:border-primaryBlue bg-white rounded-md transition-all text-[11px]"
                  >
                    {src.type === "judgment" ? (
                      <FileText className="w-3.5 h-3.5 text-primaryBlue shrink-0" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5 text-green shrink-0" />
                    )}
                    <span className="font-semibold truncate text-primaryText flex-1 pr-1">{src.title}</span>
                    <span className="text-[9px] text-secondaryText bg-background border px-1 rounded shrink-0 font-mono">
                      {src.citation}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Source listings */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-subtle space-y-4">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <h3 className="text-xs font-bold text-primaryText flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-primaryBlue" />
                <span>Sources & Authority</span>
              </h3>
              <div className="flex items-center gap-1">
                <Filter className="w-3 h-3 text-secondaryText" />
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="bg-transparent border-0 text-[10px] font-semibold text-secondaryText focus:outline-none"
                >
                  <option value="all">All Sources</option>
                  <option value="judgments">Judgments Only</option>
                  <option value="acts">Bare Acts Only</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              {getFilteredSources().length === 0 ? (
                <p className="text-[10px] text-secondaryText text-center py-4">No sources matching this filter.</p>
              ) : (
                getFilteredSources().map((src, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-border rounded-lg hover:border-secondaryText/30 transition-all flex flex-col gap-2 bg-background/10"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        src.type === "judgment" ? "text-primaryBlue bg-primaryBlue/5" : "text-green bg-green/5"
                      }`}>
                        {src.type}
                      </span>
                      <span className="text-[9px] text-secondaryText font-mono">{src.citation}</span>
                    </div>
                    <p className="text-xs font-semibold text-primaryText leading-snug line-clamp-2">
                      {src.title}
                    </p>
                    <Link
                      to={src.type === "judgment" ? `/judgment/${src.id}` : `/acts/${src.id}`}
                      className="text-[10px] text-primaryBlue hover:underline flex items-center gap-1 self-start font-semibold mt-1"
                    >
                      <span>Review full document</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        // Empty State
        <div className="bg-white border border-border rounded-xl p-12 text-center shadow-subtle max-w-xl mx-auto">
          <div className="w-12 h-12 bg-primaryBlue/5 rounded-full flex items-center justify-center mx-auto mb-4 text-primaryBlue">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-primaryText">AI-Powered Legal Research</h3>
          <p className="text-xs text-secondaryText max-w-md mx-auto mt-2 leading-relaxed">
            Enter search terms above to fetch verified case laws, browse articles, review bare acts, and receive complete AI summaries instantly.
          </p>
        </div>
      )}
    </div>
  );
}
