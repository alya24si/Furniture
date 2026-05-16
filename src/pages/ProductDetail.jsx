import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import productData from "../data/produkData.json";
import { 
    FiArrowLeft, FiPackage, FiTag, FiDollarSign, FiBox, 
    FiStar, FiTruck, FiShield, FiRefreshCw, FiHeart,
    FiShare2, FiPrinter, FiEdit2, FiZoomIn
} from "react-icons/fi";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const foundProduct = productData.find(p => p.id === Number(id));

        if (foundProduct) {
            setProduct(foundProduct);
            const related = productData.filter(
                p => p.category === foundProduct.category && p.id !== Number(id)
            );
            setRelatedProducts(related);
        }

        const timer = setTimeout(() => setLoading(false), 400);
        return () => clearTimeout(timer);
    }, [id]);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(number);
    };

    // Placeholder gradient berdasarkan kategori
    const getCategoryGradient = (category) => {
        const gradients = {
            'Living Room': 'from-blue-400 via-indigo-500 to-purple-600',
            'Bedroom': 'from-pink-400 via-rose-500 to-red-600',
            'Kitchen': 'from-orange-400 via-amber-500 to-yellow-600',
            'Office': 'from-emerald-400 via-teal-500 to-cyan-600',
            'Dining Room': 'from-violet-400 via-purple-500 to-fuchsia-600',
            'Outdoor': 'from-lime-400 via-green-500 to-emerald-600',
        };
        return gradients[category] || 'from-gray-400 via-slate-500 to-gray-600';
    };

    // Emoji berdasarkan kategori
    const getCategoryEmoji = (category) => {
        const emojis = {
            'Living Room': '🛋️',
            'Bedroom': '🛏️',
            'Kitchen': '🍳',
            'Office': '🖥️',
            'Dining Room': '🍽️',
            'Outdoor': '🌿',
        };
        return emojis[category] || '📦';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium animate-pulse">Memuat detail produk...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md border border-gray-100">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiPackage className="text-3xl text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h2>
                    <p className="text-gray-500 mb-6">ID produk tidak tersedia dalam database.</p>
                    <button 
                        onClick={() => navigate(-1)}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
                    >
                        ← Kembali
                    </button>
                </div>
            </div>
        );
    }

    const getStockInfo = (stock) => {
        if (stock === 0) return { label: "Habis", color: "bg-red-500", text: "text-white" };
        if (stock < 10) return { label: "Stok Menipis", color: "bg-orange-400", text: "text-white" };
        return { label: "Tersedia", color: "bg-emerald-500", text: "text-white" };
    };
    const stockInfo = getStockInfo(product.stock);

    // Generate thumbnail images (main + 3 variations)
    const productImages = [
        product.image,
        `${product.image}?random=1`,
        `${product.image}?random=2`,
        `${product.image}?random=3`
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            
            {/* HEADER NAVIGASI */}
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                        >
                            <FiArrowLeft size={20} />
                        </button>
                        <nav className="text-sm text-gray-500 hidden sm:flex items-center">
                            <Link to="/admin/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
                            <span className="mx-2 text-gray-300">/</span>
                            <Link to="/admin/produk" className="hover:text-indigo-600 transition-colors">Products</Link>
                            <span className="mx-2 text-gray-300">/</span>
                            <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.tittle}</span>
                        </nav>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all">
                            <FiHeart size={20} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all">
                            <FiShare2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-10">
                
                {/* KONTEN UTAMA */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    
                    {/* KOLOM KIRI: GAMBAR PRODUK */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-lg border border-gray-200 group">
                            {!imageError && product.image ? (
                                <>
                                    <img 
                                        src={productImages[selectedImage]}
                                        alt={product.tittle}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={() => setImageError(true)}
                                    />
                                    {/* Zoom Icon Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                                        <FiZoomIn className="text-white/0 group-hover:text-white/60 text-3xl transition-all opacity-0 group-hover:opacity-100" />
                                    </div>
                                </>
                            ) : (
                                /* Fallback Placeholder */
                                <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(product.category)} flex flex-col items-center justify-center text-white`}>
                                    <span className="text-8xl mb-4 drop-shadow-lg">{getCategoryEmoji(product.category)}</span>
                                    <span className="text-3xl font-bold tracking-wider drop-shadow-md">
                                        {product.tittle?.charAt(0)}
                                    </span>
                                    <span className="mt-3 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                                        {product.category}
                                    </span>
                                </div>
                            )}
                            
                            {/* Stock Badge */}
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${stockInfo.color} ${stockInfo.text}`}>
                                    {stockInfo.label}
                                </span>
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-3">
                            {productImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setSelectedImage(idx); setImageError(false); }}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                        selectedImage === idx 
                                            ? 'border-indigo-500 ring-2 ring-indigo-200' 
                                            : 'border-gray-200 hover:border-indigo-300'
                                    } ${imageError ? `bg-gradient-to-br ${getCategoryGradient(product.category)}` : 'bg-gray-100'}`}
                                >
                                    {!imageError ? (
                                        <img 
                                            src={img} 
                                            alt={`${product.tittle} - view ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.parentElement.classList.add('bg-gradient-to-br', ...getCategoryGradient(product.category).split(' '));
                                                e.target.parentElement.innerHTML = `<span class="text-white text-2xl m-auto">${getCategoryEmoji(product.category)}</span>`;
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white text-xl">
                                            {getCategoryEmoji(product.category)}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* KOLOM KANAN: DETAIL PRODUK */}
                    <div className="flex flex-col">
                        {/* Brand & Rating */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
                                <FiTag className="text-indigo-500" size={16} />
                                {product.brand}
                            </span>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar 
                                        key={i} 
                                        className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                                        size={18} 
                                    />
                                ))}
                                <span className="text-gray-500 text-sm ml-2">(128)</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight mb-3">
                            {product.tittle}
                        </h1>
                        
                        {/* Category & Code */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                                {product.category}
                            </span>
                            <span className="text-sm font-mono text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                                Code: {product.code}
                            </span>
                        </div>

                        {/* Price Card */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 mb-6">
                            <p className="text-sm text-indigo-500 font-semibold mb-2">Harga</p>
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-bold text-gray-800">
                                    {formatRupiah(product.price)}
                                </span>
                                <span className="text-lg text-gray-400 line-through">
                                    {formatRupiah(Math.round(product.price * 1.25))}
                                </span>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                                    -20%
                                </span>
                            </div>
                        </div>

                        {/* Quick Info Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs text-gray-400 uppercase font-bold mb-2">Stock Tersedia</p>
                                <p className="text-2xl font-bold text-gray-800">{product.stock} <span className="text-sm font-normal text-gray-500">unit</span></p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs text-gray-400 uppercase font-bold mb-2">Estimasi Kirim</p>
                                <p className="text-lg font-bold text-gray-800">2-4 Hari</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-800 mb-3 text-lg">Deskripsi</h3>
                            <p className="text-gray-600 leading-relaxed">
                                <strong>{product.tittle}</strong> adalah pilihan tepat untuk mempercantik {product.category.toLowerCase()} Anda. 
                                Diproduksi oleh <strong>{product.brand}</strong> dengan material berkualitas premium dan desain modern yang elegan. 
                                Produk ini telah melalui quality control ketat untuk memastikan daya tahan dan kenyamanan maksimal.
                            </p>
                            <ul className="mt-4 space-y-2 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                    Material berkualitas tinggi & ramah lingkungan
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                    Desain ergonomis untuk kenyamanan optimal
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                                    Garansi resmi {product.brand} 1 tahun
                                </li>
                            </ul>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                                <FiTruck className="text-indigo-500 text-2xl mx-auto mb-2" />
                                <p className="text-xs font-semibold text-gray-700">Gratis Ongkir</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                                <FiShield className="text-emerald-500 text-2xl mx-auto mb-2" />
                                <p className="text-xs font-semibold text-gray-700">Garansi 1 Tahun</p>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition-colors">
                                <FiRefreshCw className="text-purple-500 text-2xl mx-auto mb-2" />
                                <p className="text-xs font-semibold text-gray-700">Return 30 Hari</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-gray-100">
                            <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                                <FiBox className="text-xl" />
                                Tambah ke Order
                            </button>
                            <button className="px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                                <FiEdit2 className="text-lg" />
                                Edit
                            </button>
                        </div>
                    </div>
                </div>

                {/* PRODUK TERKAIT */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-gray-200 pt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Produk Serupa</h2>
                            <Link 
                                to={`/admin/produk?category=${encodeURIComponent(product.category)}`}
                                className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1"
                            >
                                Lihat Semua <FiArrowLeft className="rotate-180" size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.slice(0, 4).map((item) => (
                                <Link 
                                    to={`/products/${item.id}`} 
                                    key={item.id} 
                                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className={`aspect-square bg-gradient-to-br ${getCategoryGradient(item.category)} flex items-center justify-center relative overflow-hidden`}>
                                        {item.image ? (
                                            <img 
                                                src={item.image} 
                                                alt={item.tittle}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = `<span class="text-5xl text-white/90">${getCategoryEmoji(item.category)}</span>`;
                                                }}
                                            />
                                        ) : (
                                            <span className="text-5xl text-white/90">{getCategoryEmoji(item.category)}</span>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs font-bold text-indigo-500 mb-1">{item.brand}</p>
                                        <h4 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2">
                                            {item.tittle}
                                        </h4>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-gray-800">{formatRupiah(item.price)}</span>
                                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                                                item.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
                                            }`}>
                                                {item.stock} left
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}