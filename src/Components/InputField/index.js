import React from "react";
import Error from "../ErrorField";

function index({ inputType, error, touched, className, ...rest }) {
  let element;
  switch (inputType) {
    case "text":
      let showError = error && touched;

      element = (
        <>
          <input
            className={`text-md block px-3 py-2  rounded-lg w-full 
          bg-white border-2 border-gray-300 ${
            showError ? "border-red-400" : "border-gray-300"
          }  placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-500 focus:outline-none`}
            {...rest}
          />
          {showError && <Error errorText={error} />}
        </>
      );
      break;

    default:
      element = <input />;
      break;
  }
  return <div className={`mb-7 relative ${className}`}>{element}</div>;
}

export default index;
