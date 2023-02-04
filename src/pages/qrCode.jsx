import React, { useState } from "react";
import "../index.css";
import "../output.css";

const QrGenerator = () => {
  const [status, setStatus] = useState(false);
  return (
    <main className="w-full overflow-x-scroll overflow-y-scroll flex flex-col gap-5 px-7 py-3 bg-blue-300">
      <section className="w-full flex flex-col justify-center align-center gap-7 animateMount">
        <div className="container w-1/2 bg-white rounded-md p-2 h-3/4">
          <div className="title-container title w-3/ mx-auto text-center bg-blue-800 py-5 text-white rounded-md leading-relaxed font-semibold font-serif text-lg uppercase">
            qr code generator
          </div>
        </div>
        {status && (
          <div className="qrCode-container w-full bg-white rounded-sm text-center p-3"></div>
        )}
        <div className="button-container">
          <button
            className="px-2 py-1 bg-blue-600 hover:bg-blue-800 text-white rounded-sm"
            onClick={() => {
              setStatus(!status);
            }}
          >
            Generate Qr Code
          </button>
        </div>
      </section>
    </main>
  );
};

export default QrGenerator;
