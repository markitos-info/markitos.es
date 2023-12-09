import React from "react";
import { Route, Routes } from "react-router-dom";
import RouterLayout from "./common/RouterLayout";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import PlaylistPage from "./pages/playlist";
import VideoPage from "./pages/video";
import RouterMinimalLayout from "./common/RouterMinimalLayout";
import FaqPage from "./pages/faq";

export const AppRouter: React.FC<object> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/playlists/:playlistId/videos/:id"
          element={<VideoPage />}
        />
        <Route path="/playlists/:id" element={<PlaylistPage />} />
        <Route path="/faqs" element={<FaqPage />} />
      </Route>
      <Route path="/" element={<RouterMinimalLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
