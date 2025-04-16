import React, { useContext } from "react";
import SearchAnime from "../../elements/SearchAnime";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../context/DarkModeContext";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const Navbar = ({
  isMenuOpen,
  setIsMenuOpen,
  handleChange,
  search,
  searchAnime,
  isLoading,
}) => {
  //darkmode
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <nav
      className={`fixed w-full  backdrop-blur-md z-50 text-white ${
        isDarkMode ? `bg-white/70` : `bg-gray-900/80`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-purple-400">NzNime</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div
              className={`ml-10 flex items-baseline space-x-4 ${
                isDarkMode ? `text-black` : `text-white`
              }`}
            >
              <button
                onClick={toggleDarkMode}
                className="bg-gray-700 text-white "
              >
                {isDarkMode ? <CiLight /> : <MdDarkMode />}
              </button>
              <SearchAnime
                search={search}
                handleChange={handleChange}
                searchAnime={searchAnime}
                isLoading={isLoading}
              ></SearchAnime>
              <Link
                to={`/home`}
                className="hover:text-purple-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to={`/anime`}
                className="hover:text-purple-400 transition-colors"
              >
                Anime
              </Link>
              <Link to="#" className="hover:text-purple-400 transition-colors">
                Manga
              </Link>
              <Link
                to={`/about`}
                className="hover:text-purple-400 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
          <button onClick={toggleDarkMode} className="bg-gray-700 text-white md:hidden ">
            {isDarkMode ? <CiLight /> : <MdDarkMode />}
          </button>

          {/* Mobile Menu  */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <SearchAnime
                search={search}
                handleChange={handleChange}
                searchAnime={searchAnime}
                isLoading={isLoading}
              ></SearchAnime>
              <Link
                to={`/home`}
                className="block px-3 py-2 hover:text-purple-400"
              >
                Home
              </Link>
              <Link
                to={`/anime`}
                className="block px-3 py-2 hover:text-purple-400"
              >
                Anime
              </Link>
              <Link to="#" className="block px-3 py-2 hover:text-purple-400">
                Manga
              </Link>
              <Link
                to={`/about`}
                className="block px-3 py-2 hover:text-purple-400"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
