import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { CONFIG } from '../config'
import { useGithubProfile } from '../hooks/useGithub'
import styles from './Home.module.css'

const TERMINAL_LINES = [
  { prefix: '>', text: `Bienvenue sur mon portfolio`, delay: 0.2 },
  { prefix: '$', text: `whoami`, delay: 0.8 },
  { prefix: '↪', text: CONFIG.name, delay: 1.2, highlight: true },
  { prefix: '$', text: `cat role.txt`, delay: 1.8 },
  { prefix: '↪', text: CONFIG.title, delay: 2.2, highlight: true },
  { prefix: '$', text: `echo $STATUS`, delay: 2.8 },
  { prefix: '↪', text: '✓ Disponible pour de nouveaux projets', delay: 3.2, green: true },
]

export default function Home() {
  const [visibleLines, setVisibleLines] = useState(0)
  const { profile } = useGithubProfile()

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <main className={styles.home}>
      {/* Subtle static grid background */}
      <div className={styles.grid} />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Left: terminal */}
          <motion.div
            className={styles.terminal}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.terminalHeader}>
              <span className={styles.dot} style={{ background: '#ff5f56' }} />
              <span className={styles.dot} style={{ background: '#ffbd2e' }} />
              <span className={styles.dot} style={{ background: '#27c93f' }} />
              <span className={styles.terminalTitle}>terminal — bash</span>
            </div>
            <div className={styles.terminalBody}>
              {TERMINAL_LINES.map((line, i) =>
                i < visibleLines ? (
                  <div key={i} className={styles.termLine}>
                    <span className={styles.termPrefix}>{line.prefix}</span>
                    <span
                      className={
                        line.highlight
                          ? styles.termHighlight
                          : line.green
                          ? styles.termGreen
                          : styles.termText
                      }
                    >
                      {line.text}
                    </span>
                  </div>
                ) : null
              )}
              {visibleLines < TERMINAL_LINES.length && (
                <div className={styles.termLine}>
                  <span className={styles.termPrefix}>$</span>
                  <span className={styles.cursor} />
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: headline */}
          <div className={styles.headline}>
            <motion.p
              className={styles.greeting}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              // Bonjour, je suis
            </motion.p>

            <motion.h1
              className={`${styles.name} glitch`}
              data-text={CONFIG.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {CONFIG.name}
            </motion.h1>

            <motion.h2
              className={styles.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {CONFIG.title}
            </motion.h2>

            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {CONFIG.tagline}
            </motion.p>

            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Link to="/projects" className={styles.btnPrimary}>
                <span>Voir mes projets</span>
                <Arrow />
              </Link>
              <Link to="/about" className={styles.btnSecondary}>
                En savoir plus
              </Link>
            </motion.div>

            {/* Stats */}
            {profile && (
              <motion.div
                className={styles.stats}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <StatItem value={profile.public_repos} label="Repos" />
                <StatItem value={CONFIG.about.stats[0].value} label="Ans d'exp." />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function StatItem({ value, label }) {
  return (
    <div className={styles.statItem}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}