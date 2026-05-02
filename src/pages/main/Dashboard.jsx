import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown, FiUsers, FiTrendingUp, FiDollarSign, FiPackage } from 'react-icons/fi';
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

  // Stats data dengan warna yang lebih hidup
  const stats = [
    { icon: <FiUsers />, label: 'Total Pengguna', value: total, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.12)' },
    { icon: <FiTrendingUp />, label: 'Aktif Sekarang', value: '1,234', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
    { icon: <FiDollarSign />, label: 'Pendapatan', value: '$45.2k', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
    { icon: <FiPackage />, label: 'Pesanan', value: '342', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)' },
  ];

  return (
    <div style={styles.container}>
      <Sidebar />
      
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.searchBox}>
            <FiSearch style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Cari pengguna, pesanan, atau produk..." 
              style={styles.searchInput}
            />
          </div>

          <div style={styles.headerActions}>
            <button style={styles.notificationBtn}>
              <FiBell style={styles.icon} />
              <span style={styles.badge}></span>
            </button>
            <div style={styles.profile}>
              <img src="https://i.pravatar.cc/150?img=47" alt="Profile" style={styles.avatar} />
              <FiChevronDown style={styles.chevron} />
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main style={styles.main}>
          {/* Page Header */}
          <div style={styles.pageHeader}>
            <div>
              <h1 style={styles.pageTitle}>Dashboard Admin</h1>
              <p style={styles.pageSubtitle}>Kelola pengguna dan lihat statistik toko furniture Anda</p>
            </div>
            <button onClick={() => navigate('/')} style={styles.btnWebsite}>
              Lihat Website
            </button>
          </div>

          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} style={{...styles.statCard, borderLeft: `4px solid ${stat.color}`}}>
                <div style={{...styles.statIcon, backgroundColor: stat.bg, color: stat.color}}>
                  {stat.icon}
                </div>
                <div>
                  <p style={styles.statLabel}>{stat.label}</p>
                  <h3 style={styles.statValue}>{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Users Table */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.cardTitle}>Daftar Pengguna Terdaftar</h3>
                <p style={styles.cardSubtitle}>Kelola semua pengguna yang terdaftar dari API DummyJSON</p>
              </div>
              <span style={styles.badgeTotal}>{total} Total Pengguna</span>
            </div>

            {loading ? (
              <div style={styles.loading}>
                <div style={styles.spinner}></div>
              </div>
            ) : (
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th style={styles.th}>#</th>
                      <th style={styles.th}>Pengguna</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Telepon</th>
                      <th style={styles.th}>Role</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id} style={styles.tableRow}>
                        <td style={styles.td}>
                          <span style={styles.number}>{String(skip + index + 1).padStart(2, '0')}</span>
                        </td>
                        <td style={styles.td}>
                          <div style={styles.userInfo}>
                            <img src={user.image} alt={user.firstName} style={styles.userAvatar} />
                            <div>
                              <div style={styles.userName}>{user.firstName} {user.lastName}</div>
                              <div style={styles.userUsername}>@{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.email}>{user.email}</span>
                        </td>
                        <td style={styles.td}>
                          <span style={styles.phone}>{user.phone}</span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            backgroundColor: user.role === 'admin' ? 'rgba(139, 92, 246, 0.15)' : 
                                           user.role === 'moderator' ? 'rgba(59, 130, 246, 0.15)' : 
                                           'rgba(16, 185, 129, 0.15)',
                            color: user.role === 'admin' ? '#7c3aed' : 
                                   user.role === 'moderator' ? '#3b82f6' : '#059669'
                          }}>
                            {user.role || 'User'}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.statusBadge,
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            color: '#059669'
                          }}>
                            Aktif
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div style={styles.pagination}>
              <p style={styles.showingText}>
                Menampilkan <span style={styles.highlight}>{skip + 1}</span> sampai <span style={styles.highlight}>{Math.min(skip + limit, total)}</span> dari <span style={styles.highlight}>{total}</span> pengguna
              </p>
              
              <div style={styles.paginationButtons}>
                <button 
                  onClick={handlePrevPage} 
                  disabled={skip === 0}
                  style={{
                    ...styles.btnPage,
                    ...(skip === 0 ? styles.btnDisabled : {})
                  }}
                >
                  Sebelumnya
                </button>
                
                <div style={styles.pageInfo}>
                  <span style={styles.currentPage}>{Math.floor(skip / limit) + 1}</span>
                  <span style={styles.totalPages}>/ {Math.ceil(total / limit)}</span>
                </div>
                
                <button 
                  onClick={handleNextPage} 
                  disabled={skip + limit >= total}
                  style={{
                    ...styles.btnPage,
                    ...(skip + limit >= total ? styles.btnDisabled : {})
                  }}
                >
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    // ✅ BACKGROUND HIDUP & TERANG - Gradient vibrant dengan animasi subtle
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fce7f3 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  // ✅ Animated background blobs untuk efek "hidup"
  bgBlob1: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
    animation: 'float 20s ease-in-out infinite',
    pointerEvents: 'none',
  },
  bgBlob2: {
    position: 'absolute',
    bottom: '-10%',
    left: '-10%',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
    animation: 'float 18s ease-in-out infinite reverse',
    pointerEvents: 'none',
  },
  mainContent: {
    position: 'relative',
    zIndex: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    height: '80px',
    borderBottom: '1px solid rgba(203, 213, 225, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  },
  searchBox: {
    position: 'relative',
    flex: 1,
    maxWidth: '500px',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    fontSize: '18px',
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#f8fafc',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    padding: '12px 16px 12px 48px',
    color: '#1e293b',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  notificationBtn: {
    position: 'relative',
    background: 'none',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '10px',
    transition: 'background 0.2s ease',
  },
  icon: {
    fontSize: '20px',
  },
  badge: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '10px',
    height: '10px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    border: '2px solid white',
    boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.2)',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '10px',
    transition: 'background 0.2s ease',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  chevron: {
    color: '#64748b',
    fontSize: '16px',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: '32px',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '4px',
  },
  pageSubtitle: {
    fontSize: '14px',
    color: '#64748b',
  },
  btnWebsite: {
    backgroundColor: 'white',
    color: '#4f46e5',
    border: '2px solid #6366f1',
    padding: '10px 20px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: '1px solid rgba(203, 213, 225, 0.6)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '1px solid rgba(203, 213, 225, 0.6)',
    overflow: 'hidden',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
  },
  cardHeader: {
    padding: '24px 32px',
    borderBottom: '1px solid rgba(203, 213, 225, 0.6)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '4px',
  },
  cardSubtitle: {
    fontSize: '13px',
    color: '#64748b',
  },
  badgeTotal: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    color: '#6366f1',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
  },
  loading: {
    padding: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
  },
  th: {
    padding: '16px 24px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '1px solid rgba(203, 213, 225, 0.6)',
  },
  tableRow: {
    transition: 'background-color 0.2s ease',
  },
  td: {
    padding: '16px 24px',
    borderBottom: '1px solid rgba(203, 213, 225, 0.4)',
    fontSize: '14px',
    color: '#475569',
  },
  number: {
    fontFamily: 'monospace',
    color: '#64748b',
    fontWeight: '500',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    objectFit: 'cover',
    border: '2px solid white',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
  },
  userName: {
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '2px',
  },
  userUsername: {
    fontSize: '12px',
    color: '#64748b',
  },
  email: {
    color: '#64748b',
  },
  phone: {
    color: '#64748b',
    fontFamily: 'monospace',
  },
  badge: {
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block',
  },
  pagination: {
    padding: '20px 32px',
    borderTop: '1px solid rgba(203, 213, 225, 0.6)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  showingText: {
    fontSize: '13px',
    color: '#64748b',
  },
  highlight: {
    color: '#1e293b',
    fontWeight: '600',
  },
  paginationButtons: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  btnPage: {
    padding: '8px 16px',
    backgroundColor: 'white',
    border: '2px solid #e2e8f0',
    color: '#475569',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  pageInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  currentPage: {
    backgroundColor: '#6366f1',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
  },
  totalPages: {
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '500',
  },
};

export default Dashboard;