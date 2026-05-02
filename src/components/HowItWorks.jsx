import { FiLock, FiBox, FiHome } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FiLock />,
      title: '1. Pesan Dengan Aman',
      description: 'Lakukan pemesanan dengan sistem pembayaran yang aman dan terpercaya.'
    },
    {
      icon: <FiBox />,
      title: '2. Dikirim Dari Gudang',
      description: 'Pesanan Anda akan segera diproses dan dikirim dari gudang kami.'
    },
    {
      icon: <FiHome />,
      title: '3. Percantik Ruangan',
      description: 'Furniture tiba dan siap mempercantik ruangan Anda.'
    }
  ];

  return (
    <section style={styles.section}>
      <div className="container text-center">
        <h2 className="section-title">Ayo Pesan!</h2>
        <p className="section-subtitle">Proses mudah dan cepat dalam 3 langkah sederhana</p>
        
        <div style={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.iconWrapper}>
                {step.icon}
              </div>
              <h3 style={styles.title}>{step.title}</h3>
              <p style={styles.description}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '80px 0',
    backgroundColor: 'var(--bg-light)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginTop: '48px',
  },
  card: {
    padding: '32px',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  iconWrapper: {
    fontSize: '48px',
    color: 'var(--primary)',
    marginBottom: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: 'var(--text-dark)',
  },
  description: {
    fontSize: '15px',
    color: 'var(--text-light)',
    lineHeight: '1.6',
  }
};

export default HowItWorks;