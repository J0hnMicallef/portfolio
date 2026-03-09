import { motion } from 'framer-motion'
import SkillBar from '../components/SkillBar'
import ScrollReveal from '../components/ScrollReveal'
import { CONFIG } from '../config'
import styles from './Skills.module.css'

const TECH_LOGOS = [
  'React', 'TypeScript', 'Node.js', 'Python',
  'Docker', 'AWS', 'PostgreSQL', 'MongoDB',
  'Git', 'Linux', 'GraphQL', 'Next.js',
]

export default function Skills() {
  return (
    <main className={styles.page}>
      <div className="container">
        <ScrollReveal>
          <div className="section-title">
            <span className="title-number">02.</span>
            Compétences
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h3 className={styles.sectionLabel}>Savoir faire</h3>
        </ScrollReveal>

        {/* Skill categories */}
        <div className={styles.categories}>
          {CONFIG.skills.map((cat, catIdx) => (
            <ScrollReveal key={cat.category} variant="fadeUp" delay={catIdx * 0.1}>
              <div className={styles.category}>
                <div className={styles.catHeader}>
                  <span className={styles.catIcon}>{cat.icon}</span>
                  <h2 className={styles.catTitle}>{cat.category}</h2>
                </div>
                <div className={styles.bars}>
                  {cat.items.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={catIdx * 0.15 + i * 0.08}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <h3 className={styles.sectionLabel}>Savoir être</h3>
        </ScrollReveal>

        {/* Skill categories */}
        <div className={styles.categories}>
          {CONFIG.skills_soft.map((cat, catIdx) => (
            <ScrollReveal key={catIdx} variant="fadeUp" delay={catIdx * 0.1}>
              <div className={styles.softBadges}>
                {cat.items.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    className={styles.softBadge}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    whileHover={{ scale: 1.06 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </main>
  )
}
