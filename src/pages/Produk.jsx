import { useState } from "react";
import products from "../data/produkData.json";
import { Link } from "react-router-dom";
import { 
    FiPlus, FiX, FiEdit2, FiTrash2, FiChevronDown,
    FiDownload, FiMoreVertical, FiImage,
    FiAlertTriangle, FiPackage, FiTag, FiDollarSign, FiBox
} from "react-icons/fi";

export default function Produk() {
    const [dataProducts, setDataProducts] = useState(products);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    
    const [form, setForm] = useState({
        tittle: "", code: "", category: "", brand: "", price: "", stock: "", image: ""
    });

    const filteredProducts = dataProducts.filter(product => {
        const matchesSearch = product.tittle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["all", ...new Set(dataProducts.map(p => p.category))];
    const totalStock = dataProducts.reduce((acc, p) => acc + Number(p.stock), 0);
    const lowStock = dataProducts.filter(p => p.stock < 10).length;
    const totalValue = dataProducts.reduce((acc, p) => acc + (Number(p.price) * Number(p.stock)), 0);

    const getCategoryGradient = (category) => {
        const gradients = {
            'Living Room': 'from-blue-400 to-indigo-500', 'Bedroom': 'from-pink-400 to-rose-500',
            'Kitchen': 'from-orange-400 to-amber-500', 'Office': 'from-emerald-400 to-teal-500',
            'Dining Room': 'from-purple-400 to-violet-500', 'Outdoor': 'from-lime-400 to-green-500',
        };
        return gradients[category] || 'from-gray-400 to-slate-500';
    };

    const getCategoryEmoji = (category) => {
        const emojis = {
            'Living Room': '🛋️', 'Bedroom': '🛏️', 'Kitchen': '🍳',
            'Office': '🖥️', 'Dining Room': '🍽️', 'Outdoor': '🌿',
        };
        return emojis[category] || '📦';
    };

    return (
        // ✅ BACKGROUND: Clean solid color, no gradient noise
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
                
                {/* ✅ 1. HEADER: Clean typography, no container */}
                <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-gray-100">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-xs font-semibold">
                                {dataProducts.length} items
                            </span>
                        </div>
                        <nav className="text-sm text-gray-500">
                            <Link to="/admin/dashboard" className="hover:text-gray-900">Dashboard</Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 font-medium">Products</span>
                        </nav>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
                    >
                        <FiPlus size={18} />
                        <span>Add Product</span>
                    </button>
                </header>

                {/* ✅ 2. STATS: Horizontal list with dividers, NO CARDS */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 py-4">
                    <div className="border-r border-gray-100 pr-8 last:border-r-0">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Total Products</p>
                        <p className="text-3xl font-bold text-gray-900">{dataProducts.length}</p>
                        <p className="text-xs text-emerald-600 mt-1 font-medium">+12% vs last month</p>
                    </div>
                    <div className="border-r border-gray-100 pr-8 last:border-r-0">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Total Stock</p>
                        <p className="text-3xl font-bold text-gray-900">{totalStock}</p>
                        <p className="text-xs text-orange-500 mt-1 font-medium">{lowStock} low stock</p>
                    </div>
                    <div className="border-r border-gray-100 pr-8 last:border-r-0 md:border-r">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Inventory Value</p>
                        <p className="text-2xl font-bold text-gray-900">Rp {(totalValue/1000000).toFixed(1)}M</p>
                        <p className="text-xs text-emerald-600 mt-1 font-medium">+8.5% vs last month</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Categories</p>
                        <p className="text-3xl font-bold text-gray-900">{categories.length - 1}</p>
                        <p className="text-xs text-gray-400 mt-1">Active</p>
                    </div>
                </section>

                {/* ✅ 3. SEARCH & FILTER: Minimal inline bar */}
                <section className="py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-stretch">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-3 bg-transparent border-b-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-gray-900 placeholder-gray-400"
                        />
                        <div className="relative min-w-[200px]">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-200 focus:border-gray-900 focus:outline-none appearance-none text-gray-900 cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-white">
                                        {cat === "all" ? "All Categories" : cat}
                                    </option>
                                ))}
                            </select>
                            <FiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        </div>
                        <button className="inline-flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors">
                            <FiDownload size={18} />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-sm font-medium text-gray-500">{filteredProducts.length} results</span>
                        </div>
                    </div>
                </section>

                {/* ✅ 4. TABLE: Clean, border-only, no card container */}
                <section className="py-4">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="pb-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Product</th>
                                    <th className="pb-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Code</th>
                                    <th className="pb-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                                    <th className="pb-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Brand</th>
                                    <th className="pb-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                                    <th className="pb-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Stock</th>
                                    <th className="pb-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredProducts.map((p, index) => (
                                    <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 pr-4">
                                            <Link to={`/products/${p.id}`} className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                                                    {p.image ? (
                                                        <img src={p.image} alt={p.tittle} className="w-full h-full object-cover" onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.parentElement.classList.add('bg-gradient-to-br', ...getCategoryGradient(p.category).split(' '));
                                                            e.target.parentElement.innerHTML = `<span class="flex items-center justify-center w-full h-full text-white text-lg">${getCategoryEmoji(p.category)}</span>`;
                                                        }} />
                                                    ) : (
                                                        <div className={`flex items-center justify-center w-full h-full bg-gradient-to-br ${getCategoryGradient(p.category)} text-white text-lg`}>
                                                            {getCategoryEmoji(p.category)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 group-hover:text-gray-700">{p.tittle}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">{p.brand}</p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="py-4 pr-4">
                                            <span className="text-sm font-mono text-gray-600">{p.code}</span>
                                        </td>
                                        <td className="py-4 pr-4">
                                            <span className="text-sm text-gray-600">{p.category}</span>
                                        </td>
                                        <td className="py-4 pr-4">
                                            <span className="text-sm text-gray-600">{p.brand}</span>
                                        </td>
                                        <td className="py-4 pr-4">
                                            <span className="text-sm font-medium text-gray-900">Rp {Number(p.price).toLocaleString('id-ID')}</span>
                                        </td>
                                        <td className="py-4 pr-4">
                                            <span className={`text-sm font-medium ${p.stock > 10 ? 'text-emerald-600' : p.stock > 5 ? 'text-orange-500' : 'text-red-500'}`}>
                                                {p.stock}
                                            </span>
                                        </td>
                                        <td className="py-4 pl-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><FiEdit2 size={16} /></button>
                                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><FiTrash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination - Minimal */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                            Page <span className="font-medium text-gray-900">1</span> of <span className="font-medium text-gray-900">{Math.ceil(filteredProducts.length / 10)}</span>
                        </p>
                        <div className="flex gap-1">
                            <button className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 disabled:opacity-30" disabled>← Prev</button>
                            <button className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded">1</button>
                            <button className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900">2</button>
                            <button className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900">Next →</button>
                        </div>
                    </div>
                </section>
            </div>

            {/* ✅ MODAL: Still needs some styling as overlay, but kept minimal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-6 z-50">
                    <div className="bg-white w-full max-w-3xl">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Add New Product</h2>
                            <button onClick={() => setShowForm(false)} className="p-1 text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Product Name</label>
                                    <input type="text" value={form.tittle} onChange={(e) => setForm({...form, tittle: e.target.value})} className="w-full px-3 py-2 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors" placeholder="Enter name" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Product Code</label>
                                    <input type="text" value={form.code} onChange={(e) => setForm({...form, code: e.target.value})} className="w-full px-3 py-2 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors font-mono" placeholder="FRN001" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Category</label>
                                    <input type="text" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors" placeholder="Living Room" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Brand</label>
                                    <input type="text" value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} className="w-full px-3 py-2 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors" placeholder="IKEA" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Price (Rp)</label>
                                    <input type="number" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full px-3 py-2 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Stock</label>
                                    <input type="number" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} className="w-full px-3 py-2 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors" placeholder="0" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Image URL</label>
                                    <input type="url" value={form.image || ""} onChange={(e) => setForm({...form, image: e.target.value})} className="w-full px-3 py-2 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors text-sm" placeholder="https://..." />
                                </div>
                            </div>
                            <div className="flex gap-3 mt-8 pt-4 border-t border-gray-100">
                                <button onClick={() => { setDataProducts([...dataProducts, {...form, id: Date.now(), image: form.image || `https://picsum.photos/seed/${form.code}/400/400`}]); setShowForm(false); setForm({tittle:"",code:"",category:"",brand:"",price:"",stock:"",image:""}); }} className="flex-1 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors">Save</button>
                                <button onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg font-medium transition-colors">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}