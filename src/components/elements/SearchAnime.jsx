import React from "react";
import { Link } from "react-router-dom";

const SearchAnime = ({ search, handleChange, searchAnime, isLoading }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          className="p-3 w-full rounded-md text-white bg-gray-800 border border-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search Anime..."
          onChange={handleChange}
          value={search}
        />
        <div className="absolute top-full left-0 w-full mt-2 bg-gray-900 rounded-md shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-white">Loading...</div>
          ) : search ? (
            searchAnime?.data?.animeList.length > 0 ? (
              <div className="overflow-y-scroll max-h-[350px] w-full p-2 scroll-hidden ">
                {searchAnime?.data?.animeList.map((anime, index) => (
                  <Link to={`/detail/${anime.animeId}`}
                    key={index}
                    className="flex flex-col gap-2 bg-gray-700 rounded-md p-3 transition duration-300 hover:bg-purple-600"
                  >
                    <div className="w-full flex justify-center  ">
                      <img
                        src={anime.poster}
                        alt={anime.title}
                        className="h-[200px] rounded-md object-cover shadow-md"
                      />
                    </div>
                    <p className="text-white font-bold text-sm">
                      {anime.title}
                    </p>
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-300 text-sm">{anime.status}</p>
                      <div className="flex flex-wrap gap-2">
                        {anime?.genreList?.map((genre, index) => (
                          <p key={index} className="text-sm flex">
                            {genre.title}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">
                Data not found
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchAnime;
