import React, { useState } from "react";
import Feature from "../fragments/home/Feature";
import { UseGetAnimeMovies } from "../../hooks/useGetAnime";

const MoviesAnime = () => {
  const [page, setpage] = useState(1);
  const { animeMovies, isLoading } = UseGetAnimeMovies(page);
  return (
    <div className="bg-gray-900 text-white">
      {isLoading ? (
        <div className="dark:bg-gray-800 flex justify-center min-h-screen items-center text-3xl font-bold text-white">
          Loading.....
        </div>
      ) : (
        <div className="py-5">
          {/* Features Section */}
          <Feature
            animeOngoing={animeMovies}
            isLoading={isLoading}
            setpage={setpage}
            type="movies"
          ></Feature>
        </div>
      )}
    </div>
  );
};

export default MoviesAnime;
