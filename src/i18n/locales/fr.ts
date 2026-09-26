const fr = {
  nav: {
    home: "Accueil",
    about: "À propos",
    skills: "Expertise",
    projects: "Projets",
    blog: "Blog",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  header: {
    language: "Changer de langue",
  },
  hero: {
    headline: "Développeur",
    cta: "Me contacter",
    downloadCv: "Télécharger le CV",
    badge: "Développeur & ingénieur DevOps",
    location: "Localisation",
    education: "Formation",
    objective: "Objectif",
    stats: {
      experience: "Années\nd'expérience",
      projects: "Projets\nréalisés",
      professional: "Projets\nprofessionnels",
    },
  },
  about: {
    title: "À propos",
    greeting: "Salut !",
    imageAlt: "Portrait devant un écran de code",
  },
  skills: {
    title: "Expertise Technique",
    subtitle: "Stack moderne et compétences orientées résultats",
    dev: "DEV",
    devops: "DEVOPS",
    categories: {
      frontend: "Frontend",
      backend: "Backend & Data",
      ciCd: "CI/CD & Automatisation",
      infra: "Infrastructure",
    },
  },
  stats: {
    technologies: "Technologies maîtrisées",
    proProjects: "Projets professionnels",
    awards: "Prix en hackathon",
  },
  works: {
    title: "Projets",
    subtitle:
      "Des produits en production et des projets de hackathon, de la recherche à la mise en ligne.",
    viewDetails: "Voir les détails",
    technologies: "Technologies utilisées",
    viewLive: "Voir le site",
    viewCode: "Voir le code",
  },
  blog: {
    title: "Blog",
    subtitle: "Mes réflexions sur le développement et le DevOps",
    viewMore: "Voir plus",
    subscribe: "S'abonner",
    readMore: "Lire la suite",
    author: "Auteur",
    date: "Date",
    readTime: "Lecture",
  },
  contact: {
    title: "Contact",
    subtitle: "Une question, un projet ? N'hésitez pas à me contacter",
    cta: "Écrivez-moi",
    name: "Nom complet",
    email: "Email",
    subject: "Sujet",
    message: "Votre message",
    send: "Envoyer le message",
    sending: "Envoi en cours...",
    success: "Message envoyé, merci !",
    error: "L'envoi a échoué, veuillez réessayer.",
    notConfigured:
      "Le formulaire n'est pas encore configuré (identifiants EmailJS manquants).",
    errors: {
      name: "Votre nom est requis",
      email: "Votre email est requis",
      emailInvalid: "Format d'email invalide",
      subject: "Le sujet est requis",
      message: "Votre message est requis",
    },
  },
  footer: {
    rights: "Tous droits réservés.",
  },
  common: {
    previous: "Projet précédent",
    next: "Projet suivant",
    close: "Fermer",
    goToSlide: "Aller à la diapositive",
  },
}

/** Structure du dictionnaire — `fr` fait foi, `en` doit la reproduire. */
export type Dictionary = typeof fr

export default fr
