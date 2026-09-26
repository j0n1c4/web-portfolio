import BG_WORK from "@/assets/background/work.svg";
import heroImage from "@/assets/hero.png";
import { ScrollIndicator, SectionTitle } from "@/components/atoms";
import { CarouselControls } from "@/components/molecules/CarouselControls";
import { ProjectModal } from "@/components/molecules/ProjectModal";
import {
  WorkProjectCard,
  type WorkProject,
} from "@/components/molecules/WorkProjectCard";
import { cn } from "@/lib/utils";
import { useCallback, useMemo, useState } from "react";

interface WorksSectionProps {
  title?: string;
  subtitle?: string;
  projects?: WorkProject[];
  className?: string;
  bgColor?: string;
  accentColor?: string;
}

// Mock Data — 6 projects (3 slides of 2)
const baseProjects: WorkProject[] = [
  {
    id: "1",
    image: heroImage,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with payment integration and inventory management.",
    longDescription:
      "Built a comprehensive e-commerce platform featuring real-time inventory tracking, secure payment processing via Stripe, and an admin dashboard for order management. The system handles over 1000 concurrent users with optimized database queries.",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["React", "Node.js", "MongoDB"],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe API",
      "Redis",
    ],
  },
  {
    id: "2",
    image: heroImage,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates and team workflows.",
    longDescription:
      "Developed a collaborative project management tool inspired by Trello and Asana. Features include drag-and-drop boards, real-time WebSocket updates, file attachments, and role-based access control for teams.",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["Vue.js", "Firebase", "Tailwind"],
    technologies: [
      "Vue.js",
      "Vuex",
      "Firebase",
      "Firestore",
      "Tailwind CSS",
      "Socket.io",
    ],
  },
  {
    id: "3",
    image: heroImage,
    title: "Weather Dashboard",
    description:
      "Real-time weather data visualization with interactive maps and forecasts.",
    longDescription:
      "Created an interactive weather dashboard that aggregates data from multiple APIs. Includes 7-day forecasts, radar maps, severe weather alerts, and historical data analysis with Chart.js visualizations.",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["React", "API", "Chart.js"],
    technologies: [
      "React",
      "OpenWeather API",
      "Mapbox GL",
      "Chart.js",
      "Axios",
      "Context API",
    ],
  },
  {
    id: "4",
    image: heroImage,
    title: "Social Media Clone",
    description:
      "Full-featured social platform with auth, feeds, and messaging.",
    longDescription:
      "Engineered a social media clone with user authentication, post creation, comment threads, direct messaging, and notification systems. Implemented infinite scroll and image optimization for performance.",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "Cloudinary",
      "Pusher",
    ],
  },
];

const moreProjects: WorkProject[] = [
  {
    id: "5",
    image: heroImage,
    title: "Portfolio Generator",
    description:
      "Dynamic portfolio builder with customizable themes and templates.",
    longDescription:
      "Built a no-code portfolio generator allowing users to create professional portfolios in minutes. Features include drag-and-drop layout editor, theme customization, domain mapping, and SEO optimization tools.",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["Svelte", "Supabase", "Vercel"],
    technologies: [
      "SvelteKit",
      "Supabase",
      "Tailwind CSS",
      "Vercel Edge Functions",
      "MDX",
    ],
  },
  {
    id: "6",
    image: heroImage,
    title: "AI Chat Interface",
    description:
      "Modern chat interface for AI assistants with streaming responses.",
    longDescription:
      "Designed a sleek chat interface optimized for LLM interactions. Supports markdown rendering, code syntax highlighting, conversation history, and token usage tracking with a responsive mobile-first design.",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["React", "OpenAI", "Tailwind"],
    technologies: [
      "React",
      "OpenAI API",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
      "Vite",
    ],
  },
];

const defaultProjects: WorkProject[] = [...baseProjects, ...moreProjects];
/** Organism — projects carousel (2 per slide) with detail modal */
export function WorksSection({
  title = "Works",
  subtitle = "I had the pleasure of working with these awesome projects",
  projects = defaultProjects,
  className,
  bgColor = BG_WORK,
  accentColor = "#12F7D6",
}: WorksSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group projects into pairs (2 per slide)
  const slides = useMemo(() => {
    const result: WorkProject[][] = [];
    for (let i = 0; i < projects.length; i += 2) {
      result.push(projects.slice(i, i + 2));
    }
    return result;
  }, [projects]);

  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides],
  );

  const next = useCallback(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  const prev = useCallback(() => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }, [currentSlide, totalSlides, goToSlide]);

  const openModal = (project: WorkProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="projects"
      className={cn("relative overflow-hidden py-24 md:py-32", className)}
    >
      {/* Blurred background layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-110 bg-cover bg-center"
        style={{ backgroundImage: `url("${bgColor}")` }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 z-20">
        {/* Scroll Indicator */}
        <div className="mb-16 flex justify-center">
          <ScrollIndicator accentColor={accentColor} />
        </div>

        {/* Section Title */}
        <div className="mb-20">
          <SectionTitle
            variant="centered"
            title={title}
            subtitle={subtitle}
            accentColor={accentColor}
          />
        </div>

        {/* Carousel Container */}
        <div className="relative mx-auto max-w-6xl">
          {/* Slides Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideProjects, slideIndex) => (
                <div key={slideIndex} className="w-full shrink-0 px-4">
                  <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                    {slideProjects.map((project) => (
                      <WorkProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => openModal(project)}
                        accentColor={accentColor}
                      />
                    ))}

                    {/* Empty placeholder if odd number of projects */}
                    {slideProjects.length === 1 && (
                      <div className="hidden md:block" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <CarouselControls
            total={totalSlides}
            currentIndex={currentSlide}
            onPrev={prev}
            onNext={next}
            onDotClick={goToSlide}
            accentColor={accentColor}
          />
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        accentColor={accentColor}
      />
    </section>
  );
}
