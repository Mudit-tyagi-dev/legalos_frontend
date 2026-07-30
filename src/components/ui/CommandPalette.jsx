import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, ArrowRight, LayoutDashboard, BrainCircuit, BookOpen, Bookmark, Settings, X, FolderPlus } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, addFolder, addToast } = useApp();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const commandItems = [
    { name: "Go to Dashboard", category: "Navigation", icon: LayoutDashboard, action: () => navigate("/dashboard") },
    { name: "Global Search", category: "Navigation", icon: Search, action: () => navigate("/search") },
    { name: "AI Research", category: "Navigation", icon: BrainCircuit, action: () => navigate("/ai-research") },
    { name: "Document Workspace", category: "Navigation", icon: FileText, action: () => navigate("/workspace") },
    { name: "Bare Acts Database", category: "Navigation", icon: BookOpen, action: () => navigate("/acts") },
    { name: "Bookmarks & Pinned Cases", category: "Navigation", icon: Bookmark, action: () => navigate("/bookmarks") },
    { name: "User Profile & Security", category: "Navigation", icon: Settings, action: () => navigate("/profile") },
    { name: "Platform Settings", category: "Navigation", icon: Settings, action: () => navigate("/settings") },
    {
      name: "Create New Bookmarks Folder",
      category: "Quick Actions",
      icon: FolderPlus,
      action: () => {
        const folderName = prompt("Enter folder name:");
        if (folderName) {
          addFolder(folderName);
        }
      }
    },
    {
      name: "Clear Search History",
      category: "Quick Actions",
      icon: X,
      action: () => {
        addToast("Search history cleared", "info");
      }
    }
  ];

  // Filter commands
  const filteredCommands = commandItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Global event listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      } else if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setSearch("");
    }
  }, [commandPaletteOpen]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setCommandPaletteOpen(false);
      }
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 bg-primaryText/20 backdrop-blur-[1px] z-50 flex items-start justify-center pt-24 px-4 select-none">
      <div
        className="bg-white border border-border w-full max-w-lg rounded-xl shadow-lg flex flex-col overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 border-b border-border h-12">
          <Search className="w-4 h-4 text-secondaryText shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search page..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent border-0 outline-none text-xs text-primaryText placeholder:text-secondaryText/60 h-full"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 hover:bg-background border border-transparent hover:border-border rounded text-secondaryText"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-secondaryText">
              No matching commands found.
            </div>
          ) : (
            <div>
              {/* Group commands by category */}
              {["Navigation", "Quick Actions"].map((category) => {
                const categoryCommands = filteredCommands.filter(c => c.category === category);
                if (categoryCommands.length === 0) return null;

                return (
                  <div key={category}>
                    <div className="px-4 py-1 text-[10px] font-semibold text-secondaryText/50 tracking-wider uppercase">
                      {category}
                    </div>
                    {categoryCommands.map((command, idx) => {
                      const globalIdx = filteredCommands.indexOf(command);
                      const isSelected = globalIdx === selectedIndex;
                      return (
                        <div
                          key={command.name}
                          onClick={() => {
                            command.action();
                            setCommandPaletteOpen(false);
                          }}
                          className={`flex items-center justify-between px-4 py-2 text-xs transition-colors cursor-pointer ${
                            isSelected ? "bg-primaryBlue/5 text-primaryBlue" : "text-primaryText hover:bg-background"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <command.icon className={`w-3.5 h-3.5 ${isSelected ? "text-primaryBlue" : "text-secondaryText"}`} />
                            <span>{command.name}</span>
                          </div>
                          {isSelected && <ArrowRight className="w-3.5 h-3.5 text-primaryBlue" />}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-border bg-background px-4 py-2 flex justify-between items-center text-[10px] text-secondaryText/60">
          <div className="flex gap-3">
            <span><kbd className="font-mono bg-white px-1 py-0.5 rounded border border-border">↑↓</kbd> Navigate</span>
            <span><kbd className="font-mono bg-white px-1 py-0.5 rounded border border-border">Enter</kbd> Select</span>
            <span><kbd className="font-mono bg-white px-1 py-0.5 rounded border border-border">ESC</kbd> Close</span>
          </div>
          <div>
            <span>LegalOS Command Console</span>
          </div>
        </div>
      </div>
    </div>
  );
}
