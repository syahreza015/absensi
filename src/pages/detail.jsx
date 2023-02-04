import React, { useEffect, useState } from "react";
import "../index.css";
import "../output.css";

import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const DetailAbsensi = () => {
  const instance = axios.create({ withCredentials: true });
  const parameter = useParams();
  const id = parameter.id;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const location = useLocation();
  const params = useParams();
  const querySearch = new URLSearchParams(location.search);
  const tanggal = querySearch.get("tanggal");
  const bulan = querySearch.get("bulan");
  const tahun = querySearch.get("tahun");

  useEffect(() => {
    const id = params.id;

    const getData = async () => {
      setLoading(true);
      try {
        const detailKehadiran = await instance.get(
          `http://localhost:8000/getAttendancePrecise/${id}`,
          {
            params: {
              tanggal: tanggal,
              bulan: bulan,
              tahun: tahun,
            },
          }
        );
        setData(detailKehadiran.data);
        console.log(detailKehadiran);
      } catch (err) {
        const error = err.message;
        console.error(err);
        console.log(`${tanggal}, ${bulan}, ${tahun}`);
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

  if (data.length > 0) {
    return data.map((dt) => {
      const namaBulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      return (
        <main
          key={`${dt.id}-${dt.tanggal}-${dt.bulan}-${dt.tahun}`}
          className="w-full overflow-x-scroll overflow-y-scroll flex flex-col gap-5 px-7 py-3 bg-blue-300"
        >
          <section className="w-full flex flex-col justify-center align-center gap-7 animateMount">
            <div className="title-container flex flex-col justify-center align-center rounded-sm gap2 font-semibold uppercase bg-white w-full p-3 text-center">
              <div className="container-dalam flex flex-col justify-center align-center bg-slate-300 p-1 w-3/4 rounded-sm uppercase">
                <span>Detail Absensi {dt.nama_anggota} </span>
                <span>
                  Tanggal {dt.tanggal} {namaBulan[dt.bulan - 1]} {dt.tahun}
                </span>
              </div>
            </div>
            <div className="data-container bg-white rounded-sm p-2 w-full">
              <span className="detail absen flex flex-col uppercase text-center bg-blue-500 p-2 font-semibold text-white">
                <span>absen pagi</span>
                <span>
                  {dt.jam}:{dt.menit}
                </span>
              </span>
              <span className="detail absen flex flex-col uppercase text-center bg-blue-500 p-2 font-semibold text-white">
                <span>absen sore</span> <span></span>
              </span>
            </div>
          </section>
        </main>
      );
    });
  } else {
    return (
      <main className="w-full overflow-x-scroll overflow-y-scroll flex flex-col gap-5 px-7 py-3 bg-blue-300">
        <section className="w-full flex flex-col justify-center align-center gap-7 animateMount">
          <div className="w-full bg-white rounded-sm p-2 font-semibold text-center">
            <h1>Tidak Ada Data</h1>
          </div>
        </section>
      </main>
    );
  }
};

export default DetailAbsensi;
