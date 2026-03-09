// ╔══════════════════════════════════════════════════╗
// ║          CONFIGURATION DU PORTFOLIO              ║
// ║      ← Modifiez ce fichier pour personnaliser →  ║
// ╚══════════════════════════════════════════════════╝

export const CONFIG = {
  // ── Identité ──
  name: 'John Micallef',
  title: 'Étudiant en informatique',
  tagline: 'Passionné par l\'informatique (Dev, IA, Web, Ops, etc.).',
  email: 'johnmclf@email.com',
  location: 'Nevers, France',

  // ── GitHub ──
  github: {
    username: 'J0hnMicallef',
    pinnedRepos: [],            // Laisser vide = tous les repos
    excludeRepos: [], // Repos à exclure
    perPage: 12,
  },

  // ── Réseaux sociaux ──
  social: {
    github: 'https://github.com/J0hnMicallef',
    linkedin: 'https://linkedin.com/in/votre-profil',
  },

  // ── À propos ──
  about: {
    bio: [
      "Actuellement étudiant en BUT Informatique, je suis à la recherche d'une alternance en vue de poursuivre mes études en Mastère. Rigoureux, ponctuel et sérieux, je maîtrise aussi bien le développement web que les aspects théoriques de l'informatique et les pratiques DevOps."
    ],
    stats: [
      { label: 'Années d\'expérience', value: '2+' },
      { label: 'Technologies abordées', value: '15+' },
    ],
    avatar: '/public/img/maPhotosCV.png', // URL d'une image ou null pour placeholder
  },

  // ── Compétences (savoir faire) ──
  skills: [
    {
      category: 'Langages informatiques',
      icon: '▢',
      items: [
        { name: 'Python', level: 80 },
        { name: 'HTML/CSS', level: 70 },
        { name: 'JavaScript', level: 50 },
        { name: 'SQL', level: 80 },
        { name: 'Php', level: 40 },
        { name: 'TypeScript', level: 40 },
        { name: 'React / Next.js', level: 40 },
      ],
    },
    {
      category: 'DevOps',
      icon: '◈',
      items: [
        { name: 'Terraform', level: 50 },
        { name: 'Ansible', level: 40 },
        { name: 'Docker', level: 60 },
        { name: 'CI/CD (GitHub Actions)', level: 70 },
        { name: 'Openstack', level: 60 },
        { name: 'Jenkins', level: 40 },
        { name: 'Linux', level: 60 },
      ],
    },
    {
      category: 'Outils',
      icon: '⬡',
      items: [
        { name: 'VS Code', level: 90 },
        { name: 'Github', level: 90 },
        { name: 'Confluence', level: 70 },
      ],
    }
  ],

  // ── Compétences (savoir être) ──
  skills_soft: [
    {
      items: [
        { name: 'Ponctualité'},
        { name: 'Esprit d\'équipe'},
        { name: 'Curiosité'},
        { name: 'Sérieux'},
        { name: 'Autonomie'},
      ],
    },
  ],


  // ── Parcours ──
  journey: [
      {
      type: 'education',
      period: '2026 — 2028',
      title: 'Mastère Informatique',
      organization: 'CS2I',
      location: 'Nevers',
      description: 'Développement d\'applications.',
      tags: ['Big', 'Data', 'IA', 'Dev', 'Cloud'],
    },
    {
      type: 'work',
      period: '2024 — 2026',
      title: 'Alternance DevOps',
      organization: 'DGFIP',
      location: 'Clermont-Ferrand',
      description: 'Automatisation des déploiements et gestion de l\'infrastructure cloud. Dévelopement d\'une IHM',
      tags: ['Terraform', 'Ansible', 'Openstack', 'Python', 'Jenkins', 'Linux', 'Confluence'],
    },
    {
      type: 'education',
      period: '2023 — 2026',
      title: 'But informatique',
      organization: 'IUT Bourgogne',
      location: 'Nevers',
      description: 'Développement d\'applications.',
      tags: ['Dev', 'WEB', 'informatique théorique', 'Algorithmes', 'Réseaux', 'Système', 'IA'],
    },
  ],
}
