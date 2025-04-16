import React, { useState } from "react";
import HeroSection from "../fragments/home/HeroSection";
import Feature from "../fragments/home/Feature";
import { UseGetAnimeCompleted } from "../../hooks/useGetAnime";

const CompletedAnime = () => {
  const [page, setpage] = useState(1);
  const { animeCompleted, isLoading } = UseGetAnimeCompleted(page);

  // {
  //   console.log("copmleyed", animeCompleted);
  // }

  return (
    <div className="bg-gray-900 text-white">
      {isLoading ? (
        <div className="dark:bg-gray-800 flex justify-center min-h-screen items-center text-3xl font-bold text-white">
          Loading.....
        </div>
      ) : (
        <div>
          {/* Features Section */}
          <Feature
            animeOngoing={animeCompleted}
            isLoading={isLoading}
            setpage={setpage}
            type="completed"
          ></Feature>
        </div>
      )}
    </div>
  );
};

export default CompletedAnime;
