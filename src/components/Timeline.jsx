import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Timeline.module.css'

export default function Timeline({ items }) {
  return (
    <div className={styles.timeline}>
      <div className={styles.line} />
      {items.map((item, i) => (
        <TimelineItem key={i} item={item} index={i} />
      ))}
    </div>
  )
}

function TimelineItem({ item, index }) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`${styles.item} ${isLeft ? styles.left : styles.right}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Dot */}
      <motion.div
        className={styles.dot}
        animate={isVisible ? { scale: [0, 1.3, 1] } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className={styles.dotInner} />
      </motion.div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={`${styles.type} ${item.type === 'work' ? styles.typeWork : styles.typeEdu}`}>
            {item.type === 'work' ? '⬡ Expérience' : '◈ Formation'}
          </span>
          <span className={styles.period}>{item.period}</span>
        </div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.org}>
          {item.organization}
          {item.location && <span className={styles.location}> · {item.location}</span>}
        </p>
        <p className={styles.desc}>{item.description}</p>
        <div className={styles.tags}>
          {item.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
