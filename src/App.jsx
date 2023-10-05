import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loader from "./Loader";
const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 24;

const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const categories = [
    "man",
    "women",
    "nature",
    "birds",
    "animal",
    "cat",
    "dog",
    "computer",
    "house",
  ];

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current && searchInput.current.value) {
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );

        setImages(data.results);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.warn(error);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch();
  };

  const handleSelection = (selection) => {
    if (searchInput.current) {
      searchInput.current.value = selection;
      resetSearch();
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl md:text-4xl m-1 shadow-blue-200 lg:text-5xl text-center font-bold text-dark">
            Image Search
          </h1>
          <form
            className="w-full max-w-5xl mx-auto rounded-xl p-5"
            onSubmit={handleSearch}
          >
            <div className="my-5 flex">
              <input
                required
                ref={searchInput}
                type="text"
                className="w-full rounded-md p-3 focus:border-teal-600 border-2 border-teal-400 capitalize"
                placeholder="Type something to search..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-3 px-6 rounded mx-3 hover:bg-teal-400"
              >
                Search
              </button>
            </div>
          </form>
          <div className="flex flex-wrap justify-center items-center mx-3 space-x-1 space-y-1">
            {categories.map((selection, index) => (
              <button
                key={index}
                type="submit"
                className="inline-block px-6 py-2 border-2 text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-teal-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-500"
                onClick={() => handleSelection(selection)}
              >
                {selection.charAt(0).toUpperCase() + selection.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden group cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl"
              >
                <img
                  src={image.urls.small}
                  alt={image.alt_description}
                  className="w-full h-64 object-cover transition-transform transform group-hover:scale-105 rounded-xl"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-3">
            {page > 1 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
            )}
            {page < totalPages && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default App;
