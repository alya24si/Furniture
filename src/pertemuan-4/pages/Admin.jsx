import data from "../data/framework.json";
import { useState } from "react";
import SearchFilter from "../components/SearchFilter";
import TableAdmin from "../components/TableAdmin";

export default function Admin() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [emergency, setEmergency] = useState("");

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.category === category) &&
    (emergency === "" || item.services.emergency.toString() === emergency)
  );

  return (
    <div className="p-5 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-4 text-indigo-700">
        📊 Dashboard Admin Rumah Sakit
      </h1>

      <SearchFilter
        {...{ search, setSearch, category, setCategory, emergency, setEmergency }}
      />

      <TableAdmin data={filteredData} />

    </div>
  );
}