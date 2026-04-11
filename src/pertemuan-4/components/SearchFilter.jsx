export default function SearchFilter({
    search, setSearch,
    category, setCategory,
    emergency, setEmergency
}) {
    return (
        <div className="bg-white shadow-md p-4 rounded-lg mb-5 flex flex-col md:flex-row gap-3">

            <input
                type="text"
                placeholder="🔍 Cari Rumah Sakit..."
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Semua Kategori</option>
                <option value="General">General</option>
                <option value="Private">Private</option>
                <option value="Specialist">Specialist</option>
                <option value="Government">Government</option>
                <option value="Islamic">Islamic</option>
                <option value="Maternity">Maternity</option>
                <option value="Pediatric">Pediatric</option>
            </select>

            <select
                className="border p-2 rounded focus:ring-2 focus:ring-red-400"
                value={emergency}
                onChange={(e) => setEmergency(e.target.value)}
            >
                <option value="">Semua</option>
                <option value="true">🚑 Emergency</option>
                <option value="false">❌ Non Emergency</option>
            </select>

        </div>
    );
}