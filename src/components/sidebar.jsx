import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "../output.css";

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="h-full w-32 text-white hidden lg:block">
      <div className="container flex flex-col h-full bg-slate-100 justify-between pt-2">
        <div className="w-100 flex flex-col justify-start align-center gap-2">
          <div
            className="home_button bg-blue-500 px-2 py-0 rounded-sm w-5/6 text-center mx-auto cursor-pointer hover:bg-blue-600"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </div>
          <div
            className="home_button bg-blue-500 px-2 py-0 rounded-sm w-5/6 text-center mx-auto cursor-pointer hover:bg-blue-600"
            onClick={() => {
              navigate("/codeGenerator");
            }}
          >
            QR Code
          </div>
        </div>
        <div className="container h-1/2  flex flex-col justify-end align-center">
          <div className="bg-blue-500 h-1/6 w-full flex justify-center align-center text-center flex-col">
            <span className="font-bold">BKKBN</span>
            <span>sultra</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
