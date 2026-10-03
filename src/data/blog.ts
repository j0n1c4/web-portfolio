import coverDocker from "@/assets/blog/docker-multi-stage-build.svg";
import coverGitlab from "@/assets/blog/gitlab-ci-pipeline.svg";
import coverGitOps from "@/assets/blog/gitops-declarative-sync.svg";
import coverK8s from "@/assets/blog/kubernetes-resource-limits.svg";
import coverOtel from "@/assets/blog/opentelemetry-observability.svg";
import coverZod from "@/assets/blog/zod-runtime-validation.svg";
import type { BlogPost } from "@/components/molecules/BlogCard";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n";

/**
 * Blog — Six articles récents axés sur les dernières avancées DevOps & Dev (2025/2026).
 * Rédigés en français (fr) et anglais (en) avec le même id pour chaque locale.
 */
const blogPosts: Record<Locale, BlogPost[]> = {
  fr: [
    {
      id: "kubernetes-dra-gpu-scheduling",
      image: coverK8s,
      title:
        "Kubernetes 1.32+ et Dynamic Resource Allocation (DRA) : l'ère post-limits",
      excerpt:
        "La gestion classique 'requests/limits' montre ses limites avec les workloads IA et GPU. Découvrez comment DRA réinvente l'allocation fine des ressources matérielles dans Kubernetes.",
      category: "Kubernetes",
      author: profile.name,
      date: "2026-03-15",
      readTime: "9 min",
      slug: "kubernetes-dra-gpu-scheduling",
      content: [
        {
          type: "p",
          text: "Pendant des années, le modèle 'requests et limits' a suffi pour planifier des conteneurs CPU/Memory. Cependant, l'explosion des workloads d'Intelligence Artificielle et le besoin d'accès direct aux puces spécialisées (GPU, TPU, cartes réseau SR-IOV) ont révélé une rigidité structurelle. Kubernetes 1.32 accélère la transition vers le Dynamic Resource Allocation (DRA).",
        },
        { type: "h2", text: "Le problème de l'allocation opaque des GPU" },
        {
          type: "p",
          text: "Historiquement, déclarer `nvidia.com/gpu: 1` réservait une carte entière sans visibilité sur sa mémoire vRAM, ses cœurs CUDA ou sa topologie réseau (NVLink). DRA introduit un modèle d'allocation structuré basé sur des Claim-Parameters et des ResourceSlices.",
        },
        {
          type: "code",
          language: "yaml",
          code: `apiVersion: resource.k8s.io/v1alpha3
kind: ResourceClaim
metadata:
  name: gpu-claim
spec:
  devices:
    requests:
      - name: req-gpu
        deviceClassName: gpu.nvidia.com
        selectors:
          - cel:
              expression: "device.driver == '550.54' && device.memory >= 24Gi"`,
        },
        {
          type: "p",
          text: "Grâce aux expressions CEL (Common Expression Language), le scheduler K8s choisit le composant exact répondant aux contraintes techniques de l'application avant même le démarrage du Pod.",
        },
        { type: "h2", text: "Impact en production" },
        {
          type: "ul",
          items: [
            "Partage granulaire des accélérateurs matériels entre microservices.",
            "Réduction drastique des coûts d'infrastructure Cloud / GPU sur-provisionnés.",
            "Elimination des conflits d'allocation grâce au scheduling prédictif au niveau du plan de contrôle.",
          ],
        },
        {
          type: "quote",
          text: "DRA transforme Kubernetes d'un simple orchestrateur de conteneurs en une véritable plateforme d'exécution pour infrastructures hétérogènes.",
        },
      ],
    },
    {
      id: "docker-containerd-build-cloud",
      image: coverDocker,
      title: "Docker & Containerd Store : accélérer vos builds CI/CD de 70%",
      excerpt:
        "L'intégration complète du magasin de stockage containerd dans Docker Desktop et Engine modifie la gestion des images et des layers. Analyse des gains d'efficacité.",
      category: "Docker",
      author: profile.name,
      date: "2026-02-28",
      readTime: "7 min",
      slug: "docker-containerd-build-cloud",
      content: [
        {
          type: "p",
          text: "La convergence entre le moteur Docker traditionnel et le runtime `containerd` est désormais finalisée. En adoptant l'intégration containerd image store, Docker supprime le goulot d'émulation classique et active le support complet des images multi-architectures natifs (Wasm, arm64, amd64).",
        },
        { type: "h2", text: "Le build multi-arch sans douleur" },
        {
          type: "p",
          text: "Auparavant, construire une image pour `linux/amd64` depuis un Mac Apple Silicon (M-series) imposait une émulation QEMU extrêmement lente. Le nouveau système d'exportation BuildKit combiné à containerd permet de partager le cache entre architectures distinctes.",
        },
        {
          type: "code",
          language: "dockerfile",
          code: `# syntax=docker/dockerfile:1.7
FROM --platform=$BUILDPLATFORM node:24-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \\
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:24-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
USER node
CMD ["node", "dist/main.js"]`,
        },
        {
          type: "p",
          text: "L'instruction `--mount=type=cache` couplée aux fonctionnalités récents de Docker Build Cloud évite le téléchargement répétitif des paquets sur la CI, réduisant le temps d'exécution global sous la barre des 60 secondes.",
        },
        {
          type: "quote",
          text: "Ne mettez plus de dépendances dans vos images finales : laissez le cache BuildKit faire le travail en amont.",
        },
      ],
    },
    {
      id: "opentelemetry-ebpf-observability",
      image: coverOtel,
      title:
        "Observabilité eBPF avec OpenTelemetry : l'auto-instrumentation sans code",
      excerpt:
        "La combinaison d'eBPF au niveau noyau et d'OpenTelemetry révolutionne la collecte de métriques et de traces sans altérer les binaires applicatifs.",
      category: "Observabilité",
      author: profile.name,
      date: "2026-03-02",
      readTime: "10 min",
      slug: "opentelemetry-ebpf-observability",
      content: [
        {
          type: "p",
          text: "L'obligation d'injecter des SDKs dans chaque microservice pour obtenir des données de télémétrie touche à sa fin. Grâce aux sondes eBPF (Extended Berkeley Packet Filter), le noyau Linux capture directement les appels système, le trafic réseau et la latence HTTP/gRPC.",
        },
        { type: "h2", text: "Comment eBPF et OpenTelemetry s'articulent" },
        {
          type: "p",
          text: "Un agent léger déployé en tant que DaemonSet écoute les événements système du Kernel sans surcoût CPU notable. Il enrichit automatiquement les traces avec les métadonnées de Pod, Namespace et Service K8s avant de les réexpédier vers Grafana Tempo ou Prometheus.",
        },
        {
          type: "code",
          language: "yaml",
          code: `apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: otel-ebpf-agent
spec:
  config: |
    receivers:
      ebpf:
        network:
          enable: true
        http:
          enable: true
    exporters:
      otlphttp/tempo:
        endpoint: http://tempo:4318
    service:
      pipelines:
        traces:
          receivers: [ebpf]
          exporters: [otlphttp/tempo]`,
        },
        {
          type: "quote",
          text: "L'observabilité basée eBPF comble 80 % des besoins d'instrumentation dès la première minute de déploiement, sans recompilation.",
        },
      ],
    },
    {
      id: "opentofu-gitops-infrastructure",
      image: coverGitOps,
      title:
        "OpenTofu 1.9+ & GitOps : au-delà de Terraform avec le dÃ©claratif d'état",
      excerpt:
        "Le projet open source OpenTofu accélère l'innovation avec le chiffrement natif du State, les boucles 'for_each' avancées et une intégration étroite avec Argo CD.",
      category: "GitOps",
      author: profile.name,
      date: "2026-02-10",
      readTime: "8 min",
      slug: "opentofu-gitops-infrastructure",
      content: [
        {
          type: "p",
          text: "Suite au changement de licence de Terraform, la fondation Linux et le projet OpenTofu ont redressé la barre avec des fonctionnalités attendues par la communauté : chiffrement bout-en-bout du fichier d'état (State), évaluation dynamique des modules et support Natif dans Argo CD.",
        },
        { type: "h2", text: "Chiffrement natif du d'état" },
        {
          type: "p",
          text: "Finie la nécessité de combiner Vault ou S3 SSE pour sécuriser les secrets contenus dans le State. OpenTofu chiffre nativement les données sensibles directement lors du calcul de l'état.",
        },
        {
          type: "code",
          language: "hcl",
          code: `opentofu {
  encryption {
    key_provider "aws_kms" "main" {
      kms_key_id = "arn:aws:kms:eu-west-3:123456789:key/abc-123"
      region     = "eu-west-3"
    }
    method "aes_gcm" "strict" {
      keys = key_provider.aws_kms.main
    }
    state {
      method = method.aes_gcm.strict
    }
  }
}`,
        },
        {
          type: "quote",
          text: "Grâce à OpenTofu, l'Infrastructure-as-Code (IaC) retrouve un modèle ouvert, sécurisé et totalement adapté aux pipelines GitOps modernes.",
        },
      ],
    },
    {
      id: "nodejs-native-typescript-corepack",
      image: coverGitlab,
      title: "Node.js 24 LTS : Exécuter TypeScript sans compilation explicite",
      excerpt:
        "Node.js intègre le support natif du striping de types TypeScript. Quel impact sur les pipelines CI/CD et l'expérience de développement local ?",
      category: "TypeScript",
      author: profile.name,
      date: "2026-01-20",
      readTime: "6 min",
      slug: "nodejs-native-typescript-corepack",
      content: [
        {
          type: "p",
          text: "Avec Node.js 24 LTS, le drapeau `--experimental-strip-types` devient stable et actif par défaut. Le moteur V8 supprime les annotations de types à la volée, permettant d'exécuter directement des fichiers `.ts` sans étape préalable de compilation (`tsc` ou `tsx`).",
        },
        { type: "h2", text: "Simplicité dans la CI" },
        {
          type: "p",
          text: "Les pipelines de tests unitaires et de vérification de scripts n'ont plus besoin d'outils tiers pour interpréter le code TypeScript, réduisant le temps de démarrage des scripts de déploiement à zéro.",
        },
        {
          type: "code",
          language: "bash",
          code: `# Exécution directe d'un script TypeScript avec Node.js 24+
node --enable-source-maps src/index.ts`,
        },
        {
          type: "quote",
          text: "Moins de dépendances dans package.json signifie des builds plus rapides et une surface d'attaque fortement réduite.",
        },
      ],
    },
    {
      id: "zod-type-safe-contracts",
      image: coverZod,
      title:
        "Zod v3.24+ & Full-Stack Type Safety : Sécuriser les API du Frontend au Runtime",
      excerpt:
        "Validation au runtime, génération OpenAPI automatique et validation d'invariants métier : Zod s'impose comme le pivot des architectures modernes Web et Serverless.",
      category: "TypeScript",
      author: profile.name,
      date: "2026-02-05",
      readTime: "7 min",
      slug: "zod-type-safe-contracts",
      content: [
        {
          type: "p",
          text: "À mesure que les frameworks comme Next.js ou SvelteKit adoptent les Server Actions et le rendu hybride, la frontière entre le client et le serveur s'estompe. Zod sert de garantie absolue contre l'injection de données non conformes.",
        },
        { type: "h2", text: "Inférence et validation stricte" },
        {
          type: "p",
          text: "La validation n'est plus seulement technique (chaîne, nombre) mais fonctionnelle, avec le support natif de la transformation asynchrone.",
        },
        {
          type: "code",
          language: "typescript",
          code: `import { z } from "zod"

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
})

export type UserRegistration = z.infer<typeof userRegistrationSchema>`,
        },
        {
          type: "quote",
          text: "Ne faites jamais confiance aux entrées utilisateur : validez-les à la frontière avec un schéma immuable.",
        },
      ],
    },
  ],
  en: [
    {
      id: "kubernetes-dra-gpu-scheduling",
      image: coverK8s,
      title:
        "Kubernetes 1.32+ & Dynamic Resource Allocation (DRA): The Post-Limits Era",
      excerpt:
        "Traditional 'requests/limits' struggle with AI & GPU workloads. Discover how DRA reinvents hardware allocation in Kubernetes.",
      category: "Kubernetes",
      author: profile.name,
      date: "2026-03-15",
      readTime: "9 min",
      slug: "kubernetes-dra-gpu-scheduling",
      content: [
        {
          type: "p",
          text: "For years, CPU and memory requests/limits served container scheduling well. However, the surge in AI workloads and specialized hardware (GPUs, TPUs, SR-IOV) exposed structural limitations. Kubernetes 1.32 accelerates the shift toward Dynamic Resource Allocation (DRA).",
        },
        { type: "h2", text: "The Problem with Opaque GPU Allocation" },
        {
          type: "p",
          text: "Historically, requesting `nvidia.com/gpu: 1` locked an entire device without visibility into vRAM, CUDA cores, or NVLink topology. DRA introduces structured claim parameters and ResourceSlices.",
        },
        {
          type: "code",
          language: "yaml",
          code: `apiVersion: resource.k8s.io/v1alpha3
kind: ResourceClaim
metadata:
  name: gpu-claim
spec:
  devices:
    requests:
      - name: req-gpu
        deviceClassName: gpu.nvidia.com
        selectors:
          - cel:
              expression: "device.driver == '550.54' && device.memory >= 24Gi"`,
        },
        {
          type: "quote",
          text: "DRA transforms Kubernetes from a container orchestrator into an execution platform for heterogeneous infrastructure.",
        },
      ],
    },
    {
      id: "docker-containerd-build-cloud",
      image: coverDocker,
      title: "Docker & Containerd Store: Speed Up CI/CD Builds by 70%",
      excerpt:
        "Full integration of the containerd image store inside Docker Engine changes image storage and layer caching forever.",
      category: "Docker",
      author: profile.name,
      date: "2026-02-28",
      readTime: "7 min",
      slug: "docker-containerd-build-cloud",
      content: [
        {
          type: "p",
          text: "The convergence between the classic Docker Engine and the `containerd` runtime is complete. Enabling the containerd store enables native multi-architecture support and seamless BuildKit caching.",
        },
        { type: "h2", text: "Painless Multi-Arch Builds" },
        {
          type: "code",
          language: "dockerfile",
          code: `# syntax=docker/dockerfile:1.7
FROM --platform=$BUILDPLATFORM node:24-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \\
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:24-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/dist ./dist
USER node
CMD ["node", "dist/main.js"]`,
        },
        {
          type: "quote",
          text: "Stop storing build dependencies in final images: let BuildKit's cache do the heavy lifting.",
        },
      ],
    },
    {
      id: "opentelemetry-ebpf-observability",
      image: coverOtel,
      title: "eBPF-powered OpenTelemetry: Zero-Code Auto-Instrumentation",
      excerpt:
        "Combining eBPF kernel probes with OpenTelemetry revolutionizes metric and trace collection without touching application code.",
      category: "Observability",
      author: profile.name,
      date: "2026-03-02",
      readTime: "10 min",
      slug: "opentelemetry-ebpf-observability",
      content: [
        {
          type: "p",
          text: "The era of embedding SDKs into every microservice is coming to an end. Extended Berkeley Packet Filters (eBPF) capture system calls, network flows, and HTTP/gRPC latency directly from the Linux Kernel.",
        },
        {
          type: "code",
          language: "yaml",
          code: `apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: otel-ebpf-agent
spec:
  config: |
    receivers:
      ebpf:
        network:
          enable: true
        http:
          enable: true
    exporters:
      otlphttp/tempo:
        endpoint: http://tempo:4318
    service:
      pipelines:
        traces:
          receivers: [ebpf]
          exporters: [otlphttp/tempo]`,
        },
        {
          type: "quote",
          text: "eBPF observability covers 80% of instrumentation needs out of the box, without requiring recompilation.",
        },
      ],
    },
    {
      id: "opentofu-gitops-infrastructure",
      image: coverGitOps,
      title: "OpenTofu 1.9+ & GitOps: Beyond Terraform with Encrypted State",
      excerpt:
        "OpenTofu drives open-source IaC forward with native state encryption and deep Argo CD integration.",
      category: "GitOps",
      author: profile.name,
      date: "2026-02-10",
      readTime: "8 min",
      slug: "opentofu-gitops-infrastructure",
      content: [
        {
          type: "p",
          text: "Following Terraform's license shift, OpenTofu delivered highly requested community features: end-to-end state encryption and dynamic module evaluation.",
        },
        {
          type: "code",
          language: "hcl",
          code: `opentofu {
  encryption {
    key_provider "aws_kms" "main" {
      kms_key_id = "arn:aws:kms:eu-west-3:123456789:key/abc-123"
      region     = "eu-west-3"
    }
    method "aes_gcm" "strict" {
      keys = key_provider.aws_kms.main
    }
    state {
      method = method.aes_gcm.strict
    }
  }
}`,
        },
        {
          type: "quote",
          text: "OpenTofu returns Infrastructure-as-Code to an open, secure model designed for modern GitOps.",
        },
      ],
    },
    {
      id: "nodejs-native-typescript-corepack",
      image: coverGitlab,
      title: "Node.js 24 LTS: Execute TypeScript Without Build Steps",
      excerpt:
        "Node.js natively strips TypeScript annotations on the fly. How does this streamline CI/CD pipelines?",
      category: "TypeScript",
      author: profile.name,
      date: "2026-01-20",
      readTime: "6 min",
      slug: "nodejs-native-typescript-corepack",
      content: [
        {
          type: "p",
          text: "With Node.js 24 LTS, type stripping is enabled by default. The V8 engine removes type annotations on the fly, running `.ts` files directly without transpilation steps.",
        },
        {
          type: "code",
          language: "bash",
          code: `# Execute TypeScript directly in Node.js 24+
node --enable-source-maps src/index.ts`,
        },
        {
          type: "quote",
          text: "Fewer dependencies in package.json mean faster build pipelines and smaller attack surfaces.",
        },
      ],
    },
    {
      id: "zod-type-safe-contracts",
      image: coverZod,
      title: "Zod v3.24+: Runtime Type Safety from Edge to Server",
      excerpt:
        "Runtime validation and OpenAPI generation make Zod essential for modern Serverless and Web applications.",
      category: "TypeScript",
      author: profile.name,
      date: "2026-02-05",
      readTime: "7 min",
      slug: "zod-type-safe-contracts",
      content: [
        {
          type: "p",
          text: "As full-stack frameworks blur the client-server boundary, Zod guarantees runtime safety across API endpoints and Server Actions.",
        },
        {
          type: "code",
          language: "typescript",
          code: `import { z } from "zod"

export const userRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
})

export type UserRegistration = z.infer<typeof userRegistrationSchema>`,
        },
        {
          type: "quote",
          text: "Never trust raw user input: validate it at the boundary with an immutable schema.",
        },
      ],
    },
  ],
};

export const getBlogPosts = (locale: Locale) => blogPosts[locale];
