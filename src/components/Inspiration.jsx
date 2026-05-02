const Inspiration = () => {
  const images = [
    '/assets/images/living_room.jpg',
    '/assets/images/bedroom.png',
    '/assets/images/dining_room.png',
  ];

  return (
    <section style={styles.section}>
      <div className="container text-center">
        {/* 👇 JUDUL & SUBTITLE DIUBAH KE BAHASA INDONESIA */}
        <h2 className="section-title">Koleksi Inspirasi Desain</h2>
        <p className="section-subtitle">Temukan ide penataan ruangan modern yang sesuai dengan gaya hidup dan kebutuhan Anda</p>
        
        <div style={styles.grid}>
          {images.map((img, index) => (
            <div key={index} style={styles.imageCard}>
              {/* 👇 ALT TEXT LEBIH RELEVAN UNTUK SEO & AKSESIBILITAS */}
              <img src={img} alt={`Inspirasi desain ruangan ${index + 1}`} style={styles.image} />
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
    backgroundColor: '#E8F4F8', // ✅ Background Soft Blue ditambahkan di sini
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '40px',
  },
  imageCard: {
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.3s ease',
  }
};

export default Inspiration;