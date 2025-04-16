import { useState } from "react";
import { useGetAnime } from "./hooks/useGetAnime";
import { Route, Router, Routes } from "react-router-dom";
import OngoingAnime from "./components/layout/OngoingAnime";
import DetailAnimePage from "./components/pages/detailAnimePage";
import CompletedAnime from "./components/layout/CompletedAnime";
import HomePage from "./components/pages/HomePage";
import StreamingPage from "./components/pages/StreamingPages";
import DownloadPages from "./components/pages/DownloadPages";
import AboutPage from "./components/pages/AboutPages";


function App() {
  return (
   
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/detail/:animeId" element={<DetailAnimePage />}></Route>
        <Route path="/streaming/:episodeId" element={<StreamingPage />}></Route>
        <Route path="/batch/:batchId" element={<DownloadPages />}></Route>
        <Route path="/anime" element={<CompletedAnime />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
      </Routes>
  );
}

export default App;
