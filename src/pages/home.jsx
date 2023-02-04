import React, { useContext, useEffect } from "react";
import "../index.css";
import "../output.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const instance = axios.create({ withCredentials: true });
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const users = await instance.get("http://localhost:8000/getUser");
        setUser(users.data);
      } catch (err) {
        const error = err.message;
        if (error === "Request failed with status code 401") {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const ListAnggota = () => {
    return user.map((dt) => {
      return (
        <li
          key={dt.id}
          className="list-blue-theme flex gap-2 rounded-md py-2 px-3 relative "
        >
          <div className="flex justify-start align-center flex-grow px-2 gap-5">
            <span className="flex align-center">
              <img
                src="/logo/person.svg"
                alt="person"
                className="personImage"
              />
            </span>
            <span> {dt.nama_lengkap}</span>
          </div>
          <span
            className="w-20 bg-blue-500 rounded-md flex justify-center align-center cursor-pointer hover:bg-blue-400"
            onClick={() => {
              navigate(`/profile/${dt.id}`);
            }}
          >
            klik
          </span>
        </li>
      );
    });
  };

  return (
    <main className="w-full overflow-x-scroll overflow-y-scroll flex flex-col gap-5 px-7 py-3 bg-blue-300">
      <section className="w-full flex flex-col justify-center align-center gap-7 animateMount">
        <div className=" container w-1/2 bg-white rounded-md p-2 h-3/4">
          <div className="title w-3/ mx-auto text-center bg-blue-800 py-5 text-white rounded-md leading-relaxed font-semibold font-serif text-lg">
            <h2>DAFTAR KEHADIRAN PESERTA MAGANG</h2>
            <h2>TEKNIK INFORMATIKA UHO</h2>
          </div>
        </div>

        <div className="main-content w-full flex flex-col justify-center align-center gap-8 py-5">
          <div className="anggota w-full bg-blue-500 px-5 py-5 flex flex-col gap-5 rounded-md">
            <div className="sub-title text-center w-full">
              <div className="py-1 w-1/2 h-4/6 mx-auto px-3 bg-white rounded-md font-semibold">
                ANGGOTA
              </div>
            </div>
            <ul className="flex flex-col gap-3">
              <ListAnggota />
            </ul>
          </div>
        </div>
        <div className="watermark w-full h-4/6 mx-auto bg-white p-2 text-center rounded-md block lg:hidden">
          <h2>
            <span className="text-blue-500">BKKBN sultra</span>
          </h2>
        </div>
      </section>
    </main>
  );
};

export default Home;
