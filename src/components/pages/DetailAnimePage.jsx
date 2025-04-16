import React from "react";
import { Link, useParams } from "react-router-dom";
import { UseDetailListAnime } from "../../hooks/useGetAnime";

const DetailAnimePage = () => {
  const { animeId } = useParams();
  const { detailAnime, isLoading } = UseDetailListAnime(animeId);
  // {
  //   console.log("slug", detailAnime?.data);
  // }
  const sortedEpisodeList = detailAnime?.data?.episodeList.sort(
    (a, b) => a.title - b.title
  );

  return (
    <div className="flex justify-center items-center  ">
      <div className="w-full  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white py-3">
            Detail Anime
          </h5>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {/* detail anime */}
          {isLoading ? (
            <div className="dark:bg-gray-800 flex justify-center min-h-screen items-center text-3xl font-bold text-white">
              Loading.....
            </div>
          ) : (
            detailAnime?.data && (
              <div>
                {" "}
                <div className="flex justify-center items-center">
                  <img
                    className="rounded-lg h-70"
                    src={detailAnime?.data?.poster}
                    alt="lol"
                  />
                </div>
                <div className="grid grid-cols-2 place-items-center text-white font-semibold py-3 text-sm ">
                  <div>
                    <p className="mb-3 ">Japanese Name</p>
                    <p className="mb-3  ">Tayang Perdana</p>
                    <p className="mb-3 ">Duration</p>
                    <p className="mb-3 ">Studio</p>
                    <p className="mb-3 ">Producer</p>
                    <p className="mb-3 ">Scores</p>
                    <p className="mb-3 ">users</p>
                    <p className="mb-3 ">Status</p>
                    <p className="mb-3 ">Genre</p>
                  </div>
                  <div>
                    <p className="mb-3 text-sm">
                      {detailAnime?.data?.japanese || ""}
                    </p>
                    <p className="mb-3 ">{detailAnime?.data?.aired || ""}</p>
                    <p className="mb-3 ">{detailAnime?.data?.duration || ""}</p>
                    <p className="mb-3 ">{detailAnime?.data?.studios || ""}</p>
                    <p className="mb-3 ">
                      {detailAnime?.data?.producers || "unknown"}
                    </p>
                    <p className="mb-3 ">
                      {detailAnime?.data?.score.value || "0"}
                    </p>
                    <p className="mb-3 ">
                      {detailAnime?.data?.score.users || "0"}
                    </p>
                    <p className="mb-3 ">{detailAnime?.data?.status || ""}</p>
                    <div className="mb-3 flex gap-2">
                      {detailAnime?.data?.genreList.map((anime, index) => (
                        <p key={index}>{anime.title}</p>
                      ))}
                    </div>
                  </div>
                  {detailAnime?.data?.batchList.length > 0 ? (
                    <div>
                      {detailAnime?.data?.batchList.map((batch, index) => (
                        <Link key={index} to={`/batch/${batch.batchId}`}>
                          download batch
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center items-center font-bold text-white">
                      belum ada batch nya jir
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center text-white font-semibold">
                  <p>Synopsys</p>
                  <p>{detailAnime?.data?.synopsis?.paragraphs[0]}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 py-5  text-white font-semibold ">
                  <p>List Episodes</p>
                  <div className="w-64 h-96 overflow-y-scroll scroll-hidden">
                    {/* mapping episode */}
                    {sortedEpisodeList.map((episode) => (
                      <li
                        className="list-none hover:underline"
                        key={episode.episodeId}
                      >
                        <Link to={`/streaming/${episode.episodeId}`}>
                          Episode {episode.title}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailAnimePage;
