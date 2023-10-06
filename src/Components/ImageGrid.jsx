import React from "react";

const ImageGrid = ({ images, openPopup }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-4">
    {images.map((image, index) => (
      <div
        key={index}
        className="relative overflow-hidden group cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl"
        onClick={() => openPopup(image)}
      >
        <img
          src={image.urls.small}
          alt={image.alt_description}
          className="w-full h-64 object-cover transition-transform transform group-hover:scale-105 rounded-xl"
        />
      </div>
    ))}
  </div>
);

export default ImageGrid;
