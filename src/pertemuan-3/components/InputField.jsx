import { useState } from "react";

// 🔁 INPUT
function InputField({ label, name, value, onChange, error }) {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-blue-600">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full mt-1 px-4 py-2 rounded-lg 
        bg-white/70 border 
        focus:ring-2 focus:ring-blue-400 outline-none
        ${error ? "border-red-500" : "border-blue-300"}`}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

// 🔁 SELECT
function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div className="mb-4">
      <label className="text-sm font-semibold text-blue-600">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-4 py-2 rounded-lg 
        bg-white/70 border border-blue-300"
      >
        <option value="">-- Pilih --</option>
        {options.map((opt, i) => (
          <option key={i}>{opt}</option>
        ))}
      </select>

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

//////////////////////////////////////////////////
// 🔥 FORM UTAMA
//////////////////////////////////////////////////
export default function UserForm() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    umur: "",
    gender: "",
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const validate = () => {
    let err = {};

    if (!form.nama) err.nama = "Nama wajib";
    else if (/\d/.test(form.nama)) err.nama = "Tidak boleh angka";

    if (!form.email) err.email = "Email wajib";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Email tidak valid";

    if (!form.umur) err.umur = "Umur wajib";
    else if (isNaN(form.umur)) err.umur = "Harus angka";

    if (!form.gender) err.gender = "Pilih gender";
    if (!form.role) err.role = "Pilih role";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const isValid =
  form.nama &&
  form.email &&
  form.umur &&
  form.gender &&
  form.role &&
  Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 relative overflow-hidden">

      {/* GLOW */}
      <div className="absolute w-72 h-72 bg-blue-300 opacity-30 blur-3xl top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-cyan-300 opacity-30 blur-3xl bottom-10 right-10"></div>

      {/* CARD */}
      <div className="relative w-[400px] p-6 rounded-2xl 
      bg-white/70 backdrop-blur-lg border border-blue-300
      shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-4 
        text-transparent bg-clip-text 
        bg-gradient-to-r from-blue-500 to-cyan-500">
          🎮 PLAYER SETUP
        </h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Nama Player"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            error={errors.nama}
          />

          <InputField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Umur"
            name="umur"
            value={form.umur}
            onChange={handleChange}
            error={errors.umur}
          />

          <SelectField
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={["Laki-laki", "Perempuan"]}
            error={errors.gender}
          />

          {/* 🔥 ROLE (pengganti mode) */}
          <SelectField
            label="Role Game"
            name="role"
            value={form.role}
            onChange={handleChange}
            options={[
              "Tank 🛡️",
              "Mage 🔮",
              "Assassin ⚔️",
              "Marksman 🎯",
              "Support 💊"
            ]}
            error={errors.role}
          />

          {/* BUTTON */}
          {isValid && (
            <button className="w-full mt-4 py-3 rounded-xl 
            bg-gradient-to-r from-blue-500 to-cyan-500 
            text-white font-bold shadow-lg
            hover:scale-105 transition">
              🚀 START GAME
            </button>
          )}
        </form>

        {/* OUTPUT */}
        {submitted && (
          <div className="mt-4 p-4 rounded-lg 
          bg-green-100 border border-green-400 text-green-700">

            <p>✅ Data berhasil!</p>
            <p className="text-sm mt-1">
              Player <b>{form.nama}</b> memilih role{" "}
              <b>{form.role}</b> 🎮
            </p>
          </div>
        )}
      </div>
    </div>
  );
}