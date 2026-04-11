// import AppPertemuan4 from "./pertemuan-4/AppPertemuan4";
// import { createRoot } from "react-dom/client";
// import './tailwind.css';
// import TailwindCSS from "./TailwindCSS";

// createRoot(document.getElementById("root"))
//     .render(
//         <div>
//             <TailwindCSS /> 
//             <AppPertemuan4 />
            
//         </div>
//     )


// import { createRoot } from "react-dom/client";
// import './tailwind.css';

// createRoot(document.getElementById("root")).render(
//   <div className="min-h-screen flex items-center justify-center bg-blue-100">
//     <h1 className="text-3xl font-bold text-blue-700">
//       Halo Alya 😄 Tailwind jalan!
//     </h1>
//   </div>
// );



// import { useState } from "react";
// import Guest from "./pages/Guest";
// import Admin from "./pages/Admin";
// import './tailwind.css';
// import { createRoot } from "react-dom/client";
// import TailwindCSS from "./TailwindCSS";


import { useState } from "react";
import Guest from "./pages/Guest";
import Admin from "./pages/Admin";
import './tailwind.css';
import { createRoot } from "react-dom/client";

function AppPertemuan4() {
  const [role, setRole] = useState("guest");

  return (
    <div>
      <div className="p-4 flex gap-3 justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white">

        <button
          onClick={() => setRole("guest")}
          className="px-4 py-1 bg-white text-blue-600 rounded shadow"
        >
          Guest
        </button>

        <button
          onClick={() => setRole("admin")}
          className="px-4 py-1 bg-white text-green-600 rounded shadow"
        >
          Admin
        </button>

      </div>

      {role === "guest" ? <Guest /> : <Admin />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <AppPertemuan4 />
);