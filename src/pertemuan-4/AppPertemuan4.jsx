import { useState } from "react";
import Guest from "./pages/Guest";
import Admin from "./pages/Admin";

export default function AppPertemuan4() {
  const [role, setRole] = useState("guest");

  return (
    <div>

      <div className="p-4 flex gap-3 justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white">

        <button
          onClick={() => setRole("guest")}
          className="px-4 py-1 bg-white text-blue-600 rounded shadow hover:scale-105"
        >
          Guest
        </button>

        <button
          onClick={() => setRole("admin")}
          className="px-4 py-1 bg-white text-green-600 rounded shadow hover:scale-105"
        >
          Admin
        </button>

      </div>

      {role === "guest" ? <Guest /> : <Admin />}

    </div>
  );
}