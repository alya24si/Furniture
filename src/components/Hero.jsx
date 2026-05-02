const Hero = () => {
  return (
    <section style={styles.hero}>
      <div className="container" style={styles.container}>
        <div style={styles.card}>
          <span style={styles.badge}>🔥 Promo Spesial</span>
          <h1 style={styles.title}>Furniture Premium <br/> Harga Terjangkau</h1>
          <p style={styles.description}>
            Gratis ongkir & garansi 3 tahun. Transformasi ruangan Anda sekarang dengan koleksi eksklusif kami.
          </p>
          <div style={styles.buttonGroup}>
            <button className="btn btn-primary" style={styles.btn}>Belanja Sekarang</button>
            <button style={styles.btnOutline}>Lihat Katalog</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    height: '80vh',
    minHeight: '600px',
    backgroundImage: `url('/assets/images/hero.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start', // 👈 Kartu di kiri
    padding: '0 5%',
  },
  card: {
    backgroundColor: 'var(--bg-card)',
    padding: '50px',
    borderRadius: '10px',
    maxWidth: '550px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#FF6B6B',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  title: {
    color: 'var(--text-dark)',
    fontSize: '46px',
    fontWeight: '700',
    lineHeight: 1.15,
    marginBottom: '16px',
  },
  description: {
    color: 'var(--text-light)',
    fontSize: '16px',
    marginBottom: '32px',
    lineHeight: 1.5,
  },
  buttonGroup: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '14px 36px',
    fontSize: '15px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor: 'var(--primary)',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
  btnOutline: {
    padding: '14px 36px',
    fontSize: '15px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor: 'transparent',
    border: '2px solid var(--primary)',
    color: 'var(--primary)',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

export default Hero;