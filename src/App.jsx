import axios from "axios";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Loader from "./Loader";
import SearchForm from "./Components/SearchForm";
import ImageGrid from "./Components/ImageGrid";
import Popup from "./Components/PopUp";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 24;

const App = () => {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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
  const openPopup = (image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
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
          <SearchForm
            onSubmit={handleSearch}
            searchInput={searchInput}
            handleSearch={handleSearch}
            categories={categories}
            handleSelection={handleSelection}
          />
          <ImageGrid images={images} openPopup={openPopup} />
          {selectedImage && (
            <Popup
              imageUrl={selectedImage.urls.full}
              altDescription={selectedImage.alt_description}
              onClose={closePopup}
            />
          )}
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
