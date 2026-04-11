export default function CardItem({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img
        src={item.image}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">

        <h2 className="font-bold text-lg text-gray-800">
          {item.name}
        </h2>

        <p className="text-sm text-gray-500 mb-2">
          {item.category}
        </p>

        <div className="flex justify-between text-sm">
          <span>⭐ {item.rating}</span>
          <span className="font-semibold text-blue-600">
            Rp {item.price}
          </span>
        </div>

        <p className="text-sm mt-2 text-gray-600">
          📍 {item.provider.location.city}
        </p>

        <p className={`mt-2 text-sm font-semibold ${
          item.services.emergency
            ? "text-green-600"
            : "text-red-500"
        }`}>
          {item.services.emergency
            ? "🚑 Emergency Ready"
            : "❌ No Emergency"}
        </p>

      </div>
    </div>
  );
}