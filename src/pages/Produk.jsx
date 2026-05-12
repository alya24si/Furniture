import { useState } from "react";
import products from "../data/produkData.json";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";


export default function Produk() {

    const [dataProducts, setDataProducts] = useState(products);

    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        tittle: "",
        code: "",
        category: "",
        brand: "",
        price: "",
        stock: ""
    });

    return (
        <div className="p-1">

            <PageHeader
                title="Products"
                breadcrumb={["Dashboard", "Products"]}
            >

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all duration-300 text-white px-5 py-2.5 rounded-xl shadow-lg font-medium"
                >
                    + Add Product
                </button>

            </PageHeader>

            {/* FORM */}
            {showForm && (
                <div className="bg-white border border-gray-100 rounded-3xl shadow-lg p-6 mb-6">

                    <h2 className="text-xl font-semibold text-gray-800 mb-5">
                        Add New Product
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            placeholder="Product Title"
                            value={form.tittle}
                            className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={(e) =>
                                setForm({ ...form, tittle: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Product Code"
                            value={form.code}
                            className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={(e) =>
                                setForm({ ...form, code: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Category"
                            value={form.category}
                            className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Brand"
                            value={form.brand}
                            className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={(e) =>
                                setForm({ ...form, brand: e.target.value })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={form.price}
                            className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Stock"
                            value={form.stock}
                            className="border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            onChange={(e) =>
                                setForm({ ...form, stock: e.target.value })
                            }
                        />

                    </div>

                    {/* BUTTON */}
                    <div className="flex gap-3 mt-6">

                        <button
                            onClick={() => {
                                setDataProducts([
                                    ...dataProducts,
                                    form
                                ]);

                                setShowForm(false);

                                setForm({
                                    tittle: "",
                                    code: "",
                                    category: "",
                                    brand: "",
                                    price: "",
                                    stock: ""
                                });
                            }}
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all duration-300 text-white px-5 py-2.5 rounded-xl shadow-md"
                        >
                            Save Product
                        </button>

                        <button
                            onClick={() => setShowForm(false)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl transition-all"
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            )}

            {/* TABLE */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">

                <div className="p-5 border-b border-gray-100 flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Product List
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Manage your products inventory data easily
                        </p>
                    </div>

                    <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-medium">
                        Total : {dataProducts.length} Products
                    </div>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr className="text-gray-600 text-sm">

                                <th className="p-4 text-left font-semibold">
                                    Product
                                </th>

                                <th className="p-4 text-left font-semibold">
                                    Code
                                </th>

                                <th className="p-4 text-left font-semibold">
                                    Category
                                </th>

                                <th className="p-4 text-left font-semibold">
                                    Brand
                                </th>

                                <th className="p-4 text-left font-semibold">
                                    Price
                                </th>

                                <th className="p-4 text-left font-semibold">
                                    Stock
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {dataProducts.map((p, index) => (

                                <tr
                                    key={index}
                                    className="border-t border-gray-100 hover:bg-gray-50 transition-all duration-200"
                                >

                                    <td className="p-4 font-medium text-gray-800">
                                      <Link to={`/products/${p.id}`} className="text-emerald-400 hover:text-emerald-500"> 
                                        {p.tittle}
                                        </Link> 
                                    </td>

                                    <td className="p-4 text-gray-500">
                                        {p.code}
                                    </td>

                                    <td className="p-4">
                                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                                            {p.category}
                                        </span>
                                    </td>

                                    <td className="p-4 text-gray-700">
                                        {p.brand}
                                    </td>

                                    <td className="p-4 font-semibold text-gray-800">
                                        Rp {Number(p.price).toLocaleString()}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                p.stock > 10
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {p.stock} Stock
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}