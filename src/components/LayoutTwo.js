import React, { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditor";
import "../index.css";
import banner2 from "../assets/images/banner2.jpg";
import burger from "../assets/images/burger.jpg";
import roll from "../assets/images/roll.jpg";
import pizza from "../assets/images/pizza.jpg";

const LayoutTwo = () => {
  const initialData = {
    heroImg: banner2,
    heroContent: "This is hero content",
    footer: "This is footer content",
    features: [
      { img: burger, title: "Title 1", content: "Sample content for feature 1" },
      { img: roll, title: "Title 2", content: "Sample content for feature 2" },
      { img: pizza, title: "Title 3", content: "Sample content for feature 3" },
    ],
  };

  const [data, setData] = useState(initialData);
  const [popupData, setPopupData] = useState({ index: null, field: "", value: "" });
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("layoutTwoData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      localStorage.setItem("layoutTwoData", JSON.stringify(initialData));
    }
  }, []);

  // Update localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("layoutTwoData", JSON.stringify(data));
  }, [data]);

  const handleEditClick = (index, field, value) => {
    setPopupData({ index, field, value });
    setPopupOpen(true);
  };

  const handlePopupChange = (newValue) => {
    setPopupData((prev) => ({ ...prev, value: newValue }));
  };

  const handlePopupSubmit = () => {
    const updatedFeatures = [...data.features];
    if (popupData.field === "title") {
      updatedFeatures[popupData.index].title = popupData.value;
    } else if (popupData.field === "content") {
      updatedFeatures[popupData.index].content = popupData.value;
    }
    setData((prevData) => ({ ...prevData, features: updatedFeatures }));
    setPopupOpen(false);
  };

  return (
    <div className="layout-two-container">
      {/* Hero Section */}
      <div className="hero bg-blue-500 text-white p-10 relative">
        <img src={data.heroImg} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Hero Section with Side Content</h1>
          <RichTextEditor
            value={data.heroContent}
            onChange={(newValue) => setData((prevData) => ({ ...prevData, heroContent: newValue }))}
          />
        </div>
      </div>

      {/* Features Section */}
      <h1 className="text-4xl font-bold mb-4 text-center mt-8">Features Section</h1>
      <div className="features p-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.features.map((feature, index) => (
          <div key={index} className="feature-card bg-white shadow-md p-4 relative">
            <img src={feature.img} alt={feature.title} className="w-full h-48 object-cover mb-4" />
            <div className="edit-buttons absolute top-2 right-2 flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditClick(index, "title", feature.title)}
              >
                Edit Title
              </button>
              <button
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditClick(index, "content", feature.content)}
              >
                Edit Content
              </button>
            </div>
            <h3 className="text-xl font-semibold" dangerouslySetInnerHTML={{ __html: feature.title }}></h3>
            <p dangerouslySetInnerHTML={{ __html: feature.content }}></p>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="footer p-6 bg-gray-800 text-white text-center">
        <RichTextEditor
          value={data.footer}
          onChange={(newValue) => setData((prevData) => ({ ...prevData, footer: newValue }))}
        />
      </div>

      {/* Popup for Editing */}
      {isPopupOpen && (
        <div className="popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="popup-content bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit {popupData.field}</h2>
            <RichTextEditor value={popupData.value} onChange={handlePopupChange} />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setPopupOpen(false)}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handlePopupSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutTwo;
