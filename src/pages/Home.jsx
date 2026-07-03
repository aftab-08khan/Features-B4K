import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8FAFC] p-6 font-sans text-zinc-800">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-10 ">
        <h2 className="text-5xl font-black tracking-tight text-slate-900">
          Badge Generator
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/modren-card"
            className="rounded-xl bg-[#0055BF] px-6 py-3.5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#003F91] hover:shadow-lg active:scale-95"
          >
            Modern Card
          </Link>

          <Link
            to="/lego-convertor"
            className="rounded-xl bg-[#0055BF] px-6 py-3.5 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#003F91] hover:shadow-lg active:scale-95"
          >
            LEGO Convertor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;