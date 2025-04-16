import axios from "axios";
import { useEffect, useState } from "react";
import AxiosConfig from "../services/AxiosConfig";


export const useGetAnime = (page = 1) => {
  const [animeOngoing, setAnimeOngoing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAnime = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosConfig.get(`ongoing?page=${page}`);

        // console.log("data apa ini", res.data.data);
        setAnimeOngoing(res.data);
      } catch (error) {
        setIsLoading(false);
        console.error("error fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAnime();
  }, [page]);
  return { animeOngoing, isLoading };
};

export const UseDetailListAnime = (animeId) => {
  const [detailAnime, setDetailAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const listAnime = async () => {
      if (!animeId) return;
      try {
        setIsLoading(true);
        const res = await AxiosConfig.get(`anime/${animeId}`);
        // console.log("data detail", res.data);
        setDetailAnime(res.data);
      } catch (error) {
        setIsLoading(false);
        console.log("error fetch data", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    listAnime();
  }, [animeId]);
  return { detailAnime, isLoading };
};

export const UseGetAnimeCompleted = (page = 1) => {
  const [animeCompleted, setAnimeCompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const animeCompleted = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosConfig.get(`completed?page=${page}`);
        // console.log("anime complted", res.data);
        setAnimeCompleted(res.data);
      } catch (error) {
        setIsLoading(false);
        console.log("failed to fetch", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    animeCompleted();
  }, [page]);
  return { animeCompleted, isLoading };
};

export const UseWatchAnime = (episodeId) => {
  const [watchAnime, setWatchAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const watch = async () => {
      if (!episodeId) return;
      try {
        setIsLoading(true);
        const res = await AxiosConfig.get(`episode/${episodeId}`);
        console.log("data watch", res.data);
        setWatchAnime(res.data);
      } catch (error) {
        setIsLoading(false);
        console.log("error fetch data", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    watch();
  }, [episodeId]);
  return { watchAnime, isLoading };
};

export const UseWatchQualityAnime = (serverId) => {
  const [watchQuality, setWatchQuality] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!serverId) return;
    const watchQualityAnime = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosConfig.get(`server/${serverId}`);
        console.log("Response server/", serverId, ":", res.data);
        setWatchQuality(res.data.data.url || "");
      } catch (error) {
        setIsLoading(false);
        console.log("error fetch data", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    watchQualityAnime();
  }, [serverId]);
  return { watchQuality, isLoading };
};

export const UseSearchAnime = (search) => {
  const [searchAnime, setSearchAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!search) setSearchAnime([]);

    // jeda setiap 1.5 detik
    const debounce = setTimeout(() => {
      const searchAnime = async () => {
        try {
          setIsLoading(true);
          // Encode query biar aman (handle spasi, karakter khusus)
          const encodedSearch = encodeURIComponent(search);
          const res = await AxiosConfig.get(`search?q=${encodedSearch}`);
          // console.log("Search response:", res.data);
          setSearchAnime(res.data);
        } catch (error) {
          setIsLoading(false);
          console.log("error fetch data", error.message);
        } finally {
          setIsLoading(false);
        }
      };
      searchAnime();
      //clear
      return () => clearTimeout(debounce);
    }, 3000);
  }, [search]);
  return { searchAnime, isLoading };
};

//download anime
export const UseDownloadAnime = (batchId) => {
  const [download, setDownload] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const download = async () => {
      if (!batchId) return;
      try {
        setIsLoading(true);
        const res = await AxiosConfig.get(`batch/${batchId}`);
        // console.log("data batch", res.data);
        setDownload(res.data.data);
      } catch (error) {
        setIsLoading(false);
        console.log("error fetch data", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    download();
  }, [batchId]);
  return { download, isLoading };
};
