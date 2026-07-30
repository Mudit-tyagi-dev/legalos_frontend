import React, { useState } from "react";
import { Upload, FileText, Sparkles, BookOpen, Clock, Play, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function DocumentWorkspace() {
  const { documents, uploadDocument, addToast } = useApp();
  const [selectedDocId, setSelectedDocId] = useState(documents[0]?.id || null);
  const [ragQuery, setRagQuery] = useState("");
  const [ragResponse, setRagResponse] = useState("");
  const [ragLoading, setRagLoading] = useState(false);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState("sections"); // sections, acts, cases, timeline

  const selectedDoc = documents.find((d) => d.id === selectedDocId);

  // Mock analysis summaries for standard templates
  const mockAnalysisReport = {
    sections: [
      { title: "1. Statement of Facts", content: "The petitioner, a software consultant, challenges the constitutionality of regional data logging acts requiring service providers to keep call history summaries for 10 years without warrants." },
      { title: "2. Grounds of Appeal", content: "The primary ground is that informational privacy and security are violated, violating guarantees under Article 21 and Article 19(1)(a) of the Constitution." },
      { title: "3. Reliefs Claimed", content: "Declare the logging regulations ultra vires the constitution and direct respondents to purge call log caches." }
    ],
    acts: [
      { name: "Constitution of India, 1950", section: "Article 21 (Life & Liberty)" },
      { name: "Constitution of India, 1950", section: "Article 19(1)(a) (Freedom of Speech)" },
      { name: "Information Technology Act, 2000", section: "Section 69A (Power to issue blocking directions)" }
    ],
    cases: [
      { name: "Justice K.S. Puttaswamy v. Union of India", citation: "(2017) 10 SCC 1", relevance: "Governing precedent on data privacy testing criteria." },
      { name: "Shreya Singhal v. Union of India", citation: "(2015) 5 SCC 1", relevance: "Overruled Section 66A of IT Act regarding online speech." }
    ],
    timeline: [
      { date: "Oct 12, 2025", title: "Logging Ordinance Promulgated", desc: "Regional authority releases logging rule directive." },
      { date: "Jan 18, 2026", title: "Chamber Petition Filed", desc: "Consultant files civil appeal in High Court." },
      { date: "Mar 05, 2026", title: "Interim Stay Application denied", desc: "Chamber rules that regulations remain in effect pending final hearing." }
    ]
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadDocument(file);
    }
  };

  const handleRagQuerySubmit = (e) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;
    setRagLoading(true);

    setTimeout(() => {
      const q = ragQuery.toLowerCase();
      if (q.includes("privacy") || q.includes("puttaswamy") || q.includes("article 21")) {
        setRagResponse("According to Section 2 of the document draft, the appellant leverages the landmark judgment in Puttaswamy v. UOI to argue that 10-year call log storage rules violate informational privacy. The argument asserts that the proportionality test is not satisfied since less intrusive methods could achieve similar crime mitigation goals.");
      } else {
        setRagResponse(`Based on our index of ${selectedDoc?.name}, the appellant addresses this in page 4. They claim that the regional rules are ultra vires because there was no prior parliamentary debate, and they lack safeguards or independent oversight mechanisms.`);
      }
      setRagLoading(false);
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col lg:flex-row gap-6 select-none max-w-7xl mx-auto">
      {/* Left panel: File Upload & List */}
      <section className="w-full lg:w-96 flex flex-col gap-4 shrink-0">
        {/* Upload Card */}
        <div className="bg-white border border-border rounded-xl p-5 shadow-subtle flex flex-col items-center justify-center text-center relative border-dashed hover:border-secondaryText/50 transition-colors">
          <Upload className="w-8 h-8 text-secondaryText/60 mb-2" />
          <h3 className="text-xs font-bold text-primaryText">Upload Brief or Affidavit</h3>
          <p className="text-[10px] text-secondaryText max-w-[200px] mt-1 mb-3">
            Supports PDF, DOCX, or Images up to 25MB for immediate legal entity extraction.
          </p>
          <label className="bg-primaryBlue hover:bg-primaryBlue/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors shadow-sm select-none">
            Choose File
            <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.docx,.jpg,.png" />
          </label>
        </div>

        {/* Document list */}
        <div className="bg-white border border-border rounded-xl flex-1 flex flex-col overflow-hidden shadow-subtle">
          <div className="px-4 py-3 border-b border-border bg-background/20">
            <h2 className="text-[10px] font-bold text-secondaryText uppercase tracking-wider">Active Workspace Documents</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {documents.length === 0 ? (
              <p className="text-[10px] text-secondaryText text-center py-6">No documents uploaded.</p>
            ) : (
              documents.map((doc) => {
                const isSelected = selectedDocId === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      if (doc.status === "Analyzed") {
                        setSelectedDocId(doc.id);
                        setRagResponse("");
                        setRagQuery("");
                      } else {
                        addToast("Document analysis is currently in progress", "info");
                      }
                    }}
                    className={`p-3 rounded-lg border flex justify-between items-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primaryBlue/5 border-primaryBlue/30"
                        : "border-border/60 hover:bg-background/40 hover:border-border"
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs font-semibold text-primaryText truncate">{doc.name}</p>
                      <span className="text-[9px] text-secondaryText">{doc.size} • {doc.date}</span>
                    </div>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${
                      doc.status === "Analyzed"
                        ? "text-green bg-green/5 border border-green/10"
                        : "text-yellow bg-yellow/5 border border-yellow/10 animate-pulse"
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Right panel: Analysis Workspace */}
      <section className="flex-1 bg-white border border-border rounded-xl shadow-subtle flex flex-col overflow-hidden min-w-0">
        {selectedDoc ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Summary Details Header */}
            <div className="p-4 border-b border-border bg-background/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-primaryText truncate flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primaryBlue" />
                  <span>{selectedDoc.name}</span>
                </h2>
                <p className="text-[10px] text-secondaryText mt-0.5">
                  Parsed successfully • Ready for RAG Semantic Querying
                </p>
              </div>
              <div className="text-[10px] text-green font-bold bg-green/5 border border-green/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AI Analyzed</span>
              </div>
            </div>

            {/* Analysis Workspace Tabs */}
            <div className="border-b border-border px-4 py-1.5 flex gap-4 text-xs select-none shrink-0 bg-background/5">
              {[
                { id: "sections", label: "Extracted Sections", icon: FileText },
                { id: "acts", label: "Referenced Acts", icon: BookOpen },
                { id: "cases", label: "Citations Found", icon: FileText },
                { id: "timeline", label: "Parsed Timeline", icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAnalysisTab(tab.id)}
                  className={`py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors border-b-2 -mb-[8px] cursor-pointer ${
                    activeAnalysisTab === tab.id
                      ? "border-primaryBlue text-primaryBlue"
                      : "border-transparent text-secondaryText hover:text-primaryText"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab content area */}
            <div className="flex-1 overflow-y-auto p-5 min-h-[150px] border-b border-border/80">
              {activeAnalysisTab === "sections" && (
                <div className="space-y-4">
                  {mockAnalysisReport.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="text-xs font-bold text-primaryText">{sec.title}</h4>
                      <p className="text-xs text-secondaryText leading-relaxed font-medium">{sec.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeAnalysisTab === "acts" && (
                <div className="space-y-3">
                  {mockAnalysisReport.acts.map((act, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2.5 border border-border/80 rounded-lg hover:border-secondaryText/35 transition-colors">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-green" />
                        <span className="text-xs font-semibold text-primaryText">{act.name}</span>
                      </div>
                      <span className="text-[10px] text-secondaryText font-mono font-medium">{act.section}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeAnalysisTab === "cases" && (
                <div className="space-y-3">
                  {mockAnalysisReport.cases.map((c, idx) => (
                    <div key={idx} className="p-3 border border-border rounded-lg space-y-1 hover:border-secondaryText/35 transition-colors bg-background/5">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-primaryText">{c.name}</span>
                        <span className="text-[10px] text-secondaryText font-mono">{c.citation}</span>
                      </div>
                      <p className="text-[11px] text-secondaryText leading-relaxed">{c.relevance}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeAnalysisTab === "timeline" && (
                <div className="relative border-l border-border pl-5 space-y-6 py-2">
                  {mockAnalysisReport.timeline.map((step, idx) => (
                    <div key={idx} className="relative">
                      <span className="absolute -left-[28px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-white border border-primaryBlue">
                        <span className="h-1 w-1 rounded-full bg-primaryBlue"></span>
                      </span>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold font-mono text-primaryBlue">{step.date}</span>
                        <h5 className="text-xs font-bold text-primaryText leading-none">{step.title}</h5>
                        <p className="text-[11px] text-secondaryText">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RAG Query Terminal Footer */}
            <div className="p-4 bg-background/30 shrink-0 space-y-3 border-t border-border">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primaryBlue" />
                <h3 className="text-xs font-bold text-primaryText uppercase tracking-wider flex items-center gap-1">
                  <span>Semantic Q&A Inside Brief</span>
                  <HelpCircle className="w-3.5 h-3.5 text-secondaryText/60" title="Queries only the uploaded document text using RAG." />
                </h3>
              </div>

              <form onSubmit={handleRagQuerySubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about this brief (e.g. 'What is the argument on Article 21?')..."
                  value={ragQuery}
                  onChange={(e) => setRagQuery(e.target.value)}
                  className="flex-1 bg-white border border-border rounded-lg text-xs placeholder:text-secondaryText/50 px-3 py-2 focus:outline-none focus:border-primaryBlue/70 text-primaryText font-medium"
                />
                <button
                  type="submit"
                  disabled={ragLoading}
                  className="bg-primaryText hover:bg-primaryText/90 disabled:bg-secondaryText/30 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {ragLoading ? "Processing" : "Ask"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {ragResponse && (
                <div className="bg-white border border-border rounded-lg p-3.5 text-xs text-primaryText leading-relaxed font-medium">
                  {ragResponse}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center text-center p-12 space-y-3">
            <FileText className="w-12 h-12 text-secondaryText/30" />
            <h3 className="text-sm font-bold text-primaryText">Document Workspace</h3>
            <p className="text-xs text-secondaryText max-w-sm mx-auto leading-relaxed">
              Upload a legal document in the left column or select an active file to analyze sections, parse timelines, and execute RAG semantic queries.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
