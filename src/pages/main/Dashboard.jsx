import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchUsers(skip);
  }, [skip]);

  const fetchUsers = (skipValue) => {
    setLoading(true);
    fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skipValue}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  };

  const handleNextPage = () => {
    if (skip + limit < total) {
      setSkip(skip + limit);
    }
  };

  const handlePrevPage = () => {
    if (skip - limit >= 0) {
      setSkip(skip - limit);
    }
  };

  return (
    <div className="flex h-screen bg-darkBg text-darkText font-sans overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-darkBorder flex items-center justify-between px-8 bg-darkBg">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-darkTextMuted" />
              <input 
                type="text" 
                placeholder="Search here..." 
                className="w-full bg-darkCard text-sm text-white placeholder-darkTextMuted rounded-lg pl-10 pr-4 py-2.5 outline-none border border-transparent focus:border-brandAccent transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-darkTextMuted hover:text-white transition-colors">
              <FiBell className="text-xl" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-darkBg"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer group">
              <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-darkCard group-hover:border-brandAccent transition-colors" />
              <FiChevronDown className="text-darkTextMuted group-hover:text-white transition-colors" />
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Registered Users</h1>
              <p className="text-sm text-darkTextMuted mt-1">Manage all your registered users from the dummyjson API.</p>
            </div>
            <button onClick={() => navigate('/')} className="bg-darkCard hover:bg-darkBorder text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors border border-darkBorder">
              View Website
            </button>
          </div>

          <div className="bg-darkCard rounded-xl border border-darkBorder overflow-hidden shadow-lg shadow-black/20">
            <div className="p-6 border-b border-darkBorder flex justify-between items-center bg-[#212431]">
              <h3 className="font-semibold text-white">User List</h3>
              <span className="text-sm text-brandAccent bg-brandAccentLight px-3 py-1 rounded-full font-medium">
                {total} Total Users
              </span>
            </div>

            {loading ? (
              <div className="p-16 flex justify-center items-center">
                <div className="w-8 h-8 border-4 border-darkBorder border-t-brandAccent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1f212e]">
                      <th className="py-4 px-6 text-xs uppercase font-semibold text-darkTextMuted tracking-wider">#</th>
                      <th className="py-4 px-6 text-xs uppercase font-semibold text-darkTextMuted tracking-wider">Name</th>
                      <th className="py-4 px-6 text-xs uppercase font-semibold text-darkTextMuted tracking-wider">Email</th>
                      <th className="py-4 px-6 text-xs uppercase font-semibold text-darkTextMuted tracking-wider">Phone</th>
                      <th className="py-4 px-6 text-xs uppercase font-semibold text-darkTextMuted tracking-wider">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-darkBorder">
                    {users.map((user, index) => (
                      <tr key={user.id} className="hover:bg-[#2c2f3d] transition-colors">
                        <td className="py-4 px-6 text-sm text-darkTextMuted font-mono">
                          {String(skip + index + 1).padStart(2, '0')}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-darkBg border border-darkBorder">
                              <img src={user.image} alt={user.firstName} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-medium text-white">{user.firstName} {user.lastName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-darkTextMuted">{user.email}</td>
                        <td className="py-4 px-6 text-sm text-darkTextMuted">{user.phone}</td>
                        <td className="py-4 px-6">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                            {user.role || 'User'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="p-6 border-t border-darkBorder flex justify-between items-center bg-[#212431]">
              <p className="text-sm text-darkTextMuted">
                Showing <span className="text-white font-medium">{skip + 1}</span> to <span className="text-white font-medium">{Math.min(skip + limit, total)}</span> of <span className="text-white font-medium">{total}</span> entries
              </p>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage} 
                  disabled={skip === 0}
                  className="px-4 py-2 text-sm font-medium text-darkTextMuted bg-darkBg border border-darkBorder rounded-lg hover:text-white hover:border-brandAccent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Prev
                </button>
                <div className="flex items-center gap-1 px-2">
                  <span className="text-sm font-medium text-white bg-brandAccent w-8 h-8 rounded-md flex items-center justify-center">
                    {Math.floor(skip / limit) + 1}
                  </span>
                  <span className="text-sm font-medium text-darkTextMuted w-8 h-8 rounded-md flex items-center justify-center">
                    / {Math.ceil(total / limit)}
                  </span>
                </div>
                <button 
                  onClick={handleNextPage} 
                  disabled={skip + limit >= total}
                  className="px-4 py-2 text-sm font-medium text-darkTextMuted bg-darkBg border border-darkBorder rounded-lg hover:text-white hover:border-brandAccent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
