import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './ProjectCard.module.css'

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Rust: '#dea584',
  Go: '#00add8',
  Java: '#ed8b00',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#1572b6',
  Vue: '#4fc08d',
  Shell: '#89e051',
  Kotlin: '#a97bff',
  Swift: '#f05138',
  PHP: '#777bb4',
  Ruby: '#cc342d',
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function ForkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-3.5-16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8.5 6.5v1a3.5 3.5 0 0 0 3 3.46V16a3.5 3.5 0 0 0 7 0v-5.04a3.5 3.5 0 0 0 3-3.46v-1h-2v1a1.5 1.5 0 0 1-3 0V5h-2v1.5a1.5 1.5 0 0 1-3 0V5h-2v1.5z" />
    </svg>
  )
}

export default function ProjectCard({ repo, index = 0 }) {
  const [hovered, setHovered] = useState(false)
  const langColor = LANG_COLORS[repo.language] || '#64748b'

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Animated border */}
      <motion.div
        className={styles.border}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className={styles.header}>
        <span className={styles.folderIcon}>◈</span>
        <div className={styles.links}>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className={styles.iconLink}
              title="Voir le site"
            >
              <ExternalIcon />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className={styles.iconLink}
            title="Voir le code"
          >
            <GithubIcon />
          </a>
        </div>
      </div>

      <h3 className={styles.name}>{repo.name}</h3>
      <p className={styles.desc}>
        {repo.description || 'Aucune description disponible.'}
      </p>

      {repo.topics?.length > 0 && (
        <div className={styles.topics}>
          {repo.topics.slice(0, 3).map(t => (
            <span key={t} className={styles.topic}>{t}</span>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        {repo.language && (
          <span className={styles.lang}>
            <span
              className={styles.langDot}
              style={{ background: langColor }}
            />
            {repo.language}
          </span>
        )}
        <span className={styles.stat}>
          <StarIcon /> {repo.stargazers_count}
        </span>
        <span className={styles.stat}>
          <ForkIcon /> {repo.forks_count}
        </span>
      </div>
    </motion.article>
  )
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
