import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = ({ isLoading, animeOngoing }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [Typewritere,setTypewritere] = useState(true)

  //aniamtion scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % animeOngoing.data?.animeList?.length
      );
    }, 3000);
    // berhenti interval ketika komponen unmount
    return () => {
      clearInterval(interval);
    };
  }, [animeOngoing.data?.animeList?.length]);

  const handleNextImage = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex + 1) % animeOngoing.data.animeList.length
    );
  };
  const handlePrevImage = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + animeOngoing.data.animeList.length) %
        animeOngoing.data.animeList.length
    );
  };
  return (
    <section className="pt-20 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {Typewritere && (
                <Typewriter
                  words={[" watch anime and streaming without addsense"]}
                  loop={1}
                  typeSpeed={100}
                  delaySpeed={80}
                ></Typewriter>
              )}
            </h1>
            <p className=" text-lg">
              Discover thousands of anime series, movies, and manga. Join our
              community and start your journey today!
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 px-2 py-4 rounded-md font-bold ">
              Get Started
            </button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : animeOngoing.data?.animeList?.length > 0 ? (
            <div className="relative">
              {/* // Ambil poster dari item pertama */}
              <img
                src={animeOngoing.data?.animeList[activeIndex].poster}
                alt="Anime Hero"
                className="w-full rounded-lg shadow-xl h-70 lg:h-screen objek-top"
              />
              <div className="absolute right-4 top-1/2 opacity-50">
                <Button
                  onClick={handleNextImage}
                  variant="contained"
                  color="primary"
                >
                  next
                </Button>
              </div>
              <div className="absolute left-4 top-1/2 opacity-50">
                <Button
                  onClick={handlePrevImage}
                  variant="contained"
                  color="primary"
                >
                  prev
                </Button>
              </div>
            </div>
          ) : (
            <p>No anime data available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
