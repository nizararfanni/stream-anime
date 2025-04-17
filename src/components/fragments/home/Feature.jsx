import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DarkModeContext } from "../../../context/DarkModeContext";

const Feature = ({ isLoading, animeOngoing, setpage, type }) => {
  const handlePrevButton = () => {
    setpage((page) =>
      page === 1 ? animeOngoing.pagination.totalPages : page - 1
    );
  };
  const handleNextButton = () => {
    setpage((page) =>
      page === animeOngoing.pagination.totalPages ? 1 : page + 1
    );
  };
  //darkmode
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <div
      className={` ${
        isDarkMode ? `bg-gray-300 text-black` : `bg-gray-800 text-white`
      }`}
    >
      {" "}
      {isLoading ? (
        <p>isLoading.....</p>
      ) : animeOngoing.data?.animeList?.length > 0 ? (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <h2 className="text-3xl font-bold text-center mb-10">
              {type === "completed"
                ? "Anime Completed"
                : type === "ongoing"
                ? "Anime Ongoing"
                : "Movies Anime"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {animeOngoing.data?.animeList.map((anime, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-900 rounded-lg flex flex-col min-h-[350px] justify-between relative group"
                >
                  {/* {console.log("id", anime.animeId)} */}
                  <div>
                    <img
                      src={anime.poster}
                      alt="anime image"
                      className="w-full h-64 objek-cover rounded-md"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-purple-400">
                    {anime.title}
                  </h3>
                  <div className="flex justify-between items-center font-bold text-sm">
                    <p className="mt-2 text-gray-300">Genres</p>
                    <p className="mt-2 text-gray-300">Type</p>
                    <p className="mt-2 text-yellow-300/50">Score</p>
                  </div>

                  <div className="flex justify-between items-center font-bold text-sm mt-1">
                    <p className="mt-2 text-gray-300 truncate max-w-[50%]">
                      {anime.genreList
                        ?.map((genre) => genre.title)
                        .join(", ") || "-"}
                    </p>
                    <p className="mt-2 text-gray-300 whitespace-nowrap">
                      {anime.lastReleaseDate || anime.type || "-"}
                    </p>
                    <p className="mt-2 text-yellow-300/50 whitespace-nowrap">
                      {anime.score || "-"}
                    </p>
                  </div>
                  {/* layout  */}
                  <div className="absolute inset-0  w-full h-full bg-gradient-to-t from-gray-900 via-gray-900 to-transparent opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-sm font-bold text-white rounded-lg text-center">
                    <p> {anime.title}</p>
                    <Link
                      to={`/detail/${anime.animeId}`}
                      className="bg-purple-500 text-black font-bold py-2 px-4 rounded hover:bg-gray-600 hover:text-white transition-colors my-3"
                    >
                      Detail Anime
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <p>no anime</p>
      )}
      <p className=" flex justify-center items-center">
        {animeOngoing?.pagination?.currentPage}
      </p>
      <div className="flex justify-center items-center p-3 gap-4 ">
        <Button
          variant="contained"
          className="bg-blue-500"
          onClick={handlePrevButton}
        >
          prev
        </Button>
        <Button
          onClick={handleNextButton}
          variant="contained"
          className="font-bold py-2 px-4 rounded"
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default Feature;
