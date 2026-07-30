import React, { createContext, useContext, useState } from "react";
import { defaultBookmarks, mockDashboardData } from "../services/mockData";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Senior Partner", email: "partner@legalos.ai", role: "Lawyer" });
  const [bookmarks, setBookmarks] = useState(defaultBookmarks);
  const [recentSearches, setRecentSearches] = useState(mockDashboardData.recentSearches);
  const [documents, setDocuments] = useState(mockDashboardData.recentDocuments);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addBookmark = (item) => {
    const newItem = {
      id: `item-${Date.now()}`,
      ...item
    };
    setBookmarks((prev) => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
    addToast(`Bookmarked: ${item.title}`);
  };

  const removeBookmark = (refId) => {
    setBookmarks((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.refId !== refId)
    }));
    addToast("Removed from bookmarks", "info");
  };

  const addFolder = (name, color = "#2563EB") => {
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      color
    };
    setBookmarks((prev) => ({
      ...prev,
      folders: [...prev.folders, newFolder]
    }));
    addToast(`Created folder: ${name}`);
  };

  const addRecentSearch = (query) => {
    if (!query.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.query.toLowerCase() !== query.toLowerCase());
      return [{ query, timestamp: "Just now" }, ...filtered].slice(0, 5);
    });
  };

  const uploadDocument = (file) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Analyzing"
    };
    setDocuments((prev) => [newDoc, ...prev]);
    addToast(`Uploading ${file.name}...`);

    // Simulate AI document analysis completion
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) => (d.id === newDoc.id ? { ...d, status: "Analyzed" } : d))
      );
      addToast(`AI Analysis complete for ${file.name}`);
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        bookmarks,
        addBookmark,
        removeBookmark,
        addFolder,
        recentSearches,
        addRecentSearch,
        documents,
        uploadDocument,
        commandPaletteOpen,
        setCommandPaletteOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
