import React from "react";

function index({
  buttonText,
  children,
  loading,
  className,
  disabled,
  ...rest
}) {
  return (
    <button
      className={` min-w-fit  m-auto items-center px-3 mt-4 bg-gradient-to-tr from-indigo-600 ${
        disabled ? "cursor-not-allowed bg-gray-400" : "cursor-pointer"
      } to-purple-600 text-white py-1 rounded-md text-lg font-semibold ${className}`}
      {...rest}
    >
      <span className={`mr-2 `}>{buttonText}</span>
      {loading && children}
    </button>
  );
}

export default index;
