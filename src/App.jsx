import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 24;
const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [enlargedIndex, setEnlargedIndex] = useState(null);

  const toggleEnlarge = (index) => {
    setEnlargedIndex(enlargedIndex === index ? null : index);
  };

  useEffect(() => {
    fetchImages();
  }, [page]);
  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );

      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchImages();
  };

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
  };

  return (
    <>
      <h1 className=" text-3xl md:text-4xl   shadow-blue-200 lg:text-5xl text-center font-bold text-dark ">
        Image Search
      </h1>
      <form
        onSubmit={handleSearch}
        className="my-8 mx-8 flex space-x-2 justify-center"
      >
        <input
          required
          type="text"
          className="w-full rounded-md p-3 focus:border-teal-600 border-2 border-teal-400"
          placeholder="Type something to search..."
          ref={searchInput}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-3 px-6 rounded mx-3 hover:bg-teal-400"
        >
          Search
        </button>
      </form>
      <div className="flex flex-wrap justify-center items-center mx-3 space-x-1 space-y-1 ">
        <button
          type="submit"
          className="inline-block px-6 py-2 border-2  text-white font-medium text-xs leading-tight uppercase rounded-full  hover:bg-teal-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-500"
          onClick={() => handleSelection("nature")}
        >
          Natures
        </button>
        <button
          type="submit"
          className="inline-block px-6 py-2 border-2  text-white font-medium text-xs leading-tight uppercase rounded-full  hover:bg-teal-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-500"
          onClick={() => handleSelection("birds")}
        >
          Birds
        </button>
        <button
          type="submit"
          className="inline-block px-6 py-2 border-2  text-white font-medium text-xs leading-tight uppercase rounded-full  hover:bg-teal-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-500"
          onClick={() => handleSelection("cats")}
        >
          cats
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2 border-2  text-white font-medium text-xs leading-tight uppercase rounded-full  hover:bg-teal-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-500"
          onClick={() => handleSelection("man")}
        >
          Man
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2 border-2  text-white font-medium text-xs leading-tight uppercase rounded-full  hover:bg-teal-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out bg-blue-500"
          onClick={() => handleSelection("women")}
        >
          Women
        </button>
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
    </>
  );
};

export default App;
