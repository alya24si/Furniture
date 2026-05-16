import { FiGrid, FiUser, FiBarChart2, FiShoppingCart, FiBox, FiTrendingUp, FiMessageSquare, FiSettings, FiStar, FiClock, FiLogOut } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: FiGrid, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FiUser, label: 'Profile', path: '/admin/profile' },
    { icon: FiBarChart2, label: 'Leaderboard', path: '/admin/leaderboard' },
    { icon: FiShoppingCart, label: 'Order', path: '/admin/order' },
    { icon: FiBox, label: 'Product', path: '/admin/produk' },
    { icon: FiTrendingUp, label: 'Sales Report', path: '/admin/sales' },
    { icon: FiMessageSquare, label: 'Message', path: '/admin/message' },
  ];

  const otherItems = [
    { icon: FiSettings, label: 'Settings', path: '/admin/settings' },
    { icon: FiStar, label: 'Favourite', path: '/admin/favourite' },
    { icon: FiClock, label: 'History', path: '/admin/history' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside style={styles.sidebar}>
      {/* Logo Section */}
      <div style={styles.logoSection}>
        <div style={styles.logoIcon}>
          <span style={styles.logoText}>F</span>
        </div>
        <span style={styles.logoTitle}>Furniture Admin</span>
      </div>

      {/* Menu Section */}
      <nav style={styles.nav}>
        <div style={styles.sectionTitle}>Menu</div>
        
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              ...styles.menuItem,
              ...(isActive(item.path) ? styles.menuItemActive : styles.menuItemInactive)
            }}
          >
            <item.icon style={{
              ...styles.menuIcon,
              ...(isActive(item.path) ? styles.menuIconActive : {})
            }} />
            <span style={{
              ...styles.menuLabel,
              ...(isActive(item.path) ? styles.menuLabelActive : {})
            }}>
              {item.label}
            </span>
          </div>
        ))}

        <div style={styles.sectionTitle}>Others</div>

        {otherItems.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              ...styles.menuItem,
              ...(isActive(item.path) ? styles.menuItemActive : styles.menuItemInactive)
            }}
          >
            <item.icon style={{
              ...styles.menuIcon,
              ...(isActive(item.path) ? styles.menuIconActive : {})
            }} />
            <span style={{
              ...styles.menuLabel,
              ...(isActive(item.path) ? styles.menuLabelActive : {})
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* Logout Section */}
      <div style={styles.logoutSection}>
        <div 
          onClick={() => navigate('/login')}
          style={styles.logoutBtn}
        >
          <FiLogOut style={styles.logoutIcon} />
          <span>Signout</span>
        </div>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '260px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(12px)',
    borderRight: '1px solid rgba(203, 213, 225, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    boxShadow: '4px 0 24px rgba(0, 0, 0, 0.04)',
    zIndex: 50,
  },
  logoSection: {
    padding: '24px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid rgba(203, 213, 225, 0.4)',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
  },
  logoText: {
    color: 'white',
    fontSize: '18px',
    fontWeight: '700',
  },
  logoTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '0.3px',
  },
  nav: {
    flex: 1,
    padding: '20px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '12px 16px',
    marginTop: '12px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '2px',
  },
  menuItemActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    color: '#6366f1',
    fontWeight: '600',
  },
  menuItemInactive: {
    color: '#64748b',
    ':hover': {
      backgroundColor: 'rgba(241, 245, 249, 0.8)',
      color: '#1e293b',
    },
  },
  menuIcon: {
    fontSize: '18px',
    flexShrink: 0,
  },
  menuIconActive: {
    color: '#6366f1',
  },
  menuLabel: {
    fontSize: '14px',
    fontWeight: '500',
  },
  menuLabelActive: {
    color: '#6366f1',
    fontWeight: '600',
  },
  logoutSection: {
    padding: '16px',
    borderTop: '1px solid rgba(203, 213, 225, 0.4)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '10px',
    color: '#ef4444',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '500',
  },
  logoutIcon: {
    fontSize: '18px',
  },
};


export default Sidebar;