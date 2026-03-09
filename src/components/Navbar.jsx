import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../config'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { path: '/', label: 'Accueil', num: '00' },
  { path: '/projects', label: 'Projets', num: '01' },
  { path: '/skills', label: 'Compétences', num: '02' },
  { path: '/journey', label: 'Parcours', num: '03' },
  { path: '/about', label: 'À propos', num: '04' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <NavLink to="/portfolio/" className={styles.logo}>
          <span className={styles.logoBracket}>&lt;</span>
          <span className={styles.logoName}>{CONFIG.name.split(' ')[0]}</span>
          <span className={styles.logoBracket}>/&gt;</span>
        </NavLink>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                <span className={styles.linkNum}>{link.num}.</span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={`mailto:${CONFIG.email}`}
          className={styles.cta}
        >
          Contact
        </a>

        {/* Burger */}
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `${styles.mobileLink} ${isActive ? styles.active : ''}`
                  }
                >
                  <span className={styles.linkNum}>{link.num}.</span>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
