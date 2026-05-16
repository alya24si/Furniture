import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, FiBell, FiChevronDown, FiUsers, FiTrendingUp, 
  FiDollarSign, FiPackage, FiShoppingCart, FiMoreHorizontal,
  FiTruck, FiBox, FiTrendingDown, FiStar
} from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [expenseFilter, setExpenseFilter] = useState('week');

  // Stats Data - Furniture Specific
  const stats = [
    { icon: <FiPackage />, label: 'Total Produk', value: '1,284', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.12)' },
    { icon: <FiShoppingCart />, label: 'Pesanan Bulan Ini', value: '342', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
    { icon: <FiDollarSign />, label: 'Pendapatan', value: 'Rp 128.5jt', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
    { icon: <FiBox />, label: 'Stok Menipis', value: '23', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
  ];

  // Sales Chart Data (Weekly)
  const chartData = [
    { day: 'Sen', value: 65 },
    { day: 'Sel', value: 80 },
    { day: 'Rab', value: 55 },
    { day: 'Kam', value: 95 },
    { day: 'Jum', value: 85 },
    { day: 'Sab', value: 100 },
    { day: 'Min', value: 75 },
  ];
  const maxValue = Math.max(...chartData.map(d => d.value));

  // Recent Orders - Furniture Specific
  const recentOrders = [
    { id: 1, product: 'Sofa Minimalis Modern', category: 'Living Room', amount: 3500000, status: 'completed', date: 'Hari ini, 14:30', customer: 'Budi Santoso' },
    { id: 2, product: 'Meja Makan Kayu Jati', category: 'Dining Room', amount: 2800000, status: 'processing', date: 'Hari ini, 11:15', customer: 'Siti Nurhaliza' },
    { id: 3, product: 'Lemari Pakaian 3 Pintu', category: 'Bedroom', amount: 4200000, status: 'pending', date: 'Hari ini, 09:45', customer: 'Ahmad Rizki' },
    { id: 4, product: 'Kursi Kerja Ergonomis', category: 'Office', amount: 1850000, status: 'completed', date: 'Kemarin', customer: 'Dewi Lestari' },
    { id: 5, product: 'Rak Buku Minimalis', category: 'Living Room', amount: 950000, status: 'completed', date: 'Kemarin', customer: 'Eko Prasetyo' },
  ];

  // Top Categories
  const topCategories = [
    { name: 'Living Room', sales: 45000000, percentage: 85, color: '#8b5cf6', icon: '🛋️' },
    { name: 'Bedroom', sales: 38000000, percentage: 72, color: '#ec4899', icon: '🛏️' },
    { name: 'Dining Room', sales: 32000000, percentage: 65, color: '#10b981', icon: '🍽️' },
    { name: 'Office', sales: 28000000, percentage: 58, color: '#3b82f6', icon: '🖥️' },
    { name: 'Kitchen', sales: 22000000, percentage: 45, color: '#f59e0b', icon: '🍳' },
  ];

  // Low Stock Products
  const lowStockProducts = [
    { name: 'Sofa Corner L-Shape', stock: 3, category: 'Living Room' },
    { name: 'Meja Kopi Marble', stock: 5, category: 'Living Room' },
    { name: 'Tempat Tidur King Size', stock: 2, category: 'Bedroom' },
    { name: 'Lemari Dapur Modular', stock: 4, category: 'Kitchen' },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return { bg: 'rgba(16, 185, 129, 0.15)', color: '#059669', text: 'Selesai' };
      case 'processing': return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', text: 'Diproses' };
      case 'pending': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#d97706', text: 'Menunggu' };
      default: return { bg: 'rgba(100, 116, 139, 0.15)', color: '#64748b', text: 'Unknown' };
    }
  };

  return (
    <div style={styles.container}>
      {/* <Sidebar /> */}
      
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.searchBox}>
            <FiSearch style={styles.searchIcon} />
            <input type="text" placeholder="Cari produk, pesanan, atau pelanggan..." style={styles.searchInput} />
          </div>
          <div style={styles.headerActions}>
            <button style={styles.notificationBtn}>
              <FiBell style={styles.icon} />
              <span style={styles.badge}>3</span>
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
              <h1 style={styles.pageTitle}>Dashboard Furniture Alya</h1>
              <p style={styles.pageSubtitle}>Kelola produk, pesanan, dan lihat statistik penjualan furniture Anda</p>
            </div>
            <button onClick={() => navigate('/')} style={styles.btnWebsite}>Lihat Toko Online</button>
          </div>

          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} style={{...styles.statCard, borderLeft: `4px solid ${stat.color}`}}>
                <div style={{...styles.statIcon, backgroundColor: stat.bg, color: stat.color}}>{stat.icon}</div>
                <div>
                  <p style={styles.statLabel}>{stat.label}</p>
                  <h3 style={styles.statValue}>{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Sales Chart & Top Categories */}
          <div style={styles.grid2Cols}>
            
            {/* Sales Chart */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.cardTitle}>Penjualan Minggu Ini</h3>
                  <p style={styles.cardSubtitle}>14 - 20 Maret 2025</p>
                </div>
                <div style={styles.filterGroup}>
                  {['week', 'month', 'year'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setExpenseFilter(filter)}
                      style={{
                        ...styles.filterBtn,
                        ...(expenseFilter === filter ? styles.filterBtnActive : {})
                      }}
                    >
                      {filter === 'week' ? 'Minggu' : filter === 'month' ? 'Bulan' : 'Tahun'}
                    </button>
                  ))}
                  <button style={styles.moreBtn}><FiMoreHorizontal /></button>
                </div>
              </div>

              <div style={styles.chartContainer}>
                {chartData.map((data, index) => (
                  <div key={index} style={styles.chartBarWrapper}>
                    <div
                      style={{
                        ...styles.chartBar,
                        height: `${(data.value / maxValue) * 100}%`,
                        backgroundColor: '#8b5cf6',
                      }}
                    />
                    <span style={styles.chartLabel}>{data.day}</span>
                  </div>
                ))}
              </div>

              <div style={styles.chartStats}>
                <div style={styles.chartStatItem}>
                  <FiTrendingUp style={{color: '#10b981', fontSize: '20px'}} />
                  <div>
                    <p style={styles.chartStatLabel}>Total Penjualan</p>
                    <h4 style={styles.chartStatValue}>Rp 45.8jt</h4>
                  </div>
                </div>
                <div style={styles.chartStatItem}>
                  <FiTrendingDown style={{color: '#ef4444', fontSize: '20px'}} />
                  <div>
                    <p style={styles.chartStatLabel}>Pesanan</p>
                    <h4 style={styles.chartStatValue}>48 Order</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Categories */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Kategori Terlaris</h3>
                <span style={styles.badgeTotal}>Top 5</span>
              </div>
              <div style={styles.categoryList}>
                {topCategories.map((cat, index) => (
                  <div key={index} style={styles.categoryItem}>
                    <div style={styles.categoryHeader}>
                      <span style={styles.categoryIcon}>{cat.icon}</span>
                      <div style={styles.categoryInfo}>
                        <h4 style={styles.categoryName}>{cat.name}</h4>
                        <p style={styles.categorySales}>{formatCurrency(cat.sales)}</p>
                      </div>
                      <span style={styles.categoryPercentage}>{cat.percentage}%</span>
                    </div>
                    <div style={styles.progressBar}>
                      <div style={{...styles.progressFill, width: `${cat.percentage}%`, backgroundColor: cat.color}} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders & Low Stock */}
          <div style={styles.grid2Cols}>
            
            {/* Recent Orders */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Pesanan Terbaru</h3>
                <button style={styles.viewAllBtn}>Lihat Semua</button>
              </div>
              <div style={styles.orderList}>
                {recentOrders.map((order) => {
                  const status = getStatusColor(order.status);
                  return (
                    <div key={order.id} style={styles.orderItem}>
                      <div style={styles.orderIcon}>
                        <FiShoppingCart />
                      </div>
                      <div style={styles.orderInfo}>
                        <h4 style={styles.orderProduct}>{order.product}</h4>
                        <p style={styles.orderCustomer}>{order.customer} • {order.category}</p>
                        <span style={styles.orderDate}>{order.date}</span>
                      </div>
                      <div style={styles.orderRight}>
                        <span style={styles.orderAmount}>{formatCurrency(order.amount)}</span>
                        <span style={{...styles.statusBadge, backgroundColor: status.bg, color: status.color}}>
                          {status.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Low Stock Alert */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Stok Menipis</h3>
                <span style={{...styles.badgeTotal, backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444'}}>
                  {lowStockProducts.length} Produk
                </span>
              </div>
              <div style={styles.lowStockList}>
                {lowStockProducts.map((product, index) => (
                  <div key={index} style={styles.lowStockItem}>
                    <div style={styles.lowStockIcon}>
                      <FiBox style={{color: '#ef4444'}} />
                    </div>
                    <div style={styles.lowStockInfo}>
                      <h4 style={styles.lowStockName}>{product.name}</h4>
                      <p style={styles.lowStockCategory}>{product.category}</p>
                    </div>
                    <div style={styles.stockBadge}>
                      <span style={styles.stockNumber}>{product.stock}</span>
                      <span style={styles.stockText}>unit</span>
                    </div>
                  </div>
                ))}
              </div>
              <button style={styles.manageStockBtn}>Kelola Stok</button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

// STYLES
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fce7f3 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  mainContent: {
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
  },
  icon: { fontSize: '20px' },
  badge: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '10px',
    height: '10px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    border: '2px solid white',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '10px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid white',
  },
  chevron: { color: '#64748b', fontSize: '16px' },
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
  grid2Cols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '24px',
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
  filterGroup: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  filterBtn: {
    padding: '6px 14px',
    backgroundColor: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#64748b',
    cursor: 'pointer',
  },
  filterBtnActive: {
    backgroundColor: '#8b5cf6',
    color: 'white',
    borderColor: '#8b5cf6',
  },
  moreBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#94a3b8',
    fontSize: '20px',
    padding: '4px',
  },
  chartContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    gap: '12px',
    padding: '40px 32px',
    height: '200px',
  },
  chartBarWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  chartBar: {
    width: '100%',
    maxWidth: '60px',
    borderRadius: '8px 8px 0 0',
    transition: 'all 0.3s ease',
  },
  chartLabel: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '500',
  },
  chartStats: {
    display: 'flex',
    gap: '32px',
    padding: '20px 32px',
    borderTop: '1px solid rgba(203, 213, 225, 0.6)',
    backgroundColor: '#f8fafc',
  },
  chartStatItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  chartStatLabel: {
    fontSize: '12px',
    color: '#64748b',
  },
  chartStatValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  categoryList: {
    padding: '24px 32px',
  },
  categoryItem: {
    marginBottom: '24px',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  categoryIcon: {
    fontSize: '24px',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '2px',
  },
  categorySales: {
    fontSize: '12px',
    color: '#64748b',
  },
  categoryPercentage: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#8b5cf6',
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.5s ease',
  },
  orderList: {
    padding: '24px 32px',
  },
  orderItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid rgba(203, 213, 225, 0.4)',
  },
  orderIcon: {
    width: '44px',
    height: '44px',
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8b5cf6',
    fontSize: '20px',
  },
  orderInfo: {
    flex: 1,
  },
  orderProduct: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '4px',
  },
  orderCustomer: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '2px',
  },
  orderDate: {
    fontSize: '11px',
    color: '#94a3b8',
  },
  orderRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
  },
  orderAmount: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600',
  },
  viewAllBtn: {
    backgroundColor: 'transparent',
    border: '2px solid #8b5cf6',
    color: '#8b5cf6',
    padding: '6px 16px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  lowStockList: {
    padding: '24px 32px',
  },
  lowStockItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '14px 0',
    borderBottom: '1px solid rgba(203, 213, 225, 0.4)',
  },
  lowStockIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowStockInfo: {
    flex: 1,
  },
  lowStockName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '2px',
  },
  lowStockCategory: {
    fontSize: '12px',
    color: '#64748b',
  },
  stockBadge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    padding: '8px 12px',
    borderRadius: '8px',
  },
  stockNumber: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#ef4444',
  },
  stockText: {
    fontSize: '10px',
    color: '#64748b',
  },
  manageStockBtn: {
    margin: '0 32px 24px',
    padding: '12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Dashboard;