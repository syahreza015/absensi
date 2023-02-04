import React, { useState } from "react";
import "../index.css";
import "../output.css";

const DropDown = () => {
  const data = ["Kehadiran Anak Magang", "Generate Code"];
  const [text, seTtext] = useState("pilih");

  const DropdownMenu = () => {
    return data.map((dt) => {
      return <div>{dt}</div>;
    });
  };

  return (
    <div className="dropdown-container w-full rounded-sm p-1 text-center bg-blue-">
      <div className="dropdown bg-white w-full mx-auto py-1 px-3 uppercase flex justify-between align-center">
        <span>{text}</span>
        <span className="bg-blue-800 text-white text-sm hover-slate-400 p-1 rounded-sm cursor-pointer">
          open
        </span>
      </div>
      <div className="dropdownMenu hidden">
        <DropdownMenu />
      </div>
    </div>
  );
};

export default DropDown;
