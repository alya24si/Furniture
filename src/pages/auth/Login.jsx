import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiPackage } from 'react-icons/fi';

const Login = () => {
  const [dataForm, setDataForm] = useState({
    email: 'emilys',
    password: 'emilyspass'
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login gagal");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.container}>
      {/* Background Pattern */}
      <div style={styles.bgPattern}></div>
      <div style={styles.bgGradient}></div>
      
      <div style={styles.content}>
        <div style={styles.card}>
          {/* Logo */}
          <div style={styles.logo}>
            <div style={styles.logoBox}>
              <FiPackage style={styles.logoIcon} />
            </div>
            <h1 style={styles.brandName}>
              FURNITURE<span style={styles.brandAccent}>ALYA</span>
            </h1>
          </div>
          
          {/* Header */}
          <div style={styles.header}>
            <h2 style={styles.title}>Admin Portal</h2>
            <p style={styles.subtitle}>Masuk untuk mengakses dashboard</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {error && <div style={styles.error}>{error}</div>}
            
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Username / Email</label>
              <div style={styles.inputGroup}>
                <FiMail style={styles.inputIcon} />
                <input
                  type="text"
                  name="email"
                  value={dataForm.email}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Masukkan username atau email"
                  required
                />
              </div>
            </div>
            
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputGroup}>
                <FiLock style={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  value={dataForm.password}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Masukkan password"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading} 
              style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
            >
              {loading ? (
                <span style={styles.loadingText}>⚡ Processing...</span>
              ) : (
                <span style={styles.buttonText}>Sign In</span>
              )}
            </button>
          </form>
          
          {/* Footer */}
          <p style={styles.footer}>© 2026 Furniture Alya. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
  },
  bgPattern: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    opacity: 0.3,
  },
  bgGradient: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #334155 0%, #475569 50%, #64748b 100%)',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '48px 40px',
    borderRadius: '24px',
    border: '1px solid rgba(102, 126, 234, 0.3)',
    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(102, 126, 234, 0.1)',
    width: '100%',
    maxWidth: '440px',
    minWidth: '320px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '14px',
    marginBottom: '40px',
  },
  logoBox: {
    width: '52px',
    height: '52px',
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(102, 126, 234, 0.3)',
  },
  logoIcon: {
    fontSize: '28px',
    color: '#667eea',
  },
  brandName: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1e293b',
    margin: 0,
    letterSpacing: '0.5px',
  },
  brandAccent: {
    color: '#667eea',
    fontWeight: '900',
  },
  header: {
    textAlign: 'center',
    marginBottom: '36px',
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '8px',
    letterSpacing: '0.3px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#475569',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
    letterSpacing: '0.3px',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 245, 249, 0.8)',
    borderRadius: '12px',
    border: '1.5px solid rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    padding: '0 16px',
  },
  inputIcon: {
    fontSize: '18px',
    color: '#667eea',
    marginRight: '12px',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    padding: '14px 0',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    outline: 'none',
    color: '#1e293b',
    width: '100%',
  },
  button: {
    marginTop: '8px',
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.35)',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  buttonText: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  loadingText: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#dc2626',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '13px',
    textAlign: 'center',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  },
  footer: {
    fontSize: '12px',
    color: '#475569',
    textAlign: 'center',
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(102, 126, 234, 0.2)',
  }
};

export default Login;