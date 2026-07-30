import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import LandingPage from "../components/landing/LandingPage";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ForgotPassword from "../components/auth/ForgotPassword";
import Dashboard from "../components/dashboard/Dashboard";
import SearchPage from "../components/search/SearchPage";
import JudgmentPage from "../components/judgments/JudgmentPage";
import BareActPage from "../components/acts/BareActPage";
import AIResearchPage from "../components/ai/AIResearchPage";
import DocumentWorkspace from "../components/documents/DocumentWorkspace";
import BookmarksPage from "../components/bookmarks/BookmarksPage";
import ProfilePage from "../components/profile/ProfilePage";
import SettingsPage from "../components/settings/SettingsPage";
import NotFound from "../components/errors/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="" element={<Navigate to="/auth/login" replace />} />
        </Route>

        {/* Main Application Workspace */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="judgment/:id" element={<JudgmentPage />} />
          <Route path="acts" element={<BareActPage />} />
          <Route path="acts/:id" element={<BareActPage />} />
          <Route path="ai-research" element={<AIResearchPage />} />
          <Route path="workspace" element={<DocumentWorkspace />} />
          <Route path="bookmarks" element={<BookmarksPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
