import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { CONFIG } from '../config'
import { useGithubProfile } from '../hooks/useGithub'
import styles from './About.module.css'

export default function About() {
  const { profile } = useGithubProfile()

  return (
    <main className={styles.page}>
      <div className="container">
        <ScrollReveal>
          <div className="section-title">
            <span className="title-number">04.</span>
            À propos de moi
          </div>
        </ScrollReveal>

        <div className={styles.layout}>
          {/* ── Avatar column ── */}
          <ScrollReveal variant="slideLeft" delay={0.1}>
            <div className={styles.avatarCol}>
              <div className={styles.avatarWrap}>
                {CONFIG.about.avatar || profile?.avatar_url ? (
                  <img
                    src={CONFIG.about.avatar || profile?.avatar_url}
                    alt={CONFIG.name}
                    className={styles.avatarImg}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <span>{CONFIG.name.charAt(0)}</span>
                  </div>
                )}
                <div className={styles.avatarGlow} />
                <div className={styles.avatarBorder} />
              </div>

              {/* Social links */}
              <div className={styles.social}>
                {Object.entries(CONFIG.social).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialBtn}
                  >
                    <span className={styles.socialKey}>{key}</span>
                  </a>
                ))}
              </div>

              {/* Quick info */}
              <div className={styles.quickInfo}>
                {[
                  { label: 'Location', value: CONFIG.location, icon: '◈' },
                  { label: 'Email', value: CONFIG.email, icon: '⬡' },
                  { label: 'GitHub', value: `@${CONFIG.github.username}`, icon: '⬢' },
                ].map(item => (
                  <div key={item.label} className={styles.infoRow}>
                    <span className={styles.infoIcon}>{item.icon}</span>
                    <div>
                      <span className={styles.infoLabel}>{item.label}</span>
                      <span className={styles.infoValue}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ── Content column ── */}
          <div className={styles.content}>
            <ScrollReveal variant="slideRight" delay={0.15}>
              <div className={styles.bioSection}>
                <h2 className={styles.bioHeading}>
                  <span className={styles.bioComment}>// </span>
                  Qui suis-je ?
                </h2>
                {CONFIG.about.bio.map((p, i) => (
                  <p key={i} className={styles.bioPara}>{p}</p>
                ))}
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal variant="fadeUp" delay={0.25}>
              <div className={styles.statsGrid}>
                {CONFIG.about.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    className={styles.statCard}
                    whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.35)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={styles.statVal}>{stat.value}</span>
                    <span className={styles.statLbl}>{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.35}>
              <div className={styles.ctas}>
                <Link to="/projects" className={styles.ctaPrimary}>
                  Voir mes projets →
                </Link>
                <a href={`mailto:${CONFIG.email}`} className={styles.ctaSecondary}>
                  Me contacter
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </main>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
