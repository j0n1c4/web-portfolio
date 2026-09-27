import BG_WORK from "@/assets/background/work.svg";
import { ScrollIndicator, SectionTitle } from "@/components/atoms";
import { CarouselControls } from "@/components/molecules/CarouselControls";
import { ProjectModal } from "@/components/molecules/ProjectModal";
import {
  WorkProjectCard,
  type WorkProject,
} from "@/components/molecules/WorkProjectCard";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { useCallback, useMemo, useState } from "react";

interface WorksSectionProps {
  title?: string;
  subtitle?: string;
  projects?: WorkProject[];
  showScrollIndicator?: boolean;
  className?: string;
  bgColor?: string;
  accentColor?: string;
}

/** Organism — projects carousel (2 per slide) with detail modal */
export function WorksSection({
  title,
  subtitle,
  projects = [],
  showScrollIndicator = true,
  className,
  bgColor = BG_WORK,
  accentColor = "#12F7D6",
}: WorksSectionProps) {
  const { t } = useI18n()
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
      className={cn(
        "relative isolate overflow-hidden bg-[#1A1E23] py-24 md:py-32",
        className,
      )}
    >
      {/* Background layer — aplat sur mobile, image à partir de lg */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden scale-110 bg-cover bg-center bg-no-repeat lg:block"
        style={{ backgroundImage: `url("${bgColor}")` }}
      />

      <div className="mx-auto max-w-7xl px-4 z-20">
        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="mb-16 flex justify-center">
            <ScrollIndicator accentColor={accentColor} />
          </div>
        )}

        {/* Section Title */}
        <div className="mb-20">
          <SectionTitle
            variant="centered"
            title={title ?? t("works.title")}
            subtitle={subtitle ?? t("works.subtitle")}
            accentColor={accentColor}
          />
        </div>

        {/* Carousel Container */}
        {totalSlides > 0 && (
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
        )}
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
