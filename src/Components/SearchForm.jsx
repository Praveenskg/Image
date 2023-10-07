import React from "react";

const SearchForm = ({ onSubmit, searchInput, categories, handleSelection }) => (
  <form className="w-full max-w-5xl mx-auto rounded-xl p-5" onSubmit={onSubmit}>
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
  </form>
);

export default SearchForm;
