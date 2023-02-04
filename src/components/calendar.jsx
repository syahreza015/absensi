import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import "../output.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const parameter = useParams();
  const id = parameter.id;
  const navigate = useNavigate();
  const instance = axios.create({ withCredentials: true });

  useEffect(() => {
    const getData = async () => {
      try {
        const dataKehadiran = await instance.get(
          `http://localhost:8000/getAttendance/${id}`
        );
        console.log(dataKehadiran);
        setData(dataKehadiran.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handlePrevClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };

  const handleNextClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  };

  const renderDates = (date) => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const lastDateOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    const rows = [];
    let cells = [];
    let day = 1;

    const setBgColor = (value) => {
      if (value === "true") {
        return "bg-green-500";
      } else if (value === "false") {
        return "bg-red-500";
      } else {
        return "bg-slate-300";
      }
    };

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          cells.push(
            <td
              key={`empty-${i}-${j}`}
              className="w-cal-100-7 text-center"
            ></td>
          );
        } else if (day > lastDateOfMonth) {
          break;
        } else {
          const setDefaultData = (day, month, year) => {
            const defaultData = { name: "tes", hadir: "taktau" };
            const filteredData = data.filter((dt) => {
              return (
                dt.tanggal === day &&
                dt.bulan - 1 === month &&
                dt.tahun === year
              );
            });
            let dataFinal;
            if (filteredData.length > 0) {
              dataFinal = filteredData[0];
            } else {
              dataFinal = defaultData;
            }
            return dataFinal;
          };

          const hariYangDimaksud = setDefaultData(
            day,
            currentMonth,
            currentYear
          );

          cells.push(
            <td
              key={day}
              onClick={() => {
                navigate(
                  `/detail/${id}?tanggal=${hariYangDimaksud.tanggal}&bulan=${
                    hariYangDimaksud.bulan - 1
                  }&tahun=${hariYangDimaksud.tahun}`
                );
              }}
              className={`w-cal-100-7 cursor-pointer text-center flex justify-center align-center my-1 rounded-md ${setBgColor(
                hariYangDimaksud.hadir
              )}`}
            >
              <div>{day}</div>
            </td>
          );
          day++;
        }
      }
      rows.push(
        <tr key={i} className="flex">
          {cells}
        </tr>
      );
      cells = [];
    }
    return rows;
  };

  return (
    <div className="w-full flex flex-col gap-5 bg-blue-500 pt-3">
      <div className="flex justify-center gap-8">
        <button
          onClick={handlePrevClick}
          className="bg-slate-200 py-1 px-3 rounded-sm hover:bg-white"
        >
          Previous
        </button>
        <span className="bg-white rounded-sm flex justify-center align-center py-1 px-3">
          {date.toLocaleString("default", { month: "long" })}
          {date.getFullYear()}
        </span>
        <button
          onClick={handleNextClick}
          className="bg-slate-200 py-1 px-3 rounded-sm hover:bg-white"
        >
          Next
        </button>
      </div>
      <table className="w-full h-full mx-auto flex flex-col py-2 px-5 bg-slate-200">
        <thead>
          <tr className="flex justify-center">
            <th className="w-cal-100-7">Sun</th>
            <th className="w-cal-100-7">Mon</th>
            <th className="w-cal-100-7">Tue</th>
            <th className="w-cal-100-7">Wed</th>
            <th className="w-cal-100-7">Thu</th>
            <th className="w-cal-100-7">Fri</th>
            <th className="w-cal-100-7">Sat</th>
          </tr>
        </thead>
        <tbody>{renderDates(date)}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
