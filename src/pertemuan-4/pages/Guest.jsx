import data from "../data/framework.json";
import { useState } from "react";
import SearchFilter from "../components/SearchFilter";
import CardItem from "../components/CardItem";

export default function Guest() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [emergency, setEmergency] = useState("");

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.category === category) &&
    (emergency === "" || item.services.emergency.toString() === emergency)
  );

  return (
    <div className="p-5 bg-gradient-to-br from-blue-50 to-white min-h-screen">

      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        🏥 Daftar Rumah Sakit
      </h1>

      <SearchFilter
        {...{ search, setSearch, category, setCategory, emergency, setEmergency }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredData.map(item => (
          <CardItem key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}