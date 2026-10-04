const fr = {
  nav: {
    home: "Accueil",
    about: "À propos",
    skills: "Expertise",
    projects: "Réalisations",
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
    ctaProjects: "Voir mes réalisations",
    downloadCv: "Télécharger le CV",
    badge: "Développeur & ingénieur DevOps",
    location: "Localisation",
    education: "Formation",
    objective: "Objectif",
    stats: {
      experience: "Années\nd'expérience",
      projects: "Réalisations\nlivrées",
      professional: "Réalisations\nprofessionnelles",
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
    showMore: "Voir plus",
    showLess: "Réduire",
    categories: {
      frontend: "Frontend",
      backend: "Backend & Data",
      ciCd: "CI/CD & Automatisation",
      infra: "Infrastructure",
    },
  },
  stats: {
    technologies: "Technologies maîtrisées",
    proProjects: "Réalisations professionnelles",
    awards: "Prix en hackathon",
  },
  works: {
    title: "Réalisations",
    subtitle:
      "Des produits en production et des travaux de hackathon, de la recherche à la mise en ligne.",
    viewDetails: "Voir les détails",
    technologies: "Technologies utilisées",
    buildWith: "Équipe",
    withOthersOne: "avec {count} autre personne",
    withOthersMany: "avec {count} autres personnes",
    viewLive: "Voir le site",
    viewCode: "Voir le code",
    perPage: "Par page",
    pagination: "Pagination des réalisations",
  },
  blog: {
    title: "Blog",
    subtitle: "Mes réflexions sur le développement et le DevOps",
    viewMore: "Voir plus",
    showLess: "Voir moins",
    subscribe: "S'abonner",
    readMore: "Lire la suite",
    author: "Auteur",
    date: "Date",
    readTime: "Lecture",
    sources: "Sources",
    sourcesHint:
      "Chaque affirmation ci-dessus est rattachée à sa documentation primaire. Les liens ci-dessous ont été vérifiés.",
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
    social: "Réseaux",
    explore: "Navigation",
    credit: "Crédit",
    stack: "Stack",
    madeWith: "Fait avec",
  },
  common: {
    previous: "Réalisation précédente",
    next: "Réalisation suivante",
    close: "Fermer",
    goToSlide: "Aller à la diapositive",
    enlargeImage: "Agrandir l'image",
  },
}

/** Structure du dictionnaire — `fr` fait foi, `en` doit la reproduire. */
export type Dictionary = typeof fr

export default fr
