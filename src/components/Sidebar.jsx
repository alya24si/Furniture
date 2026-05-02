import { FiGrid, FiUser, FiBarChart2, FiShoppingCart, FiBox, FiTrendingUp, FiMessageSquare, FiSettings, FiStar, FiClock, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-darkBg text-darkTextMuted border-r border-darkBorder flex flex-col h-full overflow-y-auto hidden md:flex">
      <div className="p-6 text-xl font-bold text-white flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-brandAccent flex items-center justify-center">
          <span className="text-sm">F</span>
        </div>
        Furniture Admin
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <div className="text-xs uppercase font-semibold text-gray-500 mb-4 px-4 mt-4">Menu</div>
        
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-brandAccentLight text-brandAccent font-medium cursor-pointer">
          <FiGrid className="text-lg" />
          <span>Dashboard</span>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-darkCard hover:text-white transition-colors cursor-pointer">
          <FiUser className="text-lg" />
          <span>Profile</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-darkCard hover:text-white transition-colors cursor-pointer">
          <FiBarChart2 className="text-lg" />
          <span>Leaderboard</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-darkCard hover:text-white transition-colors cursor-pointer">
          <FiShoppingCart className="text-lg" />
          <span>Order</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-darkCard hover:text-white transition-colors cursor-pointer">
          <FiBox className="text-lg" />
          <span>Product</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-darkCard hover:text-white transition-colors cursor-pointer">
          <FiTrendingUp className="text-lg" />
          <span>Sales Report</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-darkCard hover:text-white transition-colors cursor-pointer">
          <FiMessageSquare className="text-lg" />
          <span>Message</span>
        </div>

        <div className="text-xs uppercase font-semibold text-gray-500 mb-4 px-4 mt-8">Others</div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-darkCard hover:text-white transition-colors cursor-pointer">
          <FiSettings className="text-lg" />
          <span>Settings</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-darkCard hover:text-white transition-colors cursor-pointer">
          <FiStar className="text-lg" />
          <span>Favourite</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-darkCard hover:text-white transition-colors cursor-pointer">
          <FiClock className="text-lg" />
          <span>History</span>
        </div>
      </nav>

      <div className="p-4 border-t border-darkBorder">
        <div 
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer"
        >
          <FiLogOut className="text-lg" />
          <span>Signout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
