export default function TableAdmin({ data }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-3">

      <table className="w-full text-sm">

        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Kategori</th>
            <th className="p-2">Kota</th>
            <th className="p-2">Emergency</th>
            <th className="p-2">Harga</th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr key={item.id} className="text-center border-b hover:bg-gray-100">

              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.provider.location.city}</td>

              <td>
                {item.services.emergency ? "🚑" : "❌"}
              </td>

              <td className="text-blue-600 font-semibold">
                Rp {item.price}
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}