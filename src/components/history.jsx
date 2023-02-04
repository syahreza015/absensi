import React, { useCallback, useContext, useEffect, useState } from "react";
import "../index.css";
import "../output.css";
import { history } from "../context/context";
import { useNavigate, useLocation } from "react-router-dom";

const HistoryBUtton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hist, setHist } = useContext(history);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const index = hist.indexOf(location.pathname);
  //   const filteredHistory = hist.filter((dt) => index >= hist.indexOf(dt));
  //   setData([...new Set(filteredHistory)]);
  // }, [hist]);

  const HistList = () => {
    if (location.pathname !== "/") {
      return (
        <li
          onClick={() => {
            navigate(-1);
          }}
          className={`w-20 flex justify-center align-center bg-blue-600 cursor-pointer hover p-1 rounded-sm active`}
        >
          Home
        </li>
      );
    }
  };

  return (
    <div className="history w-full">
      <ul className="flex flex-wrap gap-2 text-white rounded-md text-sm bg-white p-1 w-full justify-center mx-auto">
        <HistList />
      </ul>
    </div>
  );
};

export default HistoryBUtton;
