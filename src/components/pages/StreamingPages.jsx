import { useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  UseSearchAnime,
  UseWatchAnime,
  UseWatchQualityAnime,
} from "../../hooks/useGetAnime";
import Navbar from "../fragments/home/Navbar";

function StreamingPage() {
  // Ambil animeId dan episodeId dari URL
  const { animeId, episodeId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  //activeepside buat ubah data episode setiap ganti epsiode di page streaming
  const [activeEpisode, setActiveEpisode] = useState(episodeId);
  const { watchAnime, isLoading } = UseWatchAnime(activeEpisode);
  //state buat quality video yg di pilij
  const [selectedQuality, setSelectedQuality] = useState(null);
  const { watchQuality, isLoading: isLoadingQuality } =
    UseWatchQualityAnime(selectedQuality);
  const [search, setSearch] = useState("");
  const { searchAnime, isLoading: searchLoading } = UseSearchAnime(search);

  {
    console.log(episodeId);
  }
  //handle fungsi buat pilih quality
  const handleServerChange = (serverId) => {
    setSelectedQuality(serverId);
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleChange={handleChange}
        search={search}
        searchAnime={searchAnime}
        isLoading={searchLoading}
      ></Navbar>

      {/* Main Content */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : watchAnime ? (
            <div className="space-y-8">
              {/* Video Player */}
              <div className="aspect-w-16 aspect-h-9">
                {isLoading || isLoadingQuality ? (
                  <p className="text-center text-white z-10 text-2xl h-[250px]">
                    Loading...
                  </p>
                ) : watchAnime?.data ? (
                  <iframe
                    src={watchQuality || watchAnime?.data?.defaultStreamingUrl}
                    title="Anime Video"
                    allow="fullscreen"
                    width="100%"
                    className="rounded-lg shadow-xl h-[250px] md:h-[500px]"
                    loading="lazy"
                  ></iframe>
                ) : (
                  <p className="text-gray-400">No video available</p>
                )}
              </div>
              {/* choose server */}
              {watchAnime?.data?.server?.qualities?.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  <h3 className="items-center font-bold">choose qualitys :</h3>
                  {watchAnime?.data?.server?.qualities.map((quality) =>
                    quality.serverList.map((server) => (
                      <button
                        key={server.serverId}
                        // ubah quality video nya berdasarkan pilihan
                        onClick={() => handleServerChange(server.serverId)}
                        className={`rounded-lg px-3 py-2 text-white ${
                          selectedQuality === server.serverId
                            ? "bg-purple-800"
                            : "bg-purple-600"
                        }`}
                      >
                        {`${quality.title}`}
                      </button>
                    ))
                  )}
                </div>
              ) : (
                <div></div>
              )}

              {/* Anime Info */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-bold text-purple-400">
                    {watchAnime.data?.title} episode :
                    {currentEpisode?.title || "Episode"}
                  </h1>
                  <div className="mt-4 text-gray-300">
                    {watchAnime.data?.genreList &&
                    watchAnime.data?.genreList?.length > 0 ? (
                      watchAnime.data?.genreList.map((genre, index) => (
                        <span key={index} className="mr-2">
                          {genre.title}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400">No genres available</p>
                    )}
                  </div>
                </div>
              </div>

              {/* next and previus episode */}
              <div className="grid grid-cols-2 gap-3 ">
                {" "}
                <button
                  className="bg-purple-500 p-3"
                  onClick={() => {
                    setActiveEpisode(watchAnime?.data?.prevEpisode?.episodeId);
                    setSelectedQuality(null);
                  }}
                >
                  {watchAnime?.data?.prevEpisode?.episodeId ||
                    "tidak ada episode"}
                </button>
                <button
                  className="bg-purple-500 p-3"
                  onClick={() => {
                    setActiveEpisode(watchAnime?.data?.nextEpisode?.episodeId);
                    setSelectedQuality(null);
                  }}
                >
                  {watchAnime?.data?.nextEpisode?.episodeId ||
                    "tidak ada episode"}
                </button>
              </div>
              {/* Episode List */}
              {/* <div>
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                  Episodes
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {watchAnime.data?.recommendedEpisodeList.map(
                    (episode, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveEpisode(episode.href);
                          setCurrentEpisode(episode);
                          //reset quality nya
                          setSelectedQuality(null);
                        }}
                        className={`p-4 rounded-lg text-center transition-colors ${
                          currentEpisode === episode.episodeId
                            ? "bg-purple-600 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {episode.title}
                      </button>
                    )
                  ) || <p className="text-gray-400">No episodes available</p>}
                </div>
              </div> */}
            </div>
          ) : (
            <p className="text-center text-gray-400">Anime not found</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            {new Date().getFullYear()} AnimeVerse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default StreamingPage;
