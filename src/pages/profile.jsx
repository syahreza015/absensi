import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import "../output.css";

import Calendar from "../components/calendar";
import { history } from "../context/context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const instance = axios.create({ withCredentials: true });
  const [data, setData] = useState([]);
  const parameter = useParams();
  const id = parameter.id;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const userData = await instance.get(
          `http://localhost:8000/getUser/${id}`
        );
        setData(userData.data);
      } catch (err) {
        const error = err.message;
        if (error === "Request failed with status code 401") {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const ProfileData = () => {
    return data.map((dt) => {
      return (
        <div
          className="profile flex flex-col lg:flex-row gap-5 bg-slate-200 w-full mx-auto p-4 rounded-md justify-start"
          key={dt.id}
        >
          <div className="profile-img bg-blue-500 w-auto md:w-auto mx-auto flex flex-col justify-center align-center p-2 rounded-md">
            <img src="/image/default.png" alt="image" className="flex-grow" />
          </div>
          <div className="profile-indentity flex justify-center align-center gap-20 text-white bg-blue-800 flex-grow rounded-md py-2 px-5 md:px-5 h-auto">
            <div className="indetifier container justify-center md:justify-start">
              <table className="identity-table container flex flex-col">
                <tbody className="container flex flex-col justify-center align-center w-full md:w-full mx-auto">
                  <tr className="w-full">
                    <td className="label">NAMA</td>
                    <td>{dt.nama_lengkap}</td>
                  </tr>
                  <tr className="w-full">
                    <td className="label">NIM</td>
                    <td>{dt.nim}</td>
                  </tr>
                  <tr className="w-full">
                    <td className="label">JURUSAN</td>
                    <td>{dt.jurusan}</td>
                  </tr>
                  <tr className="w-full">
                    <td className="label">KAMPUS</td>
                    <td>{dt.kampus}</td>
                  </tr>
                  <tr className="w-full">
                    <td className="label">DIVISI</td>
                    <td>{dt.divisi}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <main className="w-full flex-grow bg-blue-300 overflow-x-scroll overflow-y-scroll px-7 py-3">
      <section className="kehadiran flex flex-col gap-5 animateMount">
        <ProfileData />
        <Calendar />
      </section>
    </main>
  );
};
export default Profile;
