import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './SkillBar.module.css'

export default function SkillBar({ name, level, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAnimated(true), delay * 1000)
      return () => clearTimeout(t)
    }
  }, [inView, delay])

  return (
    <div className={styles.skill} ref={ref}>
      <div className={styles.meta}>
        <span className={styles.name}>{name}</span>
        <motion.span
          className={styles.level}
          initial={{ opacity: 0 }}
          animate={animated ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          animate={animated ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className={styles.glow} />
          <div className={styles.shimmer} />
        </motion.div>
      </div>
    </div>
  )
}
