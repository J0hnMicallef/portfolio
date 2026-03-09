import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import ScrollReveal from '../components/ScrollReveal'
import { useGithubRepos } from '../hooks/useGithub'
import { CONFIG } from '../config'
import styles from './Projects.module.css'

export default function Projects() {
  const { repos, loading, error } = useGithubRepos()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const languages = useMemo(() => {
    const langs = repos
      .map(r => r.language)
      .filter(Boolean)
    return ['all', ...new Set(langs)]
  }, [repos])

  const filtered = useMemo(() => {
    return repos.filter(r => {
      const matchLang = filter === 'all' || r.language === filter
      const matchSearch = !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.description || '').toLowerCase().includes(search.toLowerCase())
      return matchLang && matchSearch
    })
  }, [repos, filter, search])

  return (
    <main className={styles.page}>
      <div className="container">
        <ScrollReveal>
          <div className="section-title">
            <span className="title-number">01.</span>
            Projets GitHub
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className={styles.intro}>
            Projets récupérés en temps réel depuis l'API GitHub de{' '}
            <a
              href={CONFIG.social.github}
              target="_blank"
              rel="noreferrer"
              className={styles.usernameLink}
            >
              @{CONFIG.github.username}
            </a>
          </p>
        </ScrollReveal>

        {/* Controls */}
        <ScrollReveal delay={0.15}>
          <div className={styles.controls}>
            <div className={styles.searchWrap}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className={styles.search}
              />
            </div>
            <div className={styles.filters}>
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setFilter(lang)}
                  className={`${styles.filterBtn} ${filter === lang ? styles.active : ''}`}
                >
                  {lang === 'all' ? 'Tous' : lang}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Loading */}
        {loading && (
          <div className={styles.loading}>
            <div className={styles.loadingDots}>
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className={styles.loadingDot}
                  animate={{ opacity: [0.2, 1, 0.2], y: [0, -8, 0] }}
                  transition={{ duration: 1, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </div>
            <span className={styles.loadingText}>Connexion à l'API GitHub...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠</span>
            <div>
              <p className={styles.errorTitle}>Erreur API GitHub</p>
              <p className={styles.errorMsg}>{error}</p>
              <p className={styles.errorHint}>
                Vérifiez le username dans <code>src/config.js</code>
              </p>
            </div>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            <div className={styles.resultCount}>
              <span className={styles.countNum}>{filtered.length}</span>
              <span className={styles.countLabel}> projet{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</span>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div layout className={styles.grid}>
                {filtered.map((repo, i) => (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard repo={repo} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>◈</span>
                <p>Aucun projet ne correspond à votre recherche.</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}
