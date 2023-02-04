import React from "react";
import "../index.css";
import "../output.css";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [alertStatus, setAlertStatus] = useState("hidden");
  const navigate = useNavigate();
  const uname = useRef(null);
  const pword = useRef(null);
  const form = useRef(null);
  const instance = axios.create({ withCredentials: true });

  const alert = () => {
    form.current.reset();
    setAlertStatus("block");
    setTimeout(() => {
      setAlertStatus("hidden");
    }, 400);
  };

  const getFormData = () => {
    const username = uname.current.value;
    const password = pword.current.value;

    const postFormData = async () => {
      try {
        const auth = await instance.post("http://localhost:8000/adminLogin", {
          username: username,
          password: password,
        });
        auth.status === 200 ? navigate("/") : alert();
      } catch (err) {
        const response = err.response.status;
        alert();
      }
    };
    postFormData();
  };
  return (
    <main className="bg-blue-300 w-full h-full overflow-x-scroll overflow-y-scroll flex flex-col justify-center align-center">
      <section className="bg-blue-500 w-90-percent mx-auto h-5/6 rounded-md flex flex-col justify-between">
        <div className="heading bg-slate-200">
          <div className="banner py-2 text-center">
            <h1 className="">
              <span className="font-bold text-xl text-blue-600">BKKBN</span>
              <span className="text-md text-blue-600">sultra</span>
            </h1>
          </div>
          <div className="container-title flex flex-col text-center">
            <span className=" text-blue-600 font-bold text-2xl mx-auto rounded-sm mb-2">
              LOGIN
            </span>
          </div>
        </div>
        <div className="form bg-white rounded-sm my-3 w-3/4 mx-auto h-full flex justify-center align-start pt-20">
          <form
            ref={form}
            onSubmit={(e) => {
              e.preventDefault();
              getFormData();
            }}
            className="flex flex-col gap-5 justify-center align-center h-1/2 align-center"
          >
            <div className="container flex flex-col justify-center gap-2">
              <div className="container flex gap-2 justify-center align-center">
                <div className="label">
                  <ul className="flex flex-col gap-2">
                    <li className=" text-center bg-blue-600 rounded-sm py-1 px-4 text-white">
                      username
                    </li>
                    <li className="w-15 bg-blue-600 rounded-sm py-1 px-4 text-white">
                      password
                    </li>
                  </ul>
                </div>
                <div className="input">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <span>
                        <input
                          ref={uname}
                          type="text"
                          name="username"
                          id="username"
                          className="bg-slate-200 py-1 px-4"
                        />
                      </span>
                    </li>
                    <li>
                      <span>
                        <input
                          ref={pword}
                          type="text"
                          name="password"
                          id="password"
                          className="bg-slate-200 py-1 px-4"
                        />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className={`alert bg-red-600 text-white w-full text-center rounded-sm p-2 ${alertStatus}`}
              >
                Login Tidak Valid!
              </div>
              <button
                type="submit"
                className="bg-blue-600 justify-self-end py-1 rounded-sm px-3 cursor-pointer hover:bg-blue-800 text-white"
              >
                login
              </button>
            </div>
          </form>
        </div>
        <div className="banner bg-slate-200 py-3 w-full flex justify-center align-center">
          <img src="/image/default.png" alt="bkkbn" className="rounded-md" />
        </div>
      </section>
    </main>
  );
};

export default Login;
