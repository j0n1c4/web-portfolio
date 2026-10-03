import type { Locale } from "@/i18n"
import type { WorkProject } from "@/components/molecules/WorkProjectCard"

/**
 * Réalisations — reprises depuis v1/lib/data/projects.ts, réordonnées :
 * réalisations professionnelles d'abord, puis hackathons et projets académiques.
 *
 * `liveUrl` de MadAtlas a été mis à jour vers le nouveau domaine madatlas.mg.
 * Les textes (description / longDescription / role) sont bilingues ; `tags`,
 * `technologies` et `collaborators` sont des noms propres, donc identiques.
 *
 * `collaborators` (optionnel) mentionne les personnes avec qui le projet a été
 * réalisé ; le nom est cliquable si un portfolio est fourni :
 *
 * ```ts
 * collaborators: [
 *   { name: "Prénom Nom", link: "https://exemple.dev" },
 *   { name: "Autre personne" }, // sans lien : affiché en texte simple
 * ]
 * ```
 */

interface LocalizedProject
  extends Omit<WorkProject, "description" | "longDescription" | "role"> {
  description: Record<Locale, string>
  longDescription: Record<Locale, string>
  /** Bilingue — repris de v1, où la carte affichait le poste occupé. */
  role: Record<Locale, string>
}

const localizedProjects: LocalizedProject[] = [
  {
    id: "agroesthet",
    image: "/images/projects/AgroEsthet.png",
    title: "AgroEsthet",
    role: {
      fr: "Développeur Fullstack & DevOps",
      en: "Fullstack Developer & DevOps",
    },
    description: {
      fr: "Plateforme de recherche et de publications sur l'agro-esthétique — projet ANR.",
      en: "Research and publishing platform for agro-aesthetics — an ANR funded project.",
    },
    longDescription: {
      fr: "AGROESTHET (Agroécologie et esthétique des paysages) est un projet de recherche-action financé par l'ANR. Il vise à faire reconnaître, en Inde et à Madagascar, la beauté des paysages agraires produits par des pratiques respectueuses de l'environnement. J'ai développé la plateforme en fullstack : gestion des publications scientifiques, des articles de vulgarisation, des événements et des ressources multimedia, avec stockage objet Minio et déploiement conteneurisé.",
      en: "AGROESTHET (agroecology and landscape aesthetics) is an action-research project funded by the ANR. It aims to have the beauty of farming landscapes produced by environmentally respectful practices recognised in India and Madagascar. I developed the platform end to end: scientific publications, outreach articles, events and multimedia resources, with Minio object storage and a containerized deployment.",
    },
    liveUrl: "https://agroesthet.org/",
    githubUrl: "/",
    tags: ["Next.js", "Express.js", "MySQL", "Minio", "Tailwind CSS"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "MySQL",
      "Minio",
      "Tailwind CSS",
      "Shadcn UI",
      "Docker",
    ],
  },
  {
    id: "madatlas",
    image: "/images/projects/MADATLAS.png",
    title: "MadAtlas",
    role: {
      fr: "Développeur Fullstack",
      en: "Fullstack Developer",
    },
    description: {
      fr: "Filière de formation supérieure en cartographie numérique à l'Université de Fianarantsoa.",
      en: "Higher-education programme in digital cartography at the University of Fianarantsoa.",
    },
    longDescription: {
      fr: "MadAtlas est né de l'appel à projets PeA (Partenariats académiques Afrique-France) de l'AFD, pour construire et animer une filière de formation et de recherche en cartographie numérique appliquée au développement durable — Licence, Master et Doctorat — à l'Université de Fianarantsoa. Je développe la plateforme en fullstack en partenariat avec l'Université Gustave Eiffel, l'IRD, l'Université Bordeaux Montaigne et MAROLOOK Fianarantsoa.",
      en: "MadAtlas was launched through the AFD PeA call for proposals (Africa-France Academic Partnerships) to build and run a teaching and research programme in digital cartography applied to sustainable development — Bachelor, Master and PhD — at the University of Fianarantsoa. I develop the platform end to end in partnership with Gustave Eiffel University, the IRD, Bordeaux Montaigne University and MAROLOOK Fianarantsoa.",
    },
    liveUrl: "https://madatlas.mg/",
    githubUrl: "/",
    tags: ["Next.js", "Express.js", "PostgreSQL", "Minio", "Tailwind CSS"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Minio",
      "Tailwind CSS",
      "Shadcn UI",
      "Docker",
    ],
  },
  {
    id: "keho",
    image: "/images/projects/Keho-UGD.jpeg",
    title: "Keho",
    role: {
      fr: "Lead développeur Mobile & Keycloak",
      en: "Mobile & Keycloak Lead Developer",
    },
    description: {
      fr: "Plateforme de notification et d'alerte pour la gestion des urgences et des événements critiques.",
      en: "Notification and alerting platform for emergencies and critical events.",
    },
    longDescription: {
      fr: "Keho envoie des notifications et des alertes en temps réel pour informer les utilisateurs des situations d'urgence, des événements critiques ou des mises à jour importantes. La plateforme assure une communication rapide entre les autorités, les organisations et le public. J'encadre l'équipe sur la partie mobile React Native et sur l'authentification Keycloak.",
      en: "Keho sends real-time notifications and alerts to keep users informed about emergencies, critical events and important updates. The platform enables fast communication between authorities, organisations and the public. I mentor the team on the React Native mobile side and on Keycloak authentication.",
    },
    githubUrl: "https://github.com/j0n1c4",
    tags: ["React Native", "NestJS", "PostgreSQL", "Keycloak", "Microservices"],
    technologies: [
      "React Native",
      "NestJS",
      "Keycloak",
      "PostgreSQL",
      "Minio",
      "TanStack Query",
      "Zustand",
      "Microservices",
      "Husky",
    ],
  },
  {
    id: "connecter-ia",
    image: "/images/projects/Connecter-IA.png",
    title: "Connecter IA",
    role: {
      fr: "Développeur Backend & DevOps",
      en: "Backend Developer & DevOps",
    },
    description: {
      fr: "Plateforme du colloque scientifique international sur l'IA en éducation.",
      en: "Platform for the international conference on AI in education.",
    },
    longDescription: {
      fr: "Connecter IA est un colloque scientifique international (23–24 mars 2027, Madagascar) organisé par le CREM avec l'IFADEM et l'Organisation Internationale de la Francophonie, sur l'intégration de l'IA dans l'éducation. En tant que développeur backend et DevOps, j'ai travaillé sur la plateforme du colloque (soumission des propositions, évaluation par le comité scientifique, inscriptions) et sur l'infrastructure de déploiement du site public.",
      en: "Connecter IA is an international scientific conference (23–24 March 2027, Madagascar) organised by the CREM with IFADEM and the Organisation Internationale de la Francophonie, on integrating AI into education. As backend and DevOps developer I worked on the conference platform (proposal submission, scientific committee review, registrations) and on the deployment infrastructure of the public site.",
    },
    liveUrl: "https://connecter-ia.mg/",
    tags: ["NestJS", "PostgreSQL", "Docker", "Nginx", "GitOps"],
    technologies: [
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "Next.js",
      "Passerelle de paiement",
      "GitOps",
      "HTTPS",
    ],
  },
  {
    id: "torolalana-ia",
    image: "/images/projects/Torolalana_IA.png",
    title: "Torolalana IA",
    role: {
      fr: "Développeur Frontend",
      en: "Frontend Developer",
    },
    description: {
      fr: "Assistant intelligent de mobilité urbaine pour Fianarantsoa — itinéraire, trafic et bon prix.",
      en: "Smart urban-mobility assistant for Fianarantsoa — routes, traffic and the right fare.",
    },
    longDescription: {
      fr: "Né du Hackathon Libre Tech Madagascar (EMIHACK 4.0), Torolalana IA fluidifie le transport en commun de Fianarantsoa (taxi-be, taxi-collectif, varamba) grâce à un moteur de routage basé sur Dijkstra, une interface cartographique interactive, un assistant IA bilingue malgache/français et un tableau de bord pour les autorités locales. Le projet répond à un problème réel : rues coloniales étroites, absence d'arrêts fixes, tarifs non affichés et pas d'information en temps réel.",
      en: "Born from the Libre Tech Madagascar hackathon (EMIHACK 4.0), Torolalana IA smooths out public transport in Fianarantsoa (taxi-be, shared taxis, varamba) with a Dijkstra-based routing engine, an interactive map interface, a bilingual Malagasy/French AI assistant and a dashboard for local authorities. It tackles a real problem: narrow colonial streets, no fixed bus stops, unposted fares and no real-time information.",
    },
    githubUrl: "https://github.com/ScorpionEMIT/frontend",
    tags: ["React", "NestJS", "Leaflet", "Dijkstra", "PostgreSQL"],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS 4",
      "shadcn/ui",
      "NestJS",
      "Leaflet",
      "Three.js",
      "GSAP",
      "Dijkstra",
      "OpenStreetMap",
      "Python",
      "PostgreSQL",
    ],
  },
  {
    id: "pandemio-tech",
    image: "/images/projects/pandemioTech.jpg",
    title: "Pandemio Tech",
    role: {
      fr: "Développeur Frontend",
      en: "Frontend Developer",
    },
    description: {
      fr: "Plateforme de gestion des épidémies — 2e prix au hackathon EMIT (EMIHACK 3.0).",
      en: "Epidemic management platform — 2nd prize at the EMIT hackathon (EMIHACK 3.0).",
    },
    longDescription: {
      fr: "L'équipe G-RTX a développé en 24 heures une plateforme dédiée à la gestion des épidémies mondiales, qui a remporté la deuxième place lors d'un hackathon interne de l'EMIT le 1er mars 2025. La solution exploite le Big Data et l'Intelligence Artificielle pour la visualisation, la prédiction et la recherche cartographique des données épidémiologiques à l'échelle mondiale.",
      en: "The G-RTX team built a worldwide epidemic management platform in 24 hours, which took second place at an internal EMIT hackathon on 1 March 2025. The solution uses big data and AI to visualise, predict and geographically search epidemiological data at global scale.",
    },
    githubUrl: "https://github.com/j0n1c4",
    tags: ["React", "Express.js", "PostgreSQL", "Python", "LSTM"],
    technologies: [
      "React",
      "Tailwind CSS 4",
      "Express.js",
      "PostgreSQL",
      "Python",
      "Réseau de neurones LSTM",
    ],
  },
  {
    id: "hair-transplantation-africa",
    image: "/images/projects/Clinics-hta.png",
    title: "Hair Transplantation Africa",
    role: {
      fr: "Développeur Fullstack",
      en: "Fullstack Developer",
    },
    description: {
      fr: "Plateforme de mise en relation entre patients et cliniques africaines.",
      en: "Platform connecting patients with African hair transplant clinics.",
    },
    longDescription: {
      fr: "La plateforme permet aux cliniques africaines de créer un compte afin d'attirer davantage de clients. Les patients peuvent comparer les meilleures cliniques selon leur localisation en Afrique, leur type de cheveux et leur budget. L'objectif est de rassembler les cliniques les plus fiables et les mieux notées du continent.",
      en: "The platform lets African clinics create an account to attract more customers. Patients can compare the best clinics by their location in Africa, their hair type and their budget. The goal is to bring together the most reliable and best-reviewed clinics on the continent.",
    },
    liveUrl: "https://hair-transplantation-plateform.onrender.com/home",
    githubUrl: "https://github.com/j0n1c4",
    tags: ["Next.js", "NestJS", "Tailwind CSS", "HeroUI"],
    technologies: ["Next.js", "Tailwind CSS", "HeroUI", "NestJS", "TypeScript"],
  },
  {
    id: "mozik",
    image: "/images/projects/Mozik.png",
    title: "Mozik",
    role: {
      fr: "Développeur Fullstack & IA",
      en: "Fullstack & AI Developer",
    },
    description: {
      fr: "Application de reconnaissance musicale basée sur le modèle d'IA YAMNet.",
      en: "Music recognition app built on the YAMNet AI model.",
    },
    longDescription: {
      fr: "Application web de recherche musicale intégrant le modèle d'IA YAMNet pour analyser le contenu sonore d'un fichier audio. Réalisée en collaboration avec Judio, Faniry, Madone et Dhelys dans le cadre de notre projet RNA (Réseau de Neurones Artificiel).",
      en: "Web app for music search integrating the YAMNet AI model to analyse the sound content of an audio file. Built with Judio, Faniry, Madone and Dhelys as part of our RNA (Artificial Neural Network) project.",
    },
    liveUrl: "https://github.com/j0n1c4/audio-python",
    githubUrl: "https://github.com/j0n1c4/audio-python",
    tags: ["React", "Flask", "YAMNet", "PostgreSQL", "JWT"],
    technologies: [
      "React",
      "Tailwind CSS 4",
      "Flask",
      "PostgreSQL",
      "Neon.tech",
      "JWT",
      "YAMNet",
      "AUDD.io",
    ],
  },
  {
    id: "next-auth",
    image: "/images/projects/NextAuth.png",
    title: "Next-Auth",
    role: {
      fr: "Développeur Fullstack",
      en: "Fullstack Developer",
    },
    description: {
      fr: "Application d'authentification avec NextAuth.",
      en: "Authentication app built with NextAuth.",
    },
    longDescription: {
      fr: "Application développée dans l'objectif de comprendre en profondeur l'intégration d'authentifications modernes utilisées dans les sites professionnels, notamment via Google et GitHub. Ce projet m'a permis d'explorer NextAuth et de mettre en place un système complet de connexion sécurisée avec récupération des informations de l'utilisateur.",
      en: "App built to deeply understand how modern authentication is integrated into professional websites, in particular through Google and GitHub. The project let me explore NextAuth and set up a complete secure login flow that retrieves user information.",
    },
    liveUrl: "https://next-auth-app-black.vercel.app/",
    githubUrl: "https://github.com/j0n1c4/next-auth-app",
    tags: ["Next.js", "NextAuth", "Tailwind CSS"],
    technologies: ["Next.js", "Tailwind CSS 4", "NextAuth", "TypeScript"],
  },
  {
    id: "energy-prediction",
    image: "/images/projects/EnergyPredict.png",
    title: "Prédiction de crise énergétique",
    role: {
      fr: "Développeur IA",
      en: "AI Developer",
    },
    description: {
      fr: "Réseau de neurones LSTM pour l'analyse et la prédiction de consommation énergétique.",
      en: "LSTM neural network for energy consumption analysis and forecasting.",
    },
    longDescription: {
      fr: "Cette application web permet d'analyser et de prédire la consommation énergétique à l'aide d'un réseau de neurones LSTM. Les utilisateurs peuvent importer leurs propres données énergétiques, et le modèle fournit une prédiction instantanée basée sur les tendances historiques.",
      en: "This web app analyses and forecasts energy consumption using an LSTM neural network. Users can import their own energy data and the model returns an instant prediction based on historical trends.",
    },
    githubUrl: "https://github.com/j0n1c4",
    tags: ["React", "FastAPI", "LSTM", "Python"],
    technologies: ["React", "TypeScript", "FastAPI", "LSTM", "Python", "Shadcn UI"],
  },
  {
    id: "qda-analytic",
    image: "/images/projects/QDA-analytic.png",
    title: "QDA Analytic",
    role: {
      fr: "Développeur IA",
      en: "AI Developer",
    },
    description: {
      fr: "Classification supervisée par QDA — comparez Sklearn et PyTorch sur vos données CSV.",
      en: "QDA supervised classification — compare Sklearn and PyTorch on your CSV data.",
    },
    longDescription: {
      fr: "Cette application web permet d'effectuer une classification supervisée à l'aide de l'analyse discriminante quadratique (QDA). Les utilisateurs peuvent importer leurs propres données au format CSV et comparer les performances de deux approches : la méthode mathématique via Sklearn et la méthode neuronale via PyTorch.",
      en: "This web app performs supervised classification using quadratic discriminant analysis (QDA). Users import their own CSV data and compare the performance of two approaches: the mathematical method via Sklearn and the neural method via PyTorch.",
    },
    githubUrl: "https://github.com/j0n1c4",
    tags: ["React", "FastAPI", "Sklearn", "PyTorch"],
    technologies: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "Sklearn",
      "PyTorch",
      "Tailwind CSS",
    ],
  },
  {
    id: "e-commerce-simulation",
    image: "/images/projects/technoweb.png",
    title: "Simulation e-commerce",
    role: {
      fr: "Développeur Fullstack",
      en: "Fullstack Developer",
    },
    description: {
      fr: "Application e-commerce avec Vue.js et Node.js.",
      en: "E-commerce application built with Vue.js and Node.js.",
    },
    longDescription: {
      fr: "Une application e-commerce développée avec Vue.js et Node.js, incluant l'authentification, la consultation des produits et le panier. L'objectif était de construire une application complète pour simuler un e-commerce, débuter dans le déploiement et relier la base de données, le backend et le frontend.",
      en: "An e-commerce application built with Vue.js and Node.js, including authentication, product browsing and a shopping cart. The goal was to build a complete app simulating an e-commerce store, get started with deployment and wire the database, backend and frontend together.",
    },
    liveUrl: "https://techno-web-avance.vercel.app/",
    githubUrl: "https://github.com/j0n1c4/frontend-technoweb-avance",
    tags: ["Vue.js", "Express.js", "PostgreSQL", "JWT"],
    technologies: [
      "Vue.js 3",
      "Tailwind CSS 4",
      "Express.js",
      "PostgreSQL",
      "Neon.tech",
      "JWT",
    ],
  },
  {
    id: "gestion-inscription",
    image: "/images/projects/Gestion_inscription.png",
    title: "Gestion d'inscription",
    role: {
      fr: "Développeur Fullstack",
      en: "Fullstack Developer",
    },
    description: {
      fr: "Application web pour gérer les inscriptions aux concours d'entrée à l'université.",
      en: "Web app to manage applications for university entrance exams.",
    },
    longDescription: {
      fr: "Cette application facilite la digitalisation et simplifie l'inscription des étudiants aux concours d'entrée à l'université. Les candidats peuvent s'inscrire facilement et recevoir un retour sur l'acceptation de leur candidature par téléphone, sans se déplacer.",
      en: "This app makes registration easier and digitises applications to university entrance exams. Candidates can apply online and receive a phone reply about the outcome of their application without having to travel.",
    },
    liveUrl: "https://youtu.be/a8WYK4c-FLw",
    githubUrl: "https://github.com/j0n1c4/web_gestion_inscription_perso",
    tags: ["React", "Express.js", "SQLite", "Bootstrap"],
    technologies: ["React", "Bootstrap 4", "Express.js", "SQLite", "JavaScript"],
  },
  {
    id: "securepass",
    image: "/images/projects/SecurePass-Home-visible-parts.png",
    title: "SecurePass",
    role: {
      fr: "Développeur Backend & DevOps",
      en: "Backend Developer & DevOps",
    },
    description: {
      fr: "Application sécurisée de gestion de mots de passe avec Docker.",
      en: "Secure password manager application, containerized with Docker.",
    },
    longDescription: {
      fr: "SecurePass est une application de gestion de mots de passe développée en PHP natif, sans framework. Elle permet de stocker, générer et gérer ses mots de passe en toute sécurité. Le projet propose deux modes d'installation : via Docker pour un déploiement rapide et isolé, ou en local avec PHP et un serveur type XAMPP/LAMP.",
      en: "SecurePass is a password manager written in plain PHP, without any framework. It lets you store, generate and manage passwords securely. The project offers two installation modes: via Docker for a fast, isolated deployment, or locally with PHP and an XAMPP/LAMP-style server.",
    },
    liveUrl: "https://youtu.be/72arv4oIW8g",
    githubUrl: "https://github.com/j0n1c4/docker_pass_php",
    tags: ["PHP", "Docker", "Bcrypt", "Bootstrap"],
    technologies: ["PHP", "JavaScript", "Bcrypt", "Bootstrap", "Docker"],
  },
]

/** Projets resuelus dans la locale active. */
export const getWorkProjects = (locale: Locale): WorkProject[] =>
  localizedProjects.map(({ description, longDescription, role, ...project }) => ({
    ...project,
    description: description[locale],
    longDescription: longDescription[locale],
    role: role[locale],
  }))
