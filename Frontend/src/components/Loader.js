import React from "react";

const Loader = () => {
  return (
    <div className="h-full w-full absolute top-0 right-0">
      <div className="h-full w-full bg-gray-900 opacity-50 absolute top-0 right-0 loaderAnimate"></div>
      <div className="h-full w-full absolute top-0 right-0 flex justify-center items-center text-white">
        Loading...
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 ml-2"></div>
      </div>
    </div>
  );
};

export default Loader;
