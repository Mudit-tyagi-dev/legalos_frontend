import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Bookmark, Download, Share2, Sparkles, BookOpen, Clock, FileText, ArrowLeft, History } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { mockJudgments } from "../../services/mockData";

export default function JudgmentPage() {
  const { id } = useParams();
  const { bookmarks, addBookmark, removeBookmark, addToast } = useApp();
  const [activeTab, setActiveTab] = useState("summary"); // summary, full, acts, related, timeline

  const judgment = mockJudgments.find((j) => j.id === id) || mockJudgments[0];

  const isBookmarked = bookmarks.items.some((item) => item.refId === judgment.id);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeBookmark(judgment.id);
    } else {
      addBookmark({
        type: "judgment",
        title: judgment.title,
        citation: judgment.citation,
        refId: judgment.id
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast("Citation link copied to clipboard!", "success");
  };

  const tabs = [
    { id: "summary", label: "AI Summary", icon: Sparkles },
    { id: "full", label: "Full Judgment", icon: FileText },
    { id: "acts", label: "Referenced Acts", icon: BookOpen },
    { id: "related", label: "Related Cases", icon: History },
    { id: "timeline", label: "Timeline", icon: Clock }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* Header and Back Button */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="p-1.5 hover:bg-white border border-transparent hover:border-border rounded-lg text-secondaryText hover:text-primaryText transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <span className="text-[10px] text-secondaryText uppercase tracking-wider font-semibold bg-white border border-border px-2.5 py-0.5 rounded-full">
          Landmark Ruling
        </span>
      </div>

      {/* Main Info Card */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-2 max-w-4xl">
            <h1 className="text-lg lg:text-xl font-bold tracking-tight text-primaryText leading-normal">
              {judgment.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-secondaryText">
              <span className="bg-background border border-border px-2 py-0.5 rounded font-mono font-semibold text-primaryText">
                {judgment.citation}
              </span>
              <span>•</span>
              <span className="font-medium text-primaryText">{judgment.court}</span>
              <span>•</span>
              <span>Decided on: <span className="font-medium text-primaryText">{judgment.date}</span></span>
            </div>
          </div>

          {/* Action Panel */}
          <div className="flex gap-2 shrink-0 select-none">
            <button
              onClick={handleBookmarkToggle}
              className={`p-2 rounded-lg border transition-all flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer ${
                isBookmarked
                  ? "bg-primaryBlue/5 border-primaryBlue/30 text-primaryBlue"
                  : "bg-white border-border hover:border-secondaryText/30 text-secondaryText hover:text-primaryText"
              }`}
              title="Bookmark Case"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-primaryBlue text-primaryBlue" : ""}`} />
              <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
            </button>

            <button
              onClick={() => addToast("PDF download started", "info")}
              className="p-2 bg-white border border-border hover:border-secondaryText/30 rounded-lg text-secondaryText hover:text-primaryText transition-all flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 bg-white border border-border hover:border-secondaryText/30 rounded-lg text-secondaryText hover:text-primaryText transition-all flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Copy citation link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bench Info */}
        <div className="border-t border-border/80 pt-4 flex flex-col md:flex-row md:items-center justify-between text-xs gap-3">
          <p className="text-secondaryText">
            Bench: <span className="font-semibold text-primaryText">{judgment.bench}</span>
          </p>
          <span className="text-[10px] text-green font-bold bg-green/5 border border-green/10 px-2 py-0.5 rounded">
            {judgment.status}
          </span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="border-b border-border flex gap-4 select-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-semibold flex items-center gap-2 transition-all border-b-2 -mb-[2px] cursor-pointer ${
                isActive
                  ? "border-primaryBlue text-primaryBlue"
                  : "border-transparent text-secondaryText hover:text-primaryText"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Content */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-subtle min-h-[300px]">
        {activeTab === "summary" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider">Overview Summary</h3>
              <p className="text-xs text-primaryText leading-relaxed font-medium">
                {judgment.aiSummary.overview}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border/60">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-primaryText uppercase tracking-wider">Key Takeaways</h4>
                <ul className="space-y-2">
                  {judgment.aiSummary.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="text-xs text-secondaryText leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primaryBlue mt-1.5 shrink-0"></span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-primaryText uppercase tracking-wider">Core Legal Questions</h4>
                <ul className="space-y-2">
                  {judgment.aiSummary.legalQuestions.map((q, idx) => (
                    <li key={idx} className="text-xs text-secondaryText leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow mt-1.5 shrink-0"></span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border/60">
              <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider">Precedent Impact</h3>
              <p className="text-xs text-secondaryText leading-relaxed">
                {judgment.aiSummary.impact}
              </p>
            </div>
          </div>
        )}

        {activeTab === "full" && (
          <div className="space-y-5 max-w-4xl font-serif text-sm leading-relaxed text-primaryText max-h-[500px] overflow-y-auto pr-3">
            {judgment.fullText.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        )}

        {activeTab === "acts" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider">Statutes Cited in Judgment</h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-background border-b border-border">
                    <th className="p-3 font-semibold text-secondaryText">Statute Name</th>
                    <th className="p-3 font-semibold text-secondaryText">Provision Reference</th>
                    <th className="p-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {judgment.referencedActs.map((act) => (
                    <tr key={act.id} className="hover:bg-background/20">
                      <td className="p-3 font-semibold text-primaryText">{act.name.split(",")[0]}</td>
                      <td className="p-3 font-mono text-secondaryText">{act.section}</td>
                      <td className="p-3 text-right">
                        <Link to={`/acts`} className="text-[10px] text-primaryBlue font-semibold hover:underline">
                          Read Section
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "related" && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider">Referenced Judicial Precedents</h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-background border-b border-border">
                    <th className="p-3 font-semibold text-secondaryText">Case Title</th>
                    <th className="p-3 font-semibold text-secondaryText">Citation</th>
                    <th className="p-3 font-semibold text-secondaryText">Relationship</th>
                    <th className="p-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {judgment.relatedCases.map((c) => (
                    <tr key={c.id} className="hover:bg-background/20">
                      <td className="p-3 font-semibold text-primaryText">{c.title}</td>
                      <td className="p-3 font-mono text-secondaryText">{c.citation}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.relation === "Overruled" ? "text-red bg-red/5 border border-red/10" : "text-primaryBlue bg-primaryBlue/5 border border-primaryBlue/10"
                        }`}>
                          {c.relation}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Link to={`/judgment/${c.id}`} className="text-[10px] text-primaryBlue font-semibold hover:underline">
                          Browse Case
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="relative border-l border-border pl-6 space-y-8 py-3 max-w-xl">
            {judgment.timeline.map((step, idx) => (
              <div key={idx} className="relative">
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-primaryBlue">
                  <span className="h-1.5 w-1.5 rounded-full bg-primaryBlue"></span>
                </span>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold font-mono text-primaryBlue">{step.date}</span>
                  <h4 className="text-xs font-bold text-primaryText leading-none">{step.title}</h4>
                  <p className="text-xs text-secondaryText leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
