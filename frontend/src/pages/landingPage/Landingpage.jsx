import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initThreeBackground } from '../../3D_Asset/earth';
import logoImage from '../../assets/logoputih_Images/logoputih_ImgID3.png';
import { getToken } from '../../services/api';

const AvarianeLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [earthScale] = useState(2.5);
  const [airplaneScale] = useState(0.03);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = !!getToken();

  // Initialize Three.js
  useEffect(() => {
    if (!containerRef.current) return;

    const controls = initThreeBackground(
      containerRef.current,
      {},
      {
        earth: earthScale,
        cutHalf: true,
        airplane: airplaneScale,
        earthPositionY: -0.5
      }
    );

    controlsRef.current = controls;
    return controls.cleanup;
  }, []);

  // Update scale dynamically
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.updateScale({
        earth: earthScale,
        airplane: airplaneScale
      });
    }
  }, [earthScale, airplaneScale]);

  // Handle responsive
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const handleStartNow = () => {
    navigate('/search');
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      navigate('/admin/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLogoClick = () => {
    navigate('/landing');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    nav: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      padding: '1.5rem 2rem',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    logo: {
      height: '40px',
      width: 'auto',
      objectFit: 'contain',
      cursor: 'pointer',
    },
    brandName: {
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: '600',
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s',
      cursor: 'pointer',
    },
    bookButton: {
      background: '#22c55e',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s',
      fontSize: '1rem',
    },
    menuButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '1.5rem',
      padding: '0.5rem',
    },
    mobileMenu: {
      marginTop: '1rem',
      background: 'rgba(30, 58, 138, 0.95)',
      borderRadius: '0.5rem',
      padding: '1rem',
    },
    mobileLink: {
      display: 'block',
      color: 'white',
      textDecoration: 'none',
      padding: '0.5rem 0',
      cursor: 'pointer',
    },
    heroSection: {
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
    },
    threejsContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      pointerEvents: 'none',
    },
    heroContent: {
      textAlign: 'center',
      color: 'white',
      padding: '0 1rem',
      pointerEvents: 'auto',
    },
    heroTitle: {
      fontSize: isMobile ? '2.5rem' : '4rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textShadow: '0 4px 6px rgba(0,0,0,0.3)',
    },
    heroSubtitle: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textShadow: '0 4px 6px rgba(0,0,0,0.3)',
    },
    heroText: {
      fontSize: isMobile ? '1rem' : '1.25rem',
      marginBottom: '2rem',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    startButton: {
      background: 'white',
      color: '#2563eb',
      padding: '0.75rem 2rem',
      borderRadius: '9999px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
      transition: 'all 0.3s',
    },
    heroTagline: {
      position: 'absolute',
      bottom: '2rem',
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'white',
      zIndex: 10,
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      padding: '0 1rem',
      fontSize: isMobile ? '0.875rem' : '1rem',
    },
    contentSection: {
      maxWidth: '1024px',
      margin: '0 auto',
      padding: '4rem 1.5rem',
    },
    contentTitle: {
      fontSize: isMobile ? '1.75rem' : '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap',
    },
    contentText: {
      fontSize: '1.125rem',
      color: '#374151',
      lineHeight: '1.75',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    highlightBox: {
      background: '#fef3c7',
      borderLeft: '4px solid #fbbf24',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      textAlign: 'left',
    },
    highlightTitle: {
      fontWeight: 'bold',
      fontSize: '1.125rem',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.5rem',
    },
    highlightList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    highlightItem: {
      color: '#374151',
      marginBottom: '0.5rem',
    },
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logoSection}>
            <img
              src={logoImage}
              alt='Komodo Air Logo'
              style={styles.logo}
              onClick={handleLogoClick}
            />
          </div>

          <ul style={{ ...styles.navLinks, display: isMobile ? 'none' : 'flex' }}>
            <li><a href="#" style={styles.navLink}>Home</a></li>
            <li><a href="#" style={styles.navLink}>Destination</a></li>
            <li><a href="#" style={styles.navLink}>Tour Plan</a></li>
            <li><a href="#" style={styles.navLink}>About Us</a></li>
            <li><a href="#" style={styles.navLink}>Contact</a></li>
          </ul>

          <button
            style={{ ...styles.bookButton, display: isMobile ? 'none' : 'block' }}
            onClick={handleAdminClick}
            onMouseEnter={(e) => e.target.style.background = '#16a34a'}
            onMouseLeave={(e) => e.target.style.background = '#22c55e'}
          >
            {isLoggedIn ? 'Dashboard' : 'Admin'}
          </button>

          <button
            style={{ ...styles.menuButton, display: isMobile ? 'block' : 'none' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div style={styles.mobileMenu}>
            <a href="#" style={styles.mobileLink}>Home</a>
            <a href="#" style={styles.mobileLink}>Destination</a>
            <a href="#" style={styles.mobileLink}>Tour Plan</a>
            <a href="#" style={styles.mobileLink}>About Us</a>
            <a href="#" style={styles.mobileLink}>Contact</a>
            <button 
              style={{ ...styles.bookButton, width: '100%', marginTop: '0.5rem' }}
              onClick={handleAdminClick}
            >
              {isLoggedIn ? 'Dashboard' : 'Admin'}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        {/* Three.js Scene */}
        <div style={styles.threejsContainer}>
          <div
            ref={containerRef}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        {/* Hero Content Overlay */}
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Terbang Lebih Mudah</h1>
            <h2 style={styles.heroSubtitle}>Lebih Hemat</h2>
            <p style={styles.heroText}>Jelajahi Dunia Bersama Kami</p>
            <button
              style={styles.startButton}
              onClick={handleStartNow}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Start Now
            </button>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div style={styles.heroTagline}>
          <p>Dirancang untuk kecepatan, keamanan dan kenyamanan dengan mesin yang bertenaga</p>
        </div>
      </div>

      {/* Content Section */}
      <div style={styles.contentSection}>
        <h3 style={styles.contentTitle}>
          ✈️ Komodo Air – Flight Booking Landing Page ✈️
        </h3>
        <p style={styles.contentText}>
          Petualangan Anda selanjutnya dimulai di sini! Komodo Air adalah{' '}
          <strong>halaman pemesanan penerbangan yang modern dan mulus</strong>{' '}
          yang dirancang untuk perencanaan perjalanan yang mudah. Dengan antarmuka intuitif, visual bersih,
          dan gradien yang menenangkan, pengguna dapat mencari, membandingkan, dan memesan penerbangan hanya dalam beberapa klik.
        </p>

        <div style={styles.highlightBox}>
          <p style={styles.highlightTitle}>
            💡 Fitur Unggulan:
          </p>
          <ul style={styles.highlightList}>
            <li style={styles.highlightItem}>– Layout minimal & responsif</li>
            <li style={styles.highlightItem}>– Opsi pencarian dan filter yang cerdas</li>
            <li style={styles.highlightItem}>– Animasi & transisi yang halus</li>
            <li style={styles.highlightItem}>– Visualisasi pesawat 3D yang interaktif</li>
            <li style={styles.highlightItem}>– Alur pemesanan yang user-friendly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AvarianeLanding;