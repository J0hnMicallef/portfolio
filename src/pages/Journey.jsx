import ScrollReveal from '../components/ScrollReveal'
import Timeline from '../components/Timeline'
import { CONFIG } from '../config'
import styles from './Journey.module.css'

export default function Journey() {
  return (
    <main className={styles.page}>
      <div className="container">
        <ScrollReveal>
          <div className="section-title">
            <span className="title-number">03.</span>
            Mon Parcours
          </div>
        </ScrollReveal>

        <Timeline items={CONFIG.journey} />
      </div>
    </main>
  )
}
