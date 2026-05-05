import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiEye,
  FiEyeOff,
  FiChrome,
  FiFacebook,
} from "react-icons/fi";

const Login = () => {
  const [dataForm, setDataForm] = useState({
    email: "",
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
      const response = await axios.post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      });

      if (response.status === 200) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
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
        
        {/* LEFT */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-100 via-purple-50 to-pink-50 p-16 items-center justify-center relative overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-200 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center">
            <svg width="400" height="450" viewBox="0 0 400 450" fill="none">
              <circle cx="140" cy="90" r="40" fill="#9333EA" />
              <path d="M140 135 C105 135 78 162 78 197 L78 322 C78 340 92 354 110 354 L170 354 C188 354 202 340 202 322 L202 197 C202 162 175 135 140 135 Z" fill="#9333EA" />
            </svg>
            <p className="text-purple-900 font-bold text-2xl mt-10 text-center">
              Secure & Easy Access
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 bg-white p-12 md:p-16">
          <div className="max-w-lg mx-auto">
            
            <div className="mb-12">
              <h1 className="text-4xl font-semibold text-gray-800 mb-3">Welcome to</h1>
              <h2 className="text-5xl font-bold text-purple-600">Furniture Alya</h2>
            </div>

            {/* Social */}
            <div className="space-y-4 mb-10">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                className="w-full h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center gap-3"
              >
                <FiChrome className="w-6 h-6 text-red-500" />
                Login with Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                className="w-full h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center gap-3"
              >
                <FiFacebook className="w-6 h-6 text-blue-600" />
                Login with Facebook
              </button>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-base text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit}>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl text-center mb-8">
                  {error}
                </div>
              )}

              {/* EMAIL */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-700 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={dataForm.email}
                  onChange={handleChange}
                  className="w-full h-14 pl-5 pr-5 bg-gray-50 border-2 border-gray-200 rounded-xl"
                  placeholder="Masukkan email..."
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-8">
                <label className="block text-base font-bold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={dataForm.password}
                    onChange={handleChange}
                    className="w-full h-14 pl-5 pr-14 bg-gray-50 border-2 border-gray-200 rounded-xl"
                    placeholder="Masukkan password..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between mb-10">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={dataForm.remember}
                    onChange={handleChange}
                  />
                  Remember me
                </label>
                <a href="/forgot-password" className="text-purple-600">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-purple-600 text-white rounded-xl"
              >
                {loading ? "Processing..." : "Login"}
              </button>

              <p className="text-center mt-8">
                Don't have an account?{" "}
                <a href="/register" className="text-purple-600">
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