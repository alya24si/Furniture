import { Link } from 'react-router-dom';
import { FiInstagram, FiGithub, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Kolom 1 - Brand/Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Alya Deka Danisha.
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mahasiswa Sistem Informasi<br />
              Politeknik Caltex Riau<br />
              Indonesia
            </p>
          </div>
          
          {/* Kolom 2 - Menu */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition duration-300">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-blue-600 transition duration-300">
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-600 transition duration-300">
                  Tentang
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-600 transition duration-300">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Kolom 3 - Bantuan */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Bantuan</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition duration-300">
                  Pengiriman
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition duration-300">
                  Pengembalian
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition duration-300">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
          
          {/* Kolom 4 - Kontak */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <FiMapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Jl. Alam Indah No. 5, Kota Pekanbaru</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="w-5 h-5 flex-shrink-0" />
                <span>alya@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-5 h-5 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300">
                <FiInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300">
                <FiGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} <span className="font-semibold">Alya Deka Danisha</span>. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Tugas Pemrograman Lanjut
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;