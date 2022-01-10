import React from "react";

function index({ className }) {
  return (
    <div className=" flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white-900 ${className}`}
      ></div>
    </div>
  );
}

export default index;
