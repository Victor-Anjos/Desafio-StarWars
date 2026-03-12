import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import TitlePage from "../../Components/TitlePage";
import List from "../../Components/List";

const VehiclePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://swapi.info/api/vehicles/")
      .then((r) => r.json())
      .then((data) => setVehicles(data.map((v) => ({ name: v.name }))))
      .catch(console.error);
  }, []);

  const filtered = vehicles.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Header />
      <main className="max-w-7xl mx-auto px-6 pb-16 pt-8">
        <TitlePage text="Veículos" />
        <div className="relative max-w-md mx-auto mb-2">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={13} />
          <input
            type="text"
            placeholder="Buscar veículo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111113] border border-zinc-800 rounded-full py-3 pl-10 pr-4 text-white font-orbitron text-xs tracking-wider placeholder:text-zinc-600 focus:outline-none focus:border-[#FFE81F]/50 transition-colors duration-200"
          />
        </div>
        <List list={filtered} link="veiculos" />
      </main>
      <Footer />
    </div>
  );
};

export default VehiclePage;
