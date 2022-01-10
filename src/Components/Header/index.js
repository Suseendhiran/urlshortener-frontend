import React from "react";
import { useLocation, useHistory } from "react-router-dom";

function Index() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const history = useHistory();
  const clearLocalItems = ["token", "userData"];

  const handleLogout = () => {
    clearLocalItems.forEach((item) => localStorage.removeItem(item));
    history.push("/");
  };

  const navDetails = [
    { path: "/dashboard", title: "Home" },
    { path: "/stats", title: "Stats" },
  ];
  return token ? (
    <div className="bg-gray-800 h-16 w-full flex flex-row items-center px-8 sticky top-0 z-50">
      {navDetails.map((nav) => {
        return (
          <nav
            className="text-white mr-12 cursor-pointer"
            onClick={() => {
              history.push(nav.path);
            }}
          >
            {nav.title}
          </nav>
        );
      })}

      <nav
        className="text-white ml-auto cursor-pointer"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </nav>
    </div>
  ) : null;
}

export default Index;
