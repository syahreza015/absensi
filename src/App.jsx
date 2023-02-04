import "./output.css";
import { Routes, Route } from "react-router-dom";
import { history } from "./context/context";

import SideBar from "./components/sidebar";
import Home from "./pages/home";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import DetailAbsensi from "./pages/detail";
import QrGenerator from "./pages/qrCode";

function App() {
  const [hist, setHist] = useState(["/"]);

  return (
    <history.Provider value={{ hist, setHist }}>
      <div className="App">
        <div className="h-full w-full flex">
          <SideBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/detail/:id" element={<DetailAbsensi />} />
            <Route path="/codeGenerator" element={<QrGenerator />} />
          </Routes>
        </div>
      </div>
    </history.Provider>
  );
}

export default App;
