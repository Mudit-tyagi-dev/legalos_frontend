import React, { useState } from "react";
import { Folder, Bookmark, Tag, Trash2, FolderPlus, Pin, ExternalLink, Hash } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function BookmarksPage() {
  const { bookmarks, addFolder, removeBookmark, addToast } = useApp();
  const [selectedFolderId, setSelectedFolderId] = useState("all");
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    addFolder(newFolderName);
    setNewFolderName("");
  };

  const getFilteredItems = () => {
    if (selectedFolderId === "all") return bookmarks.items;
    return bookmarks.items.filter((item) => item.folderId === selectedFolderId);
  };

  const activeFolder = bookmarks.folders.find((f) => f.id === selectedFolderId);

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col md:flex-row gap-6 select-none max-w-7xl mx-auto">
      {/* Left Column: Folders & Collections */}
      <aside className="w-full md:w-64 border border-border bg-white rounded-xl flex flex-col overflow-hidden shrink-0 shadow-subtle">
        <div className="px-4 py-3 border-b border-border bg-background/20">
          <h2 className="text-[10px] font-bold text-secondaryText uppercase tracking-wider">Research Folders</h2>
        </div>

        {/* Create Folder Form */}
        <form onSubmit={handleCreateFolder} className="p-3 border-b border-border flex gap-2">
          <input
            type="text"
            placeholder="New folder..."
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="flex-1 bg-background border border-border rounded px-2.5 py-1 text-xs placeholder:text-secondaryText/50 focus:outline-none focus:border-primaryBlue/70 text-primaryText font-medium"
          />
          <button
            type="submit"
            className="p-1 hover:bg-background border border-transparent hover:border-border rounded text-secondaryText hover:text-primaryText"
            title="Create Folder"
          >
            <FolderPlus className="w-4 h-4" />
          </button>
        </form>

        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          <button
            onClick={() => setSelectedFolderId("all")}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2.5 ${
              selectedFolderId === "all" ? "bg-primaryBlue/5 text-primaryBlue" : "text-primaryText hover:bg-background"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>All Bookmarks ({bookmarks.items.length})</span>
          </button>

          <div className="h-px bg-border/60 my-2"></div>

          {bookmarks.folders.map((folder) => {
            const itemCount = bookmarks.items.filter((item) => item.folderId === folder.id).length;
            const isSelected = selectedFolderId === folder.id;
            return (
              <button
                key={folder.id}
                onClick={() => setSelectedFolderId(folder.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                  isSelected ? "bg-primaryBlue/5 text-primaryBlue" : "text-primaryText hover:bg-background"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Folder className="w-3.5 h-3.5 shrink-0" style={{ color: folder.color }} />
                  <span className="truncate">{folder.name}</span>
                </div>
                <span className="text-[10px] text-secondaryText/60 font-mono bg-background border border-border/80 px-1.5 rounded">
                  {itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Column: Bookmarks List */}
      <section className="flex-1 border border-border bg-white rounded-xl overflow-hidden shadow-subtle flex flex-col">
        <div className="px-4 py-3 border-b border-border bg-background/20 flex justify-between items-center shrink-0">
          <h2 className="text-xs font-bold text-primaryText uppercase tracking-wider flex items-center gap-2">
            {activeFolder ? (
              <>
                <Folder className="w-4 h-4" style={{ color: activeFolder.color }} />
                <span>{activeFolder.name}</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-primaryBlue" />
                <span>All Research Bookmarks</span>
              </>
            )}
          </h2>
          <span className="text-[10px] text-secondaryText font-medium">
            Showing {getFilteredItems().length} entries
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {getFilteredItems().length === 0 ? (
            <div className="text-center py-16 text-secondaryText space-y-2">
              <Bookmark className="w-10 h-10 mx-auto text-secondaryText/30" />
              <p className="text-xs font-medium max-w-[220px] mx-auto leading-relaxed">
                No bookmarked items in this folder yet. Browse judgments or bare acts to pin citations.
              </p>
            </div>
          ) : (
            getFilteredItems().map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 border border-border/70 hover:border-secondaryText/35 rounded-xl transition-all bg-background/5"
              >
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2 text-[10px] mb-1">
                    <span className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                      item.type === "judgment" ? "text-primaryBlue bg-primaryBlue/5" : "text-green bg-green/5"
                    }`}>
                      {item.type}
                    </span>
                    <span className="font-mono text-secondaryText">{item.citation}</span>
                  </div>
                  <h3 className="text-xs font-bold text-primaryText truncate leading-none mb-1">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={item.type === "judgment" ? `/judgment/${item.refId}` : `/acts`}
                    className="p-2 hover:bg-background border border-border/80 hover:border-border rounded-lg text-secondaryText hover:text-primaryText transition-all"
                    title="Inspect document"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      removeBookmark(item.refId);
                    }}
                    className="p-2 hover:bg-red/5 border border-transparent hover:border-red/10 rounded-lg text-secondaryText hover:text-red transition-all cursor-pointer"
                    title="Delete bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
