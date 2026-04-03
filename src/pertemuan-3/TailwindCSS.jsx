export default function TailwindCSS() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden
    bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 
      bg-black/30 backdrop-blur border-b border-white/10">
        <h1 className="text-xl font-bold text-cyan-300 tracking-widest">
          ⚔️ ML LOBBY
        </h1>
        <div className="flex gap-4 text-sm">
          <span>💰 1200</span>
          <span>💎 50</span>
        </div>
      </div>

      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-48 p-4 space-y-4 
        bg-black/20 backdrop-blur border-r border-white/10">
          <SideButton text="🎁 Event" />
          <SideButton text="🛒 Shop" />
          <SideButton text="🎡 Lucky Spin" />
          <SideButton text="📅 Daily Quest" />
          <SideButton text="🏅 Rank Info" />
        </div>

        {/* 🔥 MIDDLE */}
        <div className="flex-1 p-8 flex flex-col items-center">

          {/* PROFILE */}
          <div className="flex items-center gap-4 mb-6 self-start">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            <div>
              <h2 className="font-bold text-lg">Player Yaya</h2>
              <p className="text-gray-300 text-sm">Level 25 • Mythic</p>
            </div>
          </div>

          {/* 🔥 HERO SHOWCASE (ANIMASI) */}
          <div className="relative flex flex-col items-center justify-center mb-10">

            {/* GLOW */}
            <div className="absolute w-72 h-72 bg-cyan-400 opacity-20 blur-3xl animate-pulse"></div>

            {/* HERO IMAGE */}
            <img
              src="src/assets/pharsa.jpg"
              alt="hero"
              className="w-72 drop-shadow-[0_0_25px_#22d3ee]
              animate-float"
            />

            {/* TEXT */}
            <h2 className="mt-4 text-2xl font-bold text-cyan-300">
              ⚡ Choose Your Hero
            </h2>
          </div>

          {/* MENU GRID */}
          <div className="grid grid-cols-3 gap-6 w-full max-w-3xl">

            <MenuCard title="⚔️ Ranked" highlight />
            <MenuCard title="🎮 Classic" />
            <MenuCard title="🔥 Brawl" />

            <MenuCard title="👥 Team" />
            <MenuCard title="🧍 Hero" />
            <MenuCard title="🎒 Inventory" />

          </div>

          {/* 🔥 START MATCH (PINDAH KE BAWAH) */}
          <div className="mt-12">
            <button className="px-16 py-4 rounded-xl 
            bg-gradient-to-r from-cyan-500 to-blue-600 
            font-bold text-lg tracking-wide
            shadow-[0_0_25px_#0ea5e9]
            hover:scale-110 transition">
               ⚔️ START MATCH
            </button>
          </div>

        </div>

        {/* PANEL KANAN */}
        <div className="w-80 p-6 space-y-6 
        bg-black/20 backdrop-blur border-l border-white/10">

          <Panel title="🔥 Daily Mission">
            Win 3 matches and get reward 🎁
          </Panel>

          <Panel title="⚡ Event">
            Limited skin available!
          </Panel>

        </div>

      </div>
    </div>
  );
}

//////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////

function MenuCard({ title, highlight }) {
  return (
    <div className={`p-5 rounded-xl text-center cursor-pointer
    backdrop-blur border border-white/20
    transition duration-300
    ${highlight 
      ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_25px_#0ea5e9]" 
      : "bg-white/10 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
    }`}>
      <h2 className="font-bold">{title}</h2>
    </div>
  );
}

function SideButton({ text }) {
  return (
    <div className="p-3 rounded-lg text-center cursor-pointer
    bg-gradient-to-r from-purple-500 to-pink-500
    hover:scale-110 transition shadow-lg text-sm">
      {text}
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="p-4 rounded-xl 
    bg-white/10 backdrop-blur border border-white/20
    shadow-lg">
      <h2 className="text-cyan-300 font-bold mb-2">{title}</h2>
      <p className="text-gray-200 text-sm">{children}</p>
    </div>
  );
}