import React from "react";
import { createRoot } from "react-dom/client";

const Confirm = ({ message, onCancel, onConfirm }) => {
  const handleConfirm = (confirmed) => {
    if (confirmed) {
      onConfirm(true);
    } else {
      onCancel(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0  h-screen bg-black text-white
flex items-center justify-center w-screen bg-opacity-90 "
    >
      <div
        className="bg-pri h-fit pt-8 pb-16 lg:px-10 px-4 box-content  text-center w-[85%]
        rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-w-xl relative bg-white text-black"
      >
        <h1 className="text-lg  mt-4 font-semibold text-sec">{message}</h1>{" "}
        <div className="flex space-x-6 mt-8 items-center justify-center">
          <button
            onClick={() => handleConfirm(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => handleConfirm(false)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export function confirm(message) {
  return new Promise((resolve) => {
    const handleConfirm = (result) => {
      root.unmount();
      resolve(result);
    };

    const root = createRoot(document.getElementById("confirm-root"));

    const element = (
      <Confirm
        message={message}
        onCancel={() => handleConfirm(false)}
        onConfirm={(confirmed) => handleConfirm(confirmed)}
      />
    );

    root.render(element);
  });
}
