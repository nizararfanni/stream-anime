import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  UseSearchAnime,
  UseWatchAnime,
  UseWatchQualityAnime,
} from "../../hooks/useGetAnime";
import Navbar from "../fragments/home/Navbar";
import { DarkModeContext } from "../../context/DarkModeContext";

function StreamingPage() {
  // Ambil  episodeId dari URL
  const { episodeId } = useParams();
  const [currentEpisode, setCurrentEpisode] = useState(null);
  //activeepside buat ubah data episode setiap ganti epsiode di page streaming
  const [activeEpisode, setActiveEpisode] = useState(episodeId);
  const { watchAnime, isLoading } = UseWatchAnime(activeEpisode);
  //state buat quality video yg di pilij
  const [selectedQuality, setSelectedQuality] = useState(null);
  const { watchQuality, isLoading: isLoadingQuality } =
    UseWatchQualityAnime(selectedQuality);
  const { isDarkMode } = useContext(DarkModeContext);

  //handle fungsi buat pilih quality
  const handleServerChange = (serverId) => {
    setSelectedQuality(serverId);
  };

  // Reset selectedQuality tiap kali episode berganti
  useEffect(() => {
    setSelectedQuality(null);
  }, [activeEpisode]);

  // Tentukan URL yang dipakai:
  const hasCustomQuality = selectedQuality !== null;
  const videoUrl = hasCustomQuality
    ? watchQuality
    : watchAnime?.data?.defaultStreamingUrl;

  return (
    <div
      className={`${isDarkMode ? `bg-white text-black` : `bg-gray-800 text-white`}min-h-screen `}
    >
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
                    key={watchQuality || watchAnime?.data?.defaultStreamingUrl}
                    src={videoUrl}
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
                  <h1 className="md:text-3xl font-bold text-purple-400">
                    {watchAnime.data?.title} episode :
                    {currentEpisode?.title || "Episode"}
                  </h1>
                  <div className="mt-4 flex flex-wrap">
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
