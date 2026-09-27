import coverDocker from "@/assets/blog/docker-multi-stage-build.svg"
import coverGitOps from "@/assets/blog/gitops-declarative-sync.svg"
import coverGitlab from "@/assets/blog/gitlab-ci-pipeline.svg"
import coverK8s from "@/assets/blog/kubernetes-resource-limits.svg"
import coverNginx from "@/assets/blog/nginx-reverse-proxy-tls.svg"
import coverOtel from "@/assets/blog/opentelemetry-observability.svg"
import coverZod from "@/assets/blog/zod-runtime-validation.svg"
import type { BlogPost } from "@/components/molecules/BlogCard"
import { profile } from "@/data/profile"
import type { Locale } from "@/i18n"

/**
 * Blog — six articles sur la stack réellement utilisée sur ce site.
 * L'ordre est éditorial : du plus large (Docker, CI/CD) au plus pointu
 * (requests/limits Kubernetes), pour qu'un visiteur découvre le sujet via
 * l'aperçu et ait envie de lire la suite. Chaque article est rédigé en fr puis
 * en en, avec le même `id` dans les deux locale (le slug sert d'ancre).
 */
const blogPosts: Record<Locale, BlogPost[]> = {
  fr: [
    {
      id: "kubernetes-resource-limits",
      image: coverK8s,
      title: "requests, limits et HPA : pourquoi vos pods se font tuer au pire moment",
      excerpt:
        "Une application qui n'a jamais déclaré ses requests ne peut pas être planifiée correctement, et une application qui n'a jamais déclaré ses limits se fait OOMKill sans explication. Voici la méthode que j'utilise pour sortir des valeurs honnêtes.",
      category: "Kubernetes",
      author: profile.name,
      date: "2025-11-03",
      readTime: "8 min",
      slug: "kubernetes-resource-limits",
      content: [
        {
          type: "p",
          text: "Les resources CPU et mémoire se comportent très différemment, et c'est la source de la confusion la plus fréquente. Le CPU est compressible : au-delà de la request, le pod est throttlé mais il continue de tourner. La mémoire ne l'est pas : au-delà de la limit, le noyau tue le process avec un OOMKill, sans log applicatif et sans trace.",
        },
        { type: "h2", text: "Commencer par la mesure, pas par la devinette" },
        {
          type: "p",
          text: "La valeur par défaut d'un `nodePort`, c'est 1 CPU et 512 Mo pour un conteneur qui en consomme 80. Le scheduler ne peut pas placer intelligemment, le HPA ne peut pas dimensionner, et le pod se fait tuer dès qu'un pic de trafic arrive. La bonne méthode consiste à mesurer la consommation réelle en charge réelle pendant au moins une semaine, puis à prendre la médiane et non le maximum.",
        },
        {
          type: "code",
          language: "yaml",
          code: `resources:
  requests:
    cpu: 250m
    memory: 384Mi
  limits:
    cpu: 1000m
    memory: 512Mi`,
        },
        {
          type: "p",
          text: "La request CPU est la valeur qui compte pour le scheduling et pour le HPA — c'est elle qui est utilisée pour calculer l'utilisation. Le limit CPU sert de borne haute partagée en cas de contention sur le nœud. Pour la mémoire, on ne pose presque jamais de limite proche de la request : on la pose nettement au-dessus, généralement 1,5× à 2× le p99 observé, pour absorber les pics sans tuer le process.",
        },
        { type: "h2", text: "Pourquoi la request CPU est si importante" },
        {
          type: "p",
          text: "Un pod sans request CPU est traité comme BestEffort par le scheduler : il est le premier à être évincé sous pression de ressources. Un pod avec une request CPU mais sans limite est Burstable : il reçoit sa request, et le surplus seulement s'il reste de la place sur le nœud. C'est ce dernier cas qu'on veut — QoS Burstable avec une request correcte donne de l'élasticité sans être un journal de redémarrages.",
        },
        { type: "h2", text: "Brancher un HPA qui réagit au bon signal" },
        {
          type: "p",
          text: "Un autoscaler basé sur le CPU seul est un indicateur médiocre pour une application qui fait surtout des requêtes d'entrée/sortie : un service qui attend PostgreSQL a un CPU plat et une latence en hausse. Dans ce cas, on scale sur la latence p95, ou sur la longueur de la file d'attente.",
        },
        {
          type: "code",
          language: "yaml",
          code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: portfolio-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: portfolio-api
  minReplicas: 2
  maxReplicas: 12
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 65
    - type: Pods
      pods:
        metric:
          name: http_request_duration_seconds
        target:
          type: AverageValue
          averageValue: "250m"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300`,
        },
        {
          type: "p",
          text: "`averageUtilization: 65` et non 80 : on veut que l'autoscaler réagisse avant que l'utilisateur ne ressente la lenteur, pas qu'il attende la saturation. Le `stabilizationWindowSeconds` sur le scale-down est plus important qu'il n'y paraît — sans lui, l'autoscaler oscille, et un cluster qui monte et descend des pods toutes les trente secondes coûte plus cher en images tirées qu'il ne sert.",
        },
        {
          type: "quote",
          text: "Une request qui ment est pire qu'une request absente : l'A autoscaler se fie au chiffre, et c'est lui qui décide.",
        },
      ],
    },    {
      id: "docker-multi-stage-build",
      image: coverDocker,
      title: "Passer d'une image Node de 1,2 Go à 80 Mo avec un build multi-stage",
      excerpt:
        "Le Dockerfile que tout le monde écrit embarque le compilateur TypeScript, les devDependencies et le cache npm dans l'image finale. Un build multi-stage, un runtime non-root et un .dockerignore règlent le problème en une vingtaine de lignes.",
      category: "Docker",
      author: profile.name,
      date: "2026-02-18",
      readTime: "7 min",
      slug: "docker-multi-stage-build",
      content: [
        {
          type: "p",
          text: "Le réflexe quand une image Docker dépasse le gigaoctet, c'est de chercher où est le poids. En général, la réponse est là : le Dockerfile fait une seule étape, donc tout ce qui a servi à compiler se retrouve dans l'image finale.",
        },
        {
          type: "p",
          text: "Une image Node qui installe les dépendances, compile, puis lance `node dist/main.js` transporte encore `node_modules` complet, le cache Yarn, les sources `.ts` et le `tsconfig`. Tout cela ne sert à rien à l'exécution.",
        },
        { type: "h2", text: "Le principe : séparer la construction de l'exécution" },
        {
          type: "p",
          text: "Un build multi-stage utilise plusieurs étapes, chacune avec sa propre image de base. Seuls les fichiers explicitement copiés d'une étape à l'autre arrivent dans l'image finale. On peut même partir d'une base beaucoup plus légère pour l'exécution, puisque l'outillage n'y est plus nécessaire.",
        },
        {
          type: "code",
          language: "dockerfile",
          code: `FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build && pnpm prune --prod

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]`,
        },
        {
          type: "p",
          text: "Trois points font presque tout le travail. `pnpm install --frozen-lockfile` garantit que le build échoue si le lockfile ne correspond pas au `package.json`, au lieu de résoudre silencieusement de nouvelles versions. `pnpm prune --prod` retire les devDependencies avant la copie. Et `USER node` fait tourner le process sous un compte non privilégié — sans ça, un conteneur compromis est un conteneur root.",
        },
        {
          type: "h2",
          text: "Ne pas oublier le .dockerignore",
        },
        {
          type: "p",
          text: "Sans `.dockerignore`, `COPY . .` envoie `.git`, `node_modules`, `dist`, les `.env` et les dossiers de tests dans le démon Docker. Ils ne cassent pas l'image finale si les étapes sont propres, mais ils explosent le temps de build et le cache — et `COPY . .` invalide la couche à chaque commit.",
        },
        {
          type: "code",
          language: "text",
          code: `node_modules
dist
.git
.env
.env.*
coverage
*.log
Dockerfile
.dockerignore`,
        },
        {
          type: "h2",
          text: "Mesurer avant d'optimiser",
        },
        {
          type: "ul",
          items: [
            "`docker history <image>` montre quelle couche a ajouté le plus de poids, dans l'ordre.",
            "`dive <image>` décompose l'image couche par couche et signale les fichiers qui n'ont pas servi.",
            "Comparer l'empreinte avant/après : sur une app NestJS standard, on passe couramment de ~1,2 Go à moins de 100 Mo, soit un temps de pull et de déploiement proportionnellement réduit.",
          ],
        },
        {
          type: "quote",
          text: "La taille de l'image n'est pas une vanité : c'est le temps d'attente de chaque déploiement, et la surface d'attaque que vous embarquez.",
        },
        {
          type: "p",
          text: "Ces chiffres sont ceux que j'obtiens sur les services NestJS de ce portfolio. Le même découpage fonctionne pour un front Vite, à une nuance près : le build Vite produit des fichiers statiques, on peut donc descendre jusqu'à `nginx:alpine` ou `caddy` pour l'étape runtime, sans Node du tout.",
        },
      ],
    },
    {
      id: "opentelemetry-observabilite",
      image: coverOtel,
      title: "OpenTelemetry : instrumenter une fois, lire ses traces dans Grafana",
      excerpt:
        "Un CPU à 80 % ne dit rien de ce que l'utilisateur a subi. Traces, métriques et logs : ce que chacun apporte, ce que l'auto-instrumentation couvre déjà, et les deux pièges qui tuent une stack d'observabilité — la cardinalité et l'échantillonnage.",
      category: "Observabilité",
      author: profile.name,
      date: "2026-03-05",
      readTime: "10 min",
      slug: "opentelemetry-observabilite",
      content: [
        {
          type: "p",
          text: "Un dashboard qui affiche « CPU à 80 % » ne dit rien du service vu par l'utilisateur. L'observabilité répond à la seule question qui compte en production : qu'est-ce que l'utilisateur a réellement subi ? Pour y répondre, il faut des traces qui relient une requête à travers tous ses services, des métriques qui quantifient, et des logs qui expliquent.",
        },
        { type: "h2", text: "Pourquoi les trois signaux, et pas un seul" },
        {
          type: "p",
          text: "Les logs expliquent un événement isolé, les métriques quantifient une tendance, les traces relient le tout. Pris séparément, chacun a un angle mort : les logs explosent en volume sans donner de chronologie, les métriques agrègent et masquent le cas aberrant, les traces sont coûteuses à stocker et échantillonnées. Ensemble, on descend du symptôme à la cause.",
        },
        { type: "h2", text: "OpenTelemetry : la couche d'instrumentation" },
        {
          type: "p",
          text: "OpenTelemetry est le standard qui unifie la collecte de ces trois signaux, quel que soit le langage, et qui exporte vers n'importe quel backend. Le vrai gain n'est pas la bibliothèque : c'est de pouvoir remplacer Prometheus, Tempo ou un SaaS sans réécrire une ligne d'instrumentation.",
        },
        {
          type: "code",
          language: "typescript",
          code: `import { NodeSDK } from "@opentelemetry/sdk-node"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://otel-collector:4318/v1/traces",
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": { enabled: false },
    }),
  ],
  serviceName: "portfolio-api",
})

sdk.start()

process.on("SIGTERM", async () => {
  await sdk.shutdown()
  process.exit(0)
})`,
        },
        {
          type: "p",
          text: "L'auto-instrumentation couvre HTTP, Express, PostgreSQL, Redis et le SDK Node sans toucher au code métier : c'est 90 % du travail. Les 10 % restants sont les spans métier, ceux qu'aucune instrumentation automatique ne peut deviner. C'est là que se trouve la valeur réelle : sans eux, on voit que la requête a mis 800 ms mais pas qu'elle en a passé 700 à appeler le service de tarification.",
        },
        {
          type: "code",
          language: "typescript",
          code: `import { SpanStatusCode, trace } from "@opentelemetry/api"

const tracer = trace.getTracer("checkout")

export async function placeOrder(cart: Cart) {
  // Un span enfant : apparaît comme un segment dans la trace du parent.
  return tracer.startActiveSpan("placeOrder", async (span) => {
    try {
      const total = await priceCart(cart)
      span.setAttribute("cart.items_count", cart.items.length)
      span.setAttribute("cart.total", total)

      const reservation = await reserveStock(cart)
      span.setAttribute("reservation.id", reservation.id)

      return await commitOrder(reservation)
    } catch (error) {
      span.recordException(error as Error)
      span.setStatus({ code: SpanStatusCode.ERROR })
      throw error
    } finally {
      span.end()
    }
  })
}`,
        },
        {
          type: "p",
          text: "`setAttribute` est ce qui fait la différence entre une trace utile et un mur de spans sans information. `cart.items_count` permet de voir d'un coup d'œil qu'un panier de 200 articles met 12 secondes — ce qu'aucun taux d'erreur ni aucune moyenne de latence ne révélera. Les attributs business transforment une trace technique en pièce à conviction.",
        },
        { type: "h2", text: "La stack de collecte et de stockage" },
        {
          type: "ul",
          items: [
            "OpenTelemetry Collector — le relayeur. Il reçoit, échantillonne, enrichit et route vers plusieurs backends. C'est le composant à déployer en premier, et le seul qui survit à un changement d'outil.",
            "Prometheus — les métriques. Le standard de fait pour le modèle pull, et ce que Grafana consomme nativement.",
            "Tempo — les traces, en stockage objet compatible S3. Nettement moins cher qu'un backend SaaS, et suffisant pour garder quinze jours de traces.",
            "Grafana — la couche de visualisation, dashboards et alertes.",
            "Loki — les logs, indexés par labels plutôt que par contenu. Un label par service, jamais par requête, sous peine de faire exploser la cardinalité.",
          ],
        },
        {
          type: "code",
          language: "yaml",
          code: `receivers:
  otlp:
    protocols:
      grpc: {}
      http: {}

processors:
  memory_limiter:
    limit_mib: 512
  batch: {}

exporters:
  prometheus:
    endpoint: 0.0.0.0:8889
  otlphttp/tempo:
    endpoint: http://tempo:4318

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [otlphttp/tempo]
    metrics:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [prometheus]`,
        },
        {
          type: "p",
          text: "Le `memory_limiter` n'est pas optionnel : c'est lui qui empêche un pic de trafic de faire tomber le Collector, et par effet de bord de perdre les traces au moment précis où elles seraient les plus utiles. `batch` réduit le coût réseau en groupant les spans avant export. Le Collector se déploie en sidecar du pod ou en DaemonSet sur le cluster — en sidecar par défaut, pour qu'un namespace non instrumenté ne soit jamais une boîte noire.",
        },
        { type: "h2", text: "L'erreur classique : la cardinalité" },
        {
          type: "p",
          text: "Chaque combinaison de labels distincts crée une nouvelle série temporelle. Utiliser un `user_id` comme label sur une métrique, c'est créer une série par utilisateur : la mémoire de Prometheus explose et le service s'arrête de lui-même. La règle est simple — les labels d'une métrique ont un nombre de valeurs borné. Tout ce qui répond à « qui » ou « lequel » appartient à une trace ou à un log, jamais à un label.",
        },
        {
          type: "quote",
          text: "Une métrique doit répondre à « combien » et « combien de fois ». Tout ce qui répond à « qui » ou « lequel » va dans une trace ou un log.",
        },
        {
          type: "p",
          text: "C'est le rôle des conventions sémantiques d'OpenTelemetry : elles normalisent les noms de spans et d'attributs par framework et par base de données. Une trace NestJS et une trace Express se lisent alors de la même façon, ce qui rend l'explorateur de traces utilisable sans apprendre un vocabulaire nouveau à chaque service.",
        },
        { type: "h2", text: "L'échantillonnage, tradeoff assumé" },
        {
          type: "p",
          text: "On ne peut pas garder 100 % des traces à volume de production. La stratégie par défaut que je retiens : échantillonner à la tête (`head sampling`) sur les erreurs et les requêtes lentes, à 100 % sur le reste seulement en dessous d'un seuil. L'alternative, le `tail sampling` dans le Collector, permet de garder toutes les erreurs même si elles sont rares — mais il demande de la mémoire, puisqu'il faut buffering pour décider après coup.",
        },
        {
          type: "code",
          language: "yaml",
          code: `processors:
  tail_sampling:
    decision_wait: 10s
    policies:
      - name: errors
        type: status_code
        status_code:
          status_codes: [ERROR]
      - name: slow
        type: latency
        latency:
          threshold_ms: 800
      - name: baseline
        type: probabilistic
        probabilistic:
          sampling_percentage: 5`,
        },
        {
          type: "p",
          text: "Une Span qui contient une erreur a une valeur d'incident disproportionnée : c'est celle qu'on relira à 3 h du matin. La garder à 100 % coûte presque rien, parce qu'elle est rare. À l'inverse, échantillonner 100 % des requêtes saines est un gaspillage pur. Ce déséquilibre est le bon réglage par défaut.",
        },
        {
          type: "quote",
          text: "On ne garde pas toutes les traces. On garde celles qui expliquent un problème — et on sait que la plupart des problèmes sont des erreurs et des pics de latence.",
        },
      ],
    },
    {
      id: "gitops-declarative-sync",
      image: coverGitOps,
      title: "GitOps : pourquoi « kubectl apply » ne tient pas à l'échelle",
      excerpt:
        "Quand l'état d'un cluster vit dans l'histoire bash de quelqu'un, personne ne sait ce qui est déployé, ni comment le rejouer. Passer en déclaratif avec Argo CD, c'est faire de Git la seule source de vérité.",
      category: "GitOps",
      author: profile.name,
      date: "2026-01-27",
      readTime: "9 min",
      slug: "gitops-declarative-sync",
      content: [
        {
          type: "p",
          text: "Le déploiement manuel fonctionne très bien pendant six mois. Un `kubectl apply -f k8s/`, deux ou trois correctifs en douce avec `kubectl edit`, un `rollout restart` pour débloquer un nœud qui ne redémarre pas. Et puis un jour, l'astreinte commence et il faut rejouer l'environnement de staging à l'identique. Personne ne sait comment.",
        },
        { type: "h2", text: "Les trois symptômes du déploiement imperatif" },
        {
          type: "ul",
          items: [
            "L'état réel du cluster n'existe que dans la mémoire de la personne qui l'a modifié.",
            "« Ça marche en staging » devient une hypothèse, pas une garantie : les deux clusters ont divergé.",
            "Le retour arrière est un `kubectl rollout undo` si on a eu la chance de garder l'historique, et un jugement sinon.",
          ],
        },
        { type: "h2", text: "Déclaratif : on décrit l'état voulu, l'outil réconcile" },
        {
          type: "p",
          text: "L'idée est simple : le dépôt Git contient les manifestes Kubernetes, et un contrôleur installé dans le cluster surveille le dépôt pour maintenir le cluster dans l'état décrit. Personne n'applique rien à la main. Si quelqu'un modifie le cluster en direct, l'écart est détecté et corrigé — ou signalé, selon la politique.",
        },
        {
          type: "code",
          language: "yaml",
          code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: portfolio-api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: git@github.com:jonica/portfolio.git
    targetRevision: main
    path: deploy/k8s/api
  destination:
    server: https://kubernetes.default.svc
    namespace: api
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true`,
        },
        {
          type: "p",
          text: "`prune: true` supprime les ressources qui ne sont plus dans Git — sans ça, un `Deployment` renommé laisse un doublon orphelin. `selfHeal: true` réconcilie en continu, donc un `kubectl edit` fait perdre sa modification au bout de quelques secondes. C'est ce qui rend le modèle crédible : l'écart temporaire est visible et tracé, pas silencieux et définitif.",
        },
        {
          type: "h2",
          text: "L'argument qui convainc en revue de code",
        },
        {
          type: "p",
          text: "En imperatif, la revue de code porte sur du code applicatif et la mise en production est un geste de confiance. En déclaratif, la revue porte aussi sur l'infrastructure : la PR contient le Deployment, le Service, l'Ingress, les ConfigMaps. Le diff est lisible, l'historique est complet, et un rollback est un `git revert`.",
        },
        {
          type: "h2",
          text: "Ce que ça ne règle pas",
        },
        {
          type: "p",
          text: "GitOps ne remplace pas la gestion des secrets — il faut encore un External Secrets Operator ou un sealing de secrets pour que le dépôt reste sans donnée sensible. Il ne remplace pas non plus les migrations de base : une migration doit être idempotente, parce qu'argo vavee la rejouer. Enfin, il faut un registre d'images immuable avec des tags précis ; `latest` rend la réconciliation non déterministe.",
        },
        {
          type: "quote",
          text: "Si l'état de production ne peut pas être lu dans un dépôt, il n'est pas reproductible — il est seulement habité.",
        },
      ],
    },
    {
      id: "gitlab-ci-pipeline",
      image: coverGitlab,
      title: "Un pipeline GitLab CI en quatre étapes qui cache vraiment",
      excerpt:
        "Un `.gitlab-ci.yml` qui s'exécute en 6 minutes peut descendre à 90 secondes : images de base identiques, cache de dépendances persisté, jobs de lint et de tests parallélisés, artefacts publiés une seule fois.",
      category: "CI/CD",
      author: profile.name,
      date: "2026-01-09",
      readTime: "8 min",
      slug: "gitlab-ci-pipeline",
      content: [
        {
          type: "p",
          text: "Un pipeline CI lent s'apprend vite à ignorer : on pousse, on va chercher un café, on revient 8 minutes plus tard. Le problème n'est presque jamais le runner, c'est le volume de travail répété à chaque commit.",
        },
        { type: "h2", text: "1. Fixer les versions d'images, pas `latest`" },
        {
          type: "p",
          text: "Couvrir la même image sur les stages est la première source de cache perdu. Un stage qui utilise `node:20` et le suivant `node:20-alpine` n partagent pas le même cache de `node_modules`. Épingler explicitement la même image, et la même version majeure, sur tous les jobs d'un pipeline.",
        },
        {
          type: "code",
          language: "yaml",
          code: `default:
  image: node:24-alpine

variables:
  GIT_DEPTH: "1"

cache:
  key:
    files:
      - pnpm-lock.yaml
  paths:
    - .pnpm-store/
  policy: pull-push`,
        },
        {
          type: "p",
          text: "Indexer la clé de cache sur `pnpm-lock.yaml` plutôt que sur la branche est ce qui fait la différence : la clé change quand les dépendances changent, pas à chaque commit. `policy: pull-push` sur le premier job et `pull` sur les suivants force la chaîne — c'est le cache en cascade, chaque job télécharge une fois et réutilise.",
        },
        { type: "h2", text: "2. Paralléliser lint, types et tests" },
        {
          type: "p",
          text: "Ces trois vérifications sont indépendantes. Les exécuter dans un seul job séquentiel, c'est payer trois fois le temps de checkout et d'installation. En parallèle, le pipeline dure le temps du plus lent.",
        },
        {
          type: "code",
          language: "yaml",
          code: `quality:
  stage: check
  parallel:
    matrix:
      - JOB: lint
        SCRIPT: pnpm run lint
      - JOB: types
        SCRIPT: pnpm exec tsc --noEmit
      - JOB: test
        SCRIPT: pnpm run test
  script: echo "Running $JOB" && $SCRIPT`,
        },
        { type: "h2", text: "3. Ne publier les artefacts qu'une fois" },
        {
          type: "p",
          text: "Le `dist/` construit dans le job de build est le seul artefact dont les stages suivants ont besoin. Le publier dans chaque job duplique le stockage et allonge le transfert. On le publie dans le job de build, et les jobs en aval le récupèrent avec `needs`.",
        },
        {
          type: "ul",
          items: [
            "`needs` évite d'attendre tout le stage quand on ne dépend que d'un job — Gain de temps réel sur les pipelines à plusieurs branches.",
            "`artifacts: expire_in: 1 week` évite que la CI devienne le plus gros stockage du projet.",
            "Sur les branches non principales, sauter la construction d'image : c'est du temps de runner gaspillé pour rien.",
          ],
        },
        { type: "h2", text: "4. Mesurer avant d'optimiser" },
        {
          type: "p",
          text: "La page pipeline de GitLab affiche la durée par job, et c'est là que se trouve la réponse. Sur un pipeline type : 6 min 10 avant, 1 min 25 après — et la stage qui dominait était presque toujours l'installation des dépendances, pas les tests.",
        },
        {
          type: "quote",
          text: "Optimiser un pipeline, c'est d'abord regarder par où passe le temps, pas deviner ce qui est lent.",
        },
      ],
    },
    {
      id: "zod-runtime-validation",
      image: coverZod,
      title: "Zod : le type-check ne suffit pas, les données viennent de dehors",
      excerpt:
        "TypeScript efface ses types à la compilation. Une variable d'environnement, un corps de requête, un payload Keycloak : tout cela arrive à l'exécution avec une forme que le compilateur n'a jamais vue. Zod rend cette frontière explicite.",
      category: "TypeScript",
      author: profile.name,
      date: "2025-12-15",
      readTime: "6 min",
      slug: "zod-runtime-validation",
      content: [
        {
          type: "p",
          text: "Le malentendu classique : `const port: number = process.env.PORT` compile parfaitement, et `process.env.PORT` est en réalité `string | undefined`. Le type ment, parce que TypeScript vérifie des formes que le code déclare, pas des formes que la donnée a réellement à l'exécution.",
        },
        { type: "h2", text: "Où la frontière est réellement franchie" },
        {
          type: "ul",
          items: [
            "Variables d'environnement — la source la plus fréquente, et la plus critique : un secret manquant ne doit pas remonter jusqu'au 500.",
            "Corps de requête HTTP — un client peut envoyer n'importe quoi, et les types s'arrêtent à la frontière du contrôleur.",
            "Réponses d'API tierces — Keycloak, un fournisseur de paiement, n'importe quel service externe.",
            "Fichiers de configuration et variables injectées par l'infrastructure.",
          ],
        },
        { type: "h2", text: "Un schéma, un type, aucune duplication" },
        {
          type: "p",
          text: "Zod permet d'écrire le schéma une fois et d'en dériver le type TypeScript. Le schéma est la source de vérité, le type est un artefact. L'inversion est volontaire : c'est le schéma qui s'exécute, donc c'est lui qui est correct par construction.",
        },
        {
          type: "code",
          language: "typescript",
          code: `import { z } from "zod"

const port = z.coerce.number().int().min(1).max(65535)
const nodeEnv = z.enum(["production", "staging", "development"])
const logFormat = z.enum(["json", "pretty"])

const schema = z.object({
  PORT: port.default(3000),
  NODE_ENV: nodeEnv.default("development"),
  LOG_FORMAT: logFormat.default("pretty"),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, "JWT_SECRET trop court (min 32 caractères)"),
  KEYCLOAK_ISSUER: z.string().url(),
})

export const env = schema.parse(process.env)`,
        },
        {
          type: "p",
          text: "`z.coerce.number()` est la petite touche qui évite la moitié des schémas : la variable d'environnement est une chaîne, on veut un nombre. `z.string().min(32)` transforme un secret trop faible en erreur au démarrage plutôt qu'en incident de sécurité trois mois plus tard. Et `zod` peut être introspecté, donc `z.infer<typeof schema>` dans les signatures de fonction donne l'autocomplétion sans duplication.",
        },
        {
          type: "p",
          text: "Le `parse` lève une `ZodError` avec le chemin du champ fautif. L'important est de l'attraper au plus près du démarrage, avant d'ouvrir le pool de connexions ou d'écrire quoi que ce soit : Fail fast, en une seule fois, quand c'est bon marché.",
        },
        { type: "h2", text: "Et aux frontières HTTP" },
        {
          type: "p",
          text: "Le même principe s'applique côté requête. Un DTO NestJS qui valide le type mais pas le format laisse passer `age: \"abc\"` jusqu'à la base de données. Valider à l'entrée avec un schéma transforme une erreur 500 en 400 avec un message utile.",
        },
        {
          type: "code",
          language: "typescript",
          code: `const CreateUser = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(80),
  role: z.enum(["admin", "editor", "viewer"]),
  age: z.number().int().min(18).max(120).optional(),
})`,
        },
        {
          type: "quote",
          text: "Les types protègent le code que vous écrivez. Les schémas protègent le code que les autres vous envoient.",
        },
      ],
    },
    {
      id: "nginx-reverse-proxy-tls",
      image: coverNginx,
      title: "Nginx en frontal : TLS, compression et en-têtes de sécurité en un fichier",
      excerpt:
        "Derrière un reverse proxy, la performance se joue sur quelques directives mal comprises : buffering, keep-alive, taille des buffers. Et la sécurité sur les en-têtes que presque personne ne renvoie.",
      category: "Infrastructure",
      author: profile.name,
      date: "2025-11-24",
      readTime: "7 min",
      slug: "nginx-reverse-proxy-tls",
      content: [
        {
          type: "p",
          text: "Nginx est le composant le plus sous-estimé d'une stack : il ne fait rien de spectaculaire, mais une mauvaise config se paie en latence p99 et en surface d'attaque. Voici la base que j'utilise, avec les commentaires qui expliquent pourquoi.",
        },
        { type: "h2", text: "Le bloc serveur" },
        {
          type: "code",
          language: "nginx",
          code: `server {
  listen 443 ssl;
  http2 on;
  server_name app.example.mg;

  ssl_certificate     /etc/letsencrypt/live/app.example.mg/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/app.example.mg/privkey.pem;
  ssl_protocols       TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;
  ssl_session_cache   shared:SSL:10m;
  ssl_session_timeout 1d;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options    "nosniff" always;
  add_header X-Frame-Options           "DENY" always;
  add_header Referrer-Policy           "strict-origin-when-cross-origin" always;
  add_header Content-Security-Policy    "default-src 'self'" always;

  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;

  location / {
    proxy_pass http://app_upstream;
    proxy_http_version 1.1;
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Connection        "";
  }
}`,
        },
        {
          type: "p",
          text: "Trois détails qui comptent plus que le reste. `Connection \"\"` combiné à `proxy_http_version 1.1` : sans ça, Nginx ouvre une nouvelle connexion TCP vers l'upstream pour chaque requête, ce qui annule le bénéfice du keep-alive. `ssl_prefer_server_ciphers off` : sur TLS 1.3, l'ordre de préférence du client est le bon ordre, et forcer celui du serveur dégrade souvent la negotiated cipher sans raison. Enfin, `X-Forwarded-Proto` est indispensable derrière un load balancer — sans lui, l'application croit être en HTTP et génère des liens en `http://`.",
        },
        { type: "h2", text: "Le buffering, source n°1 de latence" },
        {
          type: "p",
          text: "Par défaut Nginx bufferise la réponse de l'upstream. C'est bien pour un site fait de pages, et mauvais pour une API qui streame : les premiers octets sont retenus jusqu'à ce que le buffer se remplisse ou que la requête se termine, ce qui ajoute jusqu'à `proxy_buffer_size` de latence.",
        },
        {
          type: "ul",
          items: [
            "`proxy_buffering off;` pour tout ce qui streame (SSE, WebSocket, streaming de tokens LLM).",
            "`proxy_request_buffering off;` pour envoyer le corps de la requête au fur et à mesure, utile sur les uploads volumineux.",
            "`keepalive_timeout 65;` côté client, et un bloc `upstream` avec `keepalive 32;` côté serveur : sans le `keepalive` dans l'upstream, la directive client n'a aucun effet.",
            "`client_max_body_size 10m;` — la valeur par défaut est 1 Mo, et le symptôme est une erreur 413 incompréhensible côté client.",
          ],
        },
        { type: "h2", text: "Renouveler les certificats sans downtime" },
        {
          type: "p",
          text: "Le Certbot en webroot, rechargé par un hook systemd, évite le drop de connexion du mode standalone. On écrit un challenges/, on configure le serveur ACME, et on recharge Nginx après chaque renouvellement.",
        },
        {
          type: "code",
          language: "bash",
          code: `# /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
#!/bin/sh
nginx -t && systemctl reload nginx`,
        },
        {
          type: "quote",
          text: "Si vous ne profiliez pas régulièrement vos buffers, `proxy_buffering off` est le changement le plus rentable que vous ferez cette année.",
        },
      ],
    },

  ],
  en: [
    {
      id: "kubernetes-resource-limits",
      image: coverK8s,
      title: "requests, limits and HPA: why your pods get killed at the worst moment",
      excerpt:
        "An app that never declared its requests cannot be scheduled properly, and an app that never declared its limits gets OOMKilled with no explanation. Here is the method I use to arrive at honest numbers.",
      category: "Kubernetes",
      author: profile.name,
      date: "2025-11-03",
      readTime: "8 min",
      slug: "kubernetes-resource-limits",
      content: [
        {
          type: "p",
          text: "CPU and memory behave very differently, which is the root of most confusion. CPU is compressible: past the request the pod is throttled but keeps running. Memory is not: past the limit, the kernel kills the process with an OOMKill — no application log, no trace.",
        },
        { type: "h2", text: "Start with measurement, not guesswork" },
        {
          type: "p",
          text: "The default for a `nodePort` is 1 CPU and 512 MB for a container actually using 80. The scheduler cannot place intelligently, the HPA cannot scale, and the pod gets killed the moment traffic spikes. The right method is to measure under real load for at least a week, then take the median rather than the maximum.",
        },
        {
          type: "code",
          language: "yaml",
          code: `resources:
  requests:
    cpu: 250m
    memory: 384Mi
  limits:
    cpu: 1000m
    memory: 512Mi`,
        },
        {
          type: "p",
          text: "The CPU request is the value that matters for scheduling and for the HPA — it is the one used to compute utilisation. The CPU limit is an upper bound shared under node contention. For memory you almost never set the limit close to the request: set it clearly above, typically 1.5× to 2× the observed p99, to absorb spikes without killing the process.",
        },
        { type: "h2", text: "Why the CPU request matters so much" },
        {
          type: "p",
          text: "A pod with no CPU request is treated as BestEffort by the scheduler: it is the first to be evicted under resource pressure. A pod with a CPU request but no limit is Burstable: it gets its request, and the surplus only if the node has room left. That last case is what you want — Burstable with a correct request gives you elasticity without a diary of restarts.",
        },
        { type: "h2", text: "Wiring an HPA to the right signal" },
        {
          type: "p",
          text: "A CPU-only autoscaler is a poor signal for an application that mostly waits on I/O: a service querying PostgreSQL has flat CPU and rising latency. In that case, scale on p95 latency, or on queue depth.",
        },
        {
          type: "code",
          language: "yaml",
          code: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: portfolio-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: portfolio-api
  minReplicas: 2
  maxReplicas: 12
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 65
    - type: Pods
      pods:
        metric:
          name: http_request_duration_seconds
        target:
          type: AverageValue
          averageValue: "250m"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300`,
        },
        {
          type: "p",
          text: "`averageUtilization: 65` and not 80: you want the autoscaler to react before users feel the slowdown, not at saturation. The `stabilizationWindowSeconds` on scale-down matters more than it looks — without it the autoscaler oscillates, and a cluster spinning pods up and down every thirty seconds costs more in image pulls than it saves.",
        },
        {
          type: "quote",
          text: "A request that lies is worse than no request at all: the autoscaler trusts the number, and it is the one making the decision.",
        },
      ],
    },    {
      id: "docker-multi-stage-build",
      image: coverDocker,
      title: "Shrinking a 1.2 GB Node image to 80 MB with a multi-stage build",
      excerpt:
        "The Dockerfile everybody writes ships the TypeScript compiler, the devDependencies and the npm cache into the final image. A multi-stage build, a non-root runtime and a .dockerignore fix it in about twenty lines.",
      category: "Docker",
      author: profile.name,
      date: "2026-02-18",
      readTime: "7 min",
      slug: "docker-multi-stage-build",
      content: [
        {
          type: "p",
          text: "The reflex when a Docker image crosses a gigabyte is to look for where the weight is. Usually the answer is right there: the Dockerfile has a single stage, so everything that was needed to compile ends up in the final image.",
        },
        {
          type: "p",
          text: "A Node image that installs dependencies, builds, then runs `node dist/main.js` still carries the full `node_modules`, the package manager cache, the `.ts` sources and the tsconfig. None of it is used at runtime.",
        },
        { type: "h2", text: "The principle: separate building from running" },
        {
          type: "p",
          text: "A multi-stage build uses several stages, each with its own base image. Only the files explicitly copied from one stage to the next reach the final image. You can even drop to a much lighter base for the runtime, since the toolchain is no longer needed.",
        },
        {
          type: "code",
          language: "dockerfile",
          code: `FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build && pnpm prune --prod

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]`,
        },
        {
          type: "p",
          text: "Three details do most of the work. `pnpm install --frozen-lockfile` makes the build fail if the lockfile no longer matches `package.json` instead of silently resolving new versions. `pnpm prune --prod` strips devDependencies before the copy. And `USER node` runs the process as an unprivileged account — without it, a compromised container is a root container.",
        },
        { type: "h2", text: "Do not forget the .dockerignore" },
        {
          type: "p",
          text: "Without a `.dockerignore`, `COPY . .` ships `.git`, `node_modules`, `dist`, the `.env` files and the test folders into the Docker daemon. They don't break the final image if the stages are clean, but they wreck build time and cache — and `COPY . .` invalidates the layer on every commit.",
        },
        {
          type: "code",
          language: "text",
          code: `node_modules
dist
.git
.env
.env.*
coverage
*.log
Dockerfile
.dockerignore`,
        },
        { type: "h2", text: "Measure before you optimise" },
        {
          type: "ul",
          items: [
            "`docker history <image>` shows which layer added the most weight, in order.",
            "`dive <image>` breaks the image down layer by layer and flags files that were never needed.",
            "Compare the footprint before and after: on a standard NestJS app you typically go from ~1.2 GB to under 100 MB, which directly cuts pull time on every deploy.",
          ],
        },
        {
          type: "quote",
          text: "Image size is not vanity: it is the wait time of every deployment, and the attack surface you ship.",
        },
        {
          type: "p",
          text: "Those are the numbers I get on the NestJS services behind this portfolio. The same split works for a Vite frontend, with one difference: the Vite build produces static files, so the runtime stage can go all the way down to `nginx:alpine` or `caddy`, with no Node at all.",
        },
      ],
    },
    {
      id: "opentelemetry-observability",
      image: coverOtel,
      title: "OpenTelemetry: instrument once, read your traces in Grafana",
      excerpt:
        "\"CPU at 80%\" tells you nothing about what the user experienced. Traces, metrics and logs: what each one contributes, what auto-instrumentation already covers, and the two mistakes that kill an observability stack — cardinality and sampling.",
      category: "Observability",
      author: profile.name,
      date: "2026-03-05",
      readTime: "10 min",
      slug: "opentelemetry-observability",
      content: [
        {
          type: "p",
          text: "A dashboard showing \"CPU at 80%\" says nothing about the service as the user sees it. Observability answers the only question that matters in production: what did the user actually experience? To answer it you need traces that stitch a request together across services, metrics that quantify, and logs that explain.",
        },
        { type: "h2", text: "Why all three signals, and not one" },
        {
          type: "p",
          text: "Logs explain an isolated event, metrics quantify a trend, traces tie it all together. On their own, each has a blind spot: logs explode in volume without giving any chronology, metrics aggregate and hide the outlier, traces are expensive to store and get sampled. Together they take you from symptom to cause.",
        },
        { type: "h2", text: "OpenTelemetry: the instrumentation layer" },
        {
          type: "p",
          text: "OpenTelemetry is the standard that unifies the collection of those three signals, in any language, and exports to any backend. The real win is not the library: it is being able to swap Prometheus, Tempo or a SaaS without rewriting a single line of instrumentation.",
        },
        {
          type: "code",
          language: "typescript",
          code: `import { NodeSDK } from "@opentelemetry/sdk-node"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://otel-collector:4318/v1/traces",
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-fs": { enabled: false },
    }),
  ],
  serviceName: "portfolio-api",
})

sdk.start()

process.on("SIGTERM", async () => {
  await sdk.shutdown()
  process.exit(0)
})`,
        },
        {
          type: "p",
          text: "Auto-instrumentation covers HTTP, Express, PostgreSQL, Redis and the Node SDK without touching business code: that is 90% of the work. The remaining 10% is the business spans, the ones no automatic instrumentation can guess. That is where the actual value is: without them you can see the request took 800 ms but not that 700 of those were spent calling the pricing service.",
        },
        {
          type: "code",
          language: "typescript",
          code: `import { SpanStatusCode, trace } from "@opentelemetry/api"

const tracer = trace.getTracer("checkout")

export async function placeOrder(cart: Cart) {
  // A child span: shows up as a segment inside the parent's trace.
  return tracer.startActiveSpan("placeOrder", async (span) => {
    try {
      const total = await priceCart(cart)
      span.setAttribute("cart.items_count", cart.items.length)
      span.setAttribute("cart.total", total)

      const reservation = await reserveStock(cart)
      span.setAttribute("reservation.id", reservation.id)

      return await commitOrder(reservation)
    } catch (error) {
      span.recordException(error as Error)
      span.setStatus({ code: SpanStatusCode.ERROR })
      throw error
    } finally {
      span.end()
    }
  })
}`,
        },
        {
          type: "p",
          text: "`setAttribute` is what separates a useful trace from a wall of context-free spans. `cart.items_count` lets you see at a glance that a 200-item cart takes 12 seconds — something no error rate or average latency will ever reveal. Business attributes turn a technical trace into evidence.",
        },
        { type: "h2", text: "The collection and storage stack" },
        {
          type: "ul",
          items: [
            "OpenTelemetry Collector — the relay. It receives, samples, enriches and routes to several backends. It is the component to deploy first, and the only one that survives a tooling change.",
            "Prometheus — metrics. The de facto standard for pull-based collection, and what Grafana consumes natively.",
            "Tempo — traces, on S3-compatible object storage. Far cheaper than a SaaS backend, and enough to keep fifteen days of traces.",
            "Grafana — the visualisation layer, dashboards and alerting.",
            "Loki — logs, indexed by label rather than by content. One label per service, never per request, or cardinality explodes.",
          ],
        },
        {
          type: "code",
          language: "yaml",
          code: `receivers:
  otlp:
    protocols:
      grpc: {}
      http: {}

processors:
  memory_limiter:
    limit_mib: 512
  batch: {}

exporters:
  prometheus:
    endpoint: 0.0.0.0:8889
  otlphttp/tempo:
    endpoint: http://tempo:4318

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [otlphttp/tempo]
    metrics:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [prometheus]`,
        },
        {
          type: "p",
          text: "The `memory_limiter` is not optional: it is what stops a traffic spike from taking the Collector down, which would by the same token drop the traces at the exact moment they would have been most useful. `batch` cuts network cost by grouping spans before export. The Collector is deployed as a pod sidecar or a cluster DaemonSet — sidecar by default, so a namespace without instrumentation is never a black box.",
        },
        { type: "h2", text: "The classic mistake: cardinality" },
        {
          type: "p",
          text: "Every distinct combination of label values creates a new time series. Using a `user_id` as a metric label creates one series per user: Prometheus memory explodes and the service takes itself down. The rule is simple — metric labels have a bounded number of values. Anything that answers \"who\" or \"which one\" belongs in a trace or a log, never in a label.",
        },
        {
          type: "quote",
          text: "A metric should answer \"how many\" and \"how often\". Anything that answers \"who\" or \"which\" goes into a trace or a log.",
        },
        {
          type: "p",
          text: "That is what OpenTelemetry's semantic conventions are for: they normalise span and attribute names per framework and per database. A NestJS trace and an Express trace then read the same way, which makes the trace explorer usable without learning a new vocabulary for every service.",
        },
        { type: "h2", text: "Sampling, a deliberate trade-off" },
        {
          type: "p",
          text: "You cannot keep 100% of traces at production volume. The default strategy I keep: head-sample errors and slow requests at 100%, and only sample the healthy remainder below a threshold. The alternative, `tail sampling` in the Collector, keeps every error even though errors are rare — but it costs memory, since you have to buffer to decide after the fact.",
        },
        {
          type: "code",
          language: "yaml",
          code: `processors:
  tail_sampling:
    decision_wait: 10s
    policies:
      - name: errors
        type: status_code
        status_code:
          status_codes: [ERROR]
      - name: slow
        type: latency
        latency:
          threshold_ms: 800
      - name: baseline
        type: probabilistic
        probabilistic:
          sampling_percentage: 5`,
        },
        {
          type: "p",
          text: "A span containing an error has a disproportionate incident value: it is the one you will re-read at 3am. Keeping it at 100% costs almost nothing, because it is rare. Conversely, keeping 100% of healthy requests is pure waste. That imbalance is the right default.",
        },
        {
          type: "quote",
          text: "You do not keep every trace. You keep the ones that explain a problem — and you know that problems are mostly errors and latency spikes.",
        },
      ],
    },
    {
      id: "gitops-declarative-sync",
      image: coverGitOps,
      title: "GitOps: why \"kubectl apply\" does not scale",
      excerpt:
        "When the state of a cluster lives in somebody's bash history, nobody knows what is actually deployed or how to replay it. Moving to declarative with Argo CD makes Git the single source of truth.",
      category: "GitOps",
      author: profile.name,
      date: "2026-01-27",
      readTime: "9 min",
      slug: "gitops-declarative-sync",
      content: [
        {
          type: "p",
          text: "Manual deployment works fine for six months. One `kubectl apply -f k8s/`, a couple of quiet fixes with `kubectl edit`, a `rollout restart` to unstick a pod that won't come back. And then one day you are on call and you need to rebuild staging identically. Nobody knows how.",
        },
        { type: "h2", text: "The three symptoms of imperative deployment" },
        {
          type: "ul",
          items: [
            "The real state of the cluster exists only in the memory of whoever changed it.",
            "\"Works on staging\" becomes a hypothesis rather than a guarantee: the two clusters have drifted.",
            "Rollback is a `kubectl rollout undo` if you were lucky enough to keep the history, and a guess otherwise.",
          ],
        },
        { type: "h2", text: "Declarative: you describe the wanted state, the tool reconciles" },
        {
          type: "p",
          text: "The idea is simple: the Git repository holds the Kubernetes manifests, and a controller running inside the cluster watches the repository to keep the cluster in the described state. Nobody applies anything by hand. If someone changes the cluster live, the drift is detected and corrected — or reported, depending on policy.",
        },
        {
          type: "code",
          language: "yaml",
          code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: portfolio-api
  namespace: argocd
spec:
  project: default
  source:
    repoURL: git@github.com:jonica/portfolio.git
    targetRevision: main
    path: deploy/k8s/api
  destination:
    server: https://kubernetes.default.svc
    namespace: api
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true`,
        },
        {
          type: "p",
          text: "`prune: true` deletes resources that are no longer in Git — without it, renaming a `Deployment` leaves an orphaned duplicate behind. `selfHeal: true` reconciles continuously, so a `kubectl edit` loses its change within seconds. That is what makes the model credible: the temporary drift is visible and flagged, not silent and permanent.",
        },
        { type: "h2", text: "The argument that wins in code review" },
        {
          type: "p",
          text: "In an imperative setup, code review covers application code and production is an act of trust. Declaratively, review covers infrastructure too: the PR contains the Deployment, the Service, the Ingress, the ConfigMaps. The diff is readable, the history is complete, and a rollback is a `git revert`.",
        },
        { type: "h2", text: "What it does not solve" },
        {
          type: "p",
          text: "GitOps does not replace secret management — you still need an External Secrets Operator or sealed secrets so the repository stays free of sensitive data. It does not replace database migrations either: a migration must be idempotent, because Argo will replay it. And you need an immutable image registry with precise tags; `latest` makes reconciliation non-deterministic.",
        },
        {
          type: "quote",
          text: "If the production state cannot be read from a repository, it is not reproducible — it is merely inhabited.",
        },
      ],
    },
    {
      id: "gitlab-ci-pipeline",
      image: coverGitlab,
      title: "A four-stage GitLab CI pipeline that actually caches",
      excerpt:
        "A .gitlab-ci.yml that takes 6 minutes can get down to 90 seconds: identical base images, a persisted dependency cache, lint and test jobs running in parallel, artifacts published once.",
      category: "CI/CD",
      author: profile.name,
      date: "2026-01-09",
      readTime: "8 min",
      slug: "gitlab-ci-pipeline",
      content: [
        {
          type: "p",
          text: "A slow CI pipeline is learned quickly to be ignored: you push, you go get a coffee, you come back 8 minutes later. The problem is almost never the runner, it is the amount of work repeated on every commit.",
        },
        { type: "h2", text: "1. Pin image versions, not `latest`" },
        {
          type: "p",
          text: "Using different images across stages is the first source of lost cache. A stage on `node:20` and the next on `node:20-alpine` do not share the same `node_modules` cache. Pin the same image, and the same major version, across every job in a pipeline.",
        },
        {
          type: "code",
          language: "yaml",
          code: `default:
  image: node:24-alpine

variables:
  GIT_DEPTH: "1"

cache:
  key:
    files:
      - pnpm-lock.yaml
  paths:
    - .pnpm-store/
  policy: pull-push`,
        },
        {
          type: "p",
          text: "Keying the cache on `pnpm-lock.yaml` rather than on the branch is what makes the difference: the key changes when dependencies change, not on every commit. `policy: pull-push` on the first job and `pull` on the rest forces the chain — that is cascading cache, each job downloads once and reuses.",
        },
        { type: "h2", text: "2. Parallelise lint, types and tests" },
        {
          type: "p",
          text: "These three checks are independent. Running them in a single sequential job means paying for checkout and installation three times over. In parallel, the pipeline takes as long as its slowest job.",
        },
        {
          type: "code",
          language: "yaml",
          code: `quality:
  stage: check
  parallel:
    matrix:
      - JOB: lint
        SCRIPT: pnpm run lint
      - JOB: types
        SCRIPT: pnpm exec tsc --noEmit
      - JOB: test
        SCRIPT: pnpm run test
  script: echo "Running $JOB" && $SCRIPT`,
        },
        { type: "h2", text: "3. Publish artifacts exactly once" },
        {
          type: "p",
          text: "The `dist/` built in the build job is the only artifact downstream stages need. Publishing it from every job duplicates storage and slows the transfer. Publish it in the build job and let downstream jobs fetch it with `needs`.",
        },
        {
          type: "ul",
          items: [
            "`needs` avoids waiting for a whole stage when you only depend on one job — a real saving on multi-branch pipelines.",
            "`artifacts: expire_in: 1 week` stops CI from becoming the project's biggest storage consumer.",
            "On non-main branches, skip the image build: that is runner time burned for nothing.",
          ],
        },
        { type: "h2", text: "4. Measure before you optimise" },
        {
          type: "p",
          text: "GitLab's pipeline page shows the duration per job, and that is where the answer is. On a typical pipeline: 6 min 10 before, 1 min 25 after — and the stage that dominated was almost always dependency installation, not the tests.",
        },
        {
          type: "quote",
          text: "Optimising a pipeline starts by looking at where the time goes, not guessing what is slow.",
        },
      ],
    },
    {
      id: "zod-runtime-validation",
      image: coverZod,
      title: "Zod: type-checking is not enough, the data comes from outside",
      excerpt:
        "TypeScript erases its types at compile time. An environment variable, a request body, a Keycloak payload: all of it arrives at runtime with a shape the compiler never saw. Zod makes that boundary explicit.",
      category: "TypeScript",
      author: profile.name,
      date: "2025-12-15",
      readTime: "6 min",
      slug: "zod-runtime-validation",
      content: [
        {
          type: "p",
          text: "The classic misunderstanding: `const port: number = process.env.PORT` compiles perfectly, and `process.env.PORT` is really `string | undefined`. The type lies, because TypeScript checks shapes the code declares, not shapes the data actually has at runtime.",
        },
        { type: "h2", text: "Where the boundary is actually crossed" },
        {
          type: "ul",
          items: [
            "Environment variables — the most common source and the most critical: a missing secret must never surface as a 500.",
            "HTTP request bodies — a client can send anything, and types stop at the controller boundary.",
            "Third-party API responses — Keycloak, a payment provider, any external service.",
            "Configuration files and values injected by the infrastructure.",
          ],
        },
        { type: "h2", text: "One schema, one type, no duplication" },
        {
          type: "p",
          text: "Zod lets you write the schema once and derive the TypeScript type from it. The schema is the source of truth, the type is an artefact. The inversion is deliberate: the schema is what executes, so it is correct by construction.",
        },
        {
          type: "code",
          language: "typescript",
          code: `import { z } from "zod"

const port = z.coerce.number().int().min(1).max(65535)
const nodeEnv = z.enum(["production", "staging", "development"])
const logFormat = z.enum(["json", "pretty"])

const schema = z.object({
  PORT: port.default(3000),
  NODE_ENV: nodeEnv.default("development"),
  LOG_FORMAT: logFormat.default("pretty"),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, "JWT_SECRET is too short (min 32 characters)"),
  KEYCLOAK_ISSUER: z.string().url(),
})

export const env = schema.parse(process.env)`,
        },
        {
          type: "p",
          text: "`z.coerce.number()` is the small touch that removes half of all schemas: the environment variable is a string and you want a number. `z.string().min(32)` turns an undersized secret into a startup failure rather than a security incident three months later. And the schema can be introspected, so `z.infer<typeof schema>` in function signatures gives you autocomplete without duplication.",
        },
        {
          type: "p",
          text: "`parse` throws a `ZodError` carrying the path of the offending field. What matters is catching it as close to startup as possible, before the connection pool opens or anything is written: fail fast, once, while it is still cheap.",
        },
        { type: "h2", text: "And on the HTTP boundaries" },
        {
          type: "p",
          text: "Same principle on the request side. A NestJS DTO that validates the type but not the format lets `age: \"abc\"` through to the database. Validating at the edge turns a 500 into a 400 with an actionable message.",
        },
        {
          type: "code",
          language: "typescript",
          code: `const CreateUser = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(80),
  role: z.enum(["admin", "editor", "viewer"]),
  age: z.number().int().min(18).max(120).optional(),
})`,
        },
        {
          type: "quote",
          text: "Types protect the code you write. Schemas protect the code other people send you.",
        },
      ],
    },
    {
      id: "nginx-reverse-proxy-tls",
      image: coverNginx,
      title: "Nginx as a front door: TLS, compression and security headers in one file",
      excerpt:
        "Behind a reverse proxy, performance is won on a few misunderstood directives: buffering, keep-alive, buffer sizes. And security on the response headers almost nobody sets.",
      category: "Infrastructure",
      author: profile.name,
      date: "2025-11-24",
      readTime: "7 min",
      slug: "nginx-reverse-proxy-tls",
      content: [
        {
          type: "p",
          text: "Nginx is the most underrated component in a stack: it does nothing spectacular, but a bad config is paid for in p99 latency and attack surface. Here is the base I use, with the comments that explain why.",
        },
        { type: "h2", text: "The server block" },
        {
          type: "code",
          language: "nginx",
          code: `server {
  listen 443 ssl;
  http2 on;
  server_name app.example.mg;

  ssl_certificate     /etc/letsencrypt/live/app.example.mg/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/app.example.mg/privkey.pem;
  ssl_protocols       TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;
  ssl_session_cache   shared:SSL:10m;
  ssl_session_timeout 1d;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options    "nosniff" always;
  add_header X-Frame-Options           "DENY" always;
  add_header Referrer-Policy           "strict-origin-when-cross-origin" always;
  add_header Content-Security-Policy    "default-src 'self'" always;

  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;

  location / {
    proxy_pass http://app_upstream;
    proxy_http_version 1.1;
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Connection        "";
  }
}`,
        },
        {
          type: "p",
          text: "Three details matter more than the rest. `Connection \"\"` combined with `proxy_http_version 1.1`: without it, Nginx opens a fresh TCP connection to the upstream for every request, cancelling out the keep-alive benefit. `ssl_prefer_server_ciphers off`: on TLS 1.3 the client's preference order is the correct one, and forcing the server's usually degrades the negotiated cipher for no reason. And `X-Forwarded-Proto` is mandatory behind a load balancer — without it the app thinks it is on HTTP and generates `http://` links.",
        },
        { type: "h2", text: "Buffering, the number one source of latency" },
        {
          type: "p",
          text: "Nginx buffers the upstream response by default. That is good for a page-based site and bad for a streaming API: the first bytes are held until the buffer fills or the request completes, adding up to `proxy_buffer_size` of latency.",
        },
        {
          type: "ul",
          items: [
            "`proxy_buffering off;` for anything that streams (SSE, WebSocket, LLM token streaming).",
            "`proxy_request_buffering off;` to forward the request body as it arrives, useful for large uploads.",
            "`keepalive_timeout 65;` on the client side plus an `upstream` block with `keepalive 32;` server side: without the upstream `keepalive`, the client-side directive does nothing.",
            "`client_max_body_size 10m;` — the default is 1 MB, and the symptom is a bewildering 413 on the client.",
          ],
        },
        { type: "h2", text: "Renewing certificates without downtime" },
        {
          type: "p",
          text: "Certbot in webroot mode, reloaded by a systemd hook, avoids the connection drop of standalone mode. You serve the ACME challenges from the webroot, then reload Nginx after each renewal.",
        },
        {
          type: "code",
          language: "bash",
          code: `# /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
#!/bin/sh
nginx -t && systemctl reload nginx`,
        },
        {
          type: "quote",
          text: "If you have not profiled your buffers, `proxy_buffering off` is the highest-return change you will make this year.",
        },
      ],
    },

  ],
}

export const getBlogPosts = (locale: Locale) => blogPosts[locale]
