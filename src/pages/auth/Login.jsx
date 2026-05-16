import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiEye,
  FiEyeOff,
  FiChrome,
  FiFacebook,
} from "react-icons/fi";

// ✅ IMPORT GAMBAR DARI ASSETS
import heroImage from '../../assets/hero.png';

const Login = () => {
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: dataForm.username,
        password: dataForm.password,
      });

      if (response.status === 200 && response.data.accessToken) {
        if (dataForm.remember) {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          sessionStorage.setItem("token", response.data.accessToken);
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 400) {
        setError("Username atau password salah");
      } else if (err.response?.status === 401) {
        setError("Kredensial tidak valid");
      } else {
        setError("Terjadi kesalahan, silakan coba lagi");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT - Image Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50 p-16 items-center justify-center relative overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-200 rounded-full blur-3xl opacity-50" />

          <div className="relative z-10 flex flex-col items-center">

            
            {/* ✅ GAMBAR DARI PUBLIC */}
            <img
              src="/assets/images/hero.jpg"  // ✅ Path yang benar
              alt="Furniture Alya Illustration"
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
            />

            <p className="text-purple-900/70 font-medium text-center mt-8 max-w-xs">
              Kelola toko furniture Anda dengan mudah dan aman
            </p>
          </div>
        </div>

        {/* RIGHT - Form */}
        <div className="w-full md:w-1/2 bg-white p-12 md:p-16">
          <div className="max-w-lg mx-auto">

            <div className="mb-12">
              <h1 className="text-4xl font-semibold text-gray-800 mb-3">Welcome to</h1>
              <h2 className="text-5xl font-bold text-purple-600">Furniture Alya</h2>
            </div>

            {/* Social Login */}
            <div className="space-y-4 mb-10">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                className="w-full h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <FiChrome className="w-6 h-6 text-red-500" />
                <span className="font-medium">Login with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                className="w-full h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <FiFacebook className="w-6 h-6 text-blue-600" />
                <span className="font-medium">Login with Facebook</span>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-base text-gray-400 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-center text-sm font-medium">
                  {error}
                </div>
              )}

              {/* USERNAME */}
              <div>
                <label className="block text-base font-bold text-gray-700 mb-3">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={dataForm.username}
                  onChange={handleChange}
                  className="w-full h-14 pl-5 pr-5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="emilys"
                  required
                  autoComplete="username"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-base font-bold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={dataForm.password}
                    onChange={handleChange}
                    className="w-full h-14 pl-5 pr-14 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={dataForm.remember}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-center text-gray-500">
                Don't have an account?{" "}
                <a href="/register" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Register
                </a>
              </p>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;