import React, { useState, useRef, useEffect } from "react";
import Img from "../img/1.jpeg";
import { FaHeart } from "react-icons/fa";
import popupSound from "../img/six.mp3";

const MainComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [userInput, setUserInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const linkRef = useRef(null);

  // Create a reference to the audio element
  const audioRef = useRef(new Audio(popupSound));

  useEffect(() => {
    // Play the sound when the component mounts
    audioRef.current.play();
  }, []);

  useEffect(() => {
    // Play the sound when showPopup becomes true
    if (showPopup) {
      audioRef.current.play();
    }
  }, [showPopup]);

  const handleGoClick = () => {
    const isSevenLetters =
      typeof inputValue === "string" && inputValue.length === 7;
    const isSumOfSeven =
      !isNaN(inputValue) &&
      inputValue.split("").reduce((acc, digit) => acc + parseInt(digit), 0) === 7;

    if (isSevenLetters || isSumOfSeven) {
      setShowPopup(true);
      setUserInput(inputValue);

      // Generate the link based on your application structure
      const currentLocation = window.location.href;
      setGeneratedLink(`${currentLocation}?input=${inputValue}`);
    } else {
      alert("Please enter number or name of 7 letters");
    }
  };

  const handleCopyClick = () => {
    const urlToCopy = window.location.href;

    // Create a temporary input element to copy the URL
    const tempInput = document.createElement("input");
    tempInput.value = urlToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert("URL copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text">
        <p className="text-2xl font-bold w-80 text-blue-500 m-4 opacity-100 text-center">
          Enter any 7 letter word or any number whose sum is 7.
        </p>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2"
          placeholder="Enter a string or an integer"
        />
        <button
          onClick={handleGoClick}
          className="text-xl bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Go
        </button>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="p-4 rounded w-full h-full bg-cover relative flex flex-col items-center justify-center text-center"
            style={{
              backgroundImage: `url(${Img})`,
            }}
          >
            {userInput && (
              <p className="text-4xl font-bold text-gray-300 mb-2">{userInput}</p>
            )}
            <div className="font-bold text-gray-300">
              <p className="text-9xl mb-2 ">Thala</p>
              <p className="text-4xl mb-4">for a reason</p>
              <p className="text-6xl mb-4 text-red-700 flex items-center justify-center">
                <FaHeart />
              </p>
              <button
                onClick={handleCopyClick}
                className="bg-blue-500 text-white px-4 py-2 rounded absolute top-0 left-0 m-4"
              >
                Copy Link
              </button>
              <input
                ref={linkRef}
                type="text"
                value={generatedLink}
                className="border p-2 mb-2 hidden"
                readOnly
              />
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded absolute top-0 right-0 m-4"
            >
              Close
            </button>
          <p className="text-white text-lg absolute bottom-14 right-50% ">Create your own Thala post and share it with MS Dhoni fans and make them create one.</p>
          </div>
        </div>
      )}
      {/* Audio element for the popup sound */}
      <audio ref={audioRef} src={popupSound}></audio>
    </div>
  );
};

export default MainComponent;
