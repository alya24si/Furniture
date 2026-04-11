export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🎨 Demo Tailwind CSS
      </h1>

      {/* CARD */}
      <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden hover:scale-105 transition">

        <img
          src="https://source.unsplash.com/400x300/?hospital"
          className="w-full h-40 object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">
            Rumah Sakit Modern
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Contoh penggunaan Tailwind pada Card UI
          </p>

          <button className="mt-3 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
            Lihat Detail
          </button>
        </div>

      </div>

      {/* BUTTON SECTION */}
      <div className="mt-8 flex justify-center gap-3">

        <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
          Success
        </button>

        <button className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
          Danger
        </button>

        <button className="bg-yellow-400 text-white px-4 py-2 rounded shadow hover:bg-yellow-500">
          Warning
        </button>

      </div>

    </div>
  );
}