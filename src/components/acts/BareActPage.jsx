import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, Search, Bookmark, Navigation, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { mockActs } from "../../services/mockData";

export default function BareActPage() {
  const { id } = useParams();
  const { addBookmark, bookmarks, removeBookmark } = useApp();
  const [selectedActId, setSelectedActId] = useState(id || mockActs[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("");

  const activeAct = useMemo(() => {
    return mockActs.find((act) => act.id === selectedActId) || mockActs[0];
  }, [selectedActId]);

  const handleActChange = (e) => {
    setSelectedActId(e.target.value);
    setSearchTerm("");
    setActiveSectionId("");
  };

  const handleSectionClick = (sectionId) => {
    if (!sectionId) return;
    setActiveSectionId(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Utility to highlight search keywords in text
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow/40 text-primaryText rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col gap-4 select-none max-w-7xl mx-auto">
      {/* Top Header Actions */}
      <div className="bg-white border border-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shrink-0 shadow-subtle">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-primaryBlue" />
          <select
            value={selectedActId}
            onChange={handleActChange}
            className="bg-transparent border-0 text-sm font-bold text-primaryText focus:outline-none cursor-pointer"
          >
            {mockActs.map((act) => (
              <option key={act.id} value={act.id}>
                {act.title}
              </option>
            ))}
          </select>
        </div>

        {/* Search Inside Act */}
        <div className="relative max-w-xs w-full flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-secondaryText" />
          <input
            type="text"
            placeholder="Search keyword inside Act..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-background border border-border rounded-lg text-xs placeholder:text-secondaryText/50 focus:outline-none focus:border-primaryBlue/70 text-primaryText font-medium"
          />
        </div>
      </div>

      {/* Split Workspace */}
      <div className="flex-1 flex overflow-hidden gap-4 min-h-0">
        {/* Sticky Table of Contents */}
        <aside className="w-64 border border-border bg-white rounded-xl flex flex-col overflow-hidden shrink-0 shadow-subtle">
          <div className="px-4 py-3 border-b border-border bg-background/20">
            <h2 className="text-[10px] font-bold text-secondaryText uppercase tracking-wider">Table of Contents</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {activeAct.toc.map((item, index) => {
              const isSectionHeader = item.sectionId;
              const isSelected = activeSectionId === item.sectionId && item.sectionId;

              return (
                <button
                  key={index}
                  onClick={() => handleSectionClick(item.sectionId)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                    isSelected
                      ? "bg-primaryBlue/5 text-primaryBlue font-semibold border-l-2 border-primaryBlue pl-2"
                      : isSectionHeader
                      ? "text-primaryText hover:bg-background font-medium"
                      : "text-secondaryText/70 font-semibold pointer-events-none mt-2 text-[9px] uppercase tracking-wide"
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Interactive Act Content Scroller */}
        <section className="flex-1 border border-border bg-white rounded-xl overflow-y-auto p-6 shadow-subtle space-y-8 relative">
          {activeAct.sections.map((sec) => {
            const isSecBookmarked = bookmarks.items.some(
              (b) => b.type === "act" && b.refId === activeAct.id && b.title.includes(sec.number)
            );

            const handleBookmarkActSection = () => {
              if (isSecBookmarked) {
                removeBookmark(activeAct.id);
              } else {
                addBookmark({
                  type: "act",
                  title: `${activeAct.title} - ${sec.number}`,
                  citation: sec.number,
                  refId: activeAct.id
                });
              }
            };

            return (
              <div
                id={sec.id}
                key={sec.id}
                className={`p-5 rounded-lg border transition-all ${
                  activeSectionId === sec.id
                    ? "border-primaryBlue/40 bg-primaryBlue/[0.01]"
                    : "border-border/60 hover:border-border"
                }`}
              >
                <div className="flex justify-between items-start mb-2 select-none">
                  <div>
                    <span className="text-[10px] font-bold text-primaryBlue uppercase font-mono">
                      {sec.number}
                    </span>
                    <h3 className="text-xs font-bold text-primaryText mt-0.5">{sec.title}</h3>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleBookmarkActSection}
                      className={`p-1.5 rounded border transition-colors cursor-pointer ${
                        isSecBookmarked
                          ? "bg-primaryBlue/5 border-primaryBlue/30 text-primaryBlue"
                          : "bg-white border-border/80 text-secondaryText hover:text-primaryText hover:border-secondaryText/30"
                      }`}
                      title="Bookmark Section"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSecBookmarked ? "fill-primaryBlue" : ""}`} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-primaryText leading-relaxed whitespace-pre-line font-medium">
                  {highlightText(sec.content, searchTerm)}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
