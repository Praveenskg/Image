import { AiOutlineClose } from "react-icons/ai";
import React from "react";

const Popup = ({ imageUrl, altDescription, onClose }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = altDescription || "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
      <div className="max-w-full sm:max-w-3xl max-h-full overflow-auto bg-white p-8 rounded-md">
        <div className="flex justify-end">
          <AiOutlineClose
            className="text-3xl cursor-pointer hover:text-gray-500"
            onClick={onClose}
          />
        </div>
        <img
          src={imageUrl}
          alt={altDescription}
          className="w-full h-auto rounded"
        />
        <div className="mt-4 flex justify-center">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-400"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
