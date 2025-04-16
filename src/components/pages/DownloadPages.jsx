import React from "react";
import { UseDownloadAnime } from "../../hooks/useGetAnime";
import { useParams } from "react-router-dom";

const DownloadPages = () => {
  const { batchId } = useParams();
  const { download, isLoading } = UseDownloadAnime(batchId);

  return (
    <div className="flex justify-center w-full min-h-screen items-center bg-gradient-to-r from-[#56024d] via-[#78066c] to-[#250221]">
      <div className="w-96 px-8 py-4 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center">
        <div>
          {isLoading ? (
            <div> loading.....</div>
          ) : (
            download && (
              <div>
                <p className="text-lg font-semibold text-center mb-4">
                  {download.title}
                </p>
                <div className="w-full flex justify-center mb-4">
                  <img
                    src={download.poster}
                    alt={download.title}
                    className="rounded-md object-top w-full h-[200px] shadow-md shadow-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* detail anime */}
                  <p className="font-bold">Type:</p>
                  <p>{download.type}</p>
                  <p className="font-bold">Score:</p>
                  <p>{download.score}</p>
                  <p className="font-bold">Episodes:</p>
                  <p>{download.episodes}</p>
                  <p className="font-bold">Duration:</p>
                  <p>{download.duration}</p>
                  <p className="font-bold">Studios:</p>
                  <p>{download.studios}</p>
                  <p className="font-bold">Producers:</p>
                  <p>{download.producers}</p>
                  <p className="font-bold">Aired:</p>
                  <p>{download.aired}</p>
                  <p className="font-bold">Credit:</p>
                  <p>{download.credit}</p>
                </div>
                {/* url download */}
                <h2 className="font-bold text-center text-black p-4">
                  download Now
                </h2>
                {download?.downloadUrl?.formats.length > 0 ? (
                  <div>
                    {download?.downloadUrl?.formats.map((data, index) => (
                      <div className="flex flex-col" key={index}>
                        <p>judul : {data.title}</p>
                        <div>
                          {data?.qualities.map((qualitas, index) => (
                            <div
                              key={index}
                              className="flex flex-col justify-center border-t-2"
                            >
                              <h4>Quality : {qualitas?.title}</h4>
                              <h4>Size : {qualitas?.size}</h4>
                              {/* map url download */}
                              {qualitas?.urls.map((url, index) => (
                                <a
                                  href={url.url}
                                  key={index}
                                  className="hover:underline active:underline"
                                >
                                  url : {url.title}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadPages;
