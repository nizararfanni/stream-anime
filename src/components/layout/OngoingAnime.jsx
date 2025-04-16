import React, { useContext, useState } from "react";
import { useGetAnime } from "../../hooks/useGetAnime";
import HeroSection from "../fragments/home/HeroSection";
import Feature from "/src/components/fragments/home/Feature.jsx";
import { DarkModeContext } from "../../context/DarkModeContext";

const OngoingAnime = () => {
 
  const [page, setpage] = useState(1);
  const { animeOngoing, isLoading } = useGetAnime(page);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`min-h-screen ${isDarkMode ? `bg-white/70 text-black` : `bg-gray-900 text-white`}`}
    >
      {isLoading ? (
        <div className="dark:bg-gray-800 flex justify-center min-h-screen items-center text-3xl font-bold text-white">
          Loading.....
        </div>
      ) : (
        <div>
          {/* Hero Section */}
          <HeroSection
            isLoading={isLoading}
            animeOngoing={animeOngoing}
          ></HeroSection>
          {/* Features Section */}
          <Feature
            animeOngoing={animeOngoing}
            isLoading={isLoading}
            setpage={setpage}
            type={"ongoing"}
          ></Feature>
        </div>
      )}
    </div>
  );
};

export default OngoingAnime;
