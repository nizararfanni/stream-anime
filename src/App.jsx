import { Route, Router, Routes } from "react-router-dom";
import DetailAnimePage from "./components/pages/DetailAnimePage";
import CompletedAnime from "./components/layout/CompletedAnime";
import HomePage from "./components/pages/HomePage";
import StreamingPage from "./components/pages/StreamingPages";
import DownloadPages from "./components/pages/DownloadPages";
import AboutPage from "./components/pages/AboutPages";
import Navbar from "./components/fragments/home/Navbar";
import { UseSearchAnime } from "./hooks/useGetAnime";
import { useState } from "react";
import MoviesAnime from "./components/layout/MoviesAnime";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { searchAnime, isLoading } = UseSearchAnime(search);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div>
      <div>
        <Navbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          handleChange={handleChange}
          search={search}
          searchAnime={searchAnime}
          isLoading={isLoading}
        ></Navbar>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/detail/:animeId" element={<DetailAnimePage />}></Route>
        <Route path="/streaming/:episodeId" element={<StreamingPage />}></Route>
        <Route path="/batch/:batchId" element={<DownloadPages />}></Route>
        <Route path="/anime" element={<CompletedAnime />}></Route>
        <Route path="/movies" element={<MoviesAnime />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
