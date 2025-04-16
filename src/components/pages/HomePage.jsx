import React, { useState } from "react";
import OngoingAnime from "../layout/OngoingAnime";
import CompletedAnime from "../layout/CompletedAnime";
import Footer from "../fragments/home/Footer";
import Navbar from "../fragments/home/Navbar";
import { UseSearchAnime } from "../../hooks/useGetAnime";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { searchAnime, isLoading } = UseSearchAnime(search);

  const handleChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div>
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleChange={handleChange}
        search={search}
        searchAnime={searchAnime}
        isLoading={isLoading}
      ></Navbar>
      <OngoingAnime />
      <CompletedAnime />
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
