import { SectionTitle } from "@/components/atoms";
import { CarouselControls } from "@/components/molecules/CarouselControls";
import { Doodle, DoodleLayer } from "@/components/molecules/Doodles";
import { ProjectModal } from "@/components/molecules/ProjectModal";
import {
  WorkProjectCard,
  type WorkProject,
} from "@/components/molecules/WorkProjectCard";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

/** Nombre de projets affichés par page. */
const PROJECTS_PER_PAGE = 3;

interface WorksSectionProps {
  title?: string;
  subtitle?: string;
  projects?: WorkProject[];
  className?: string;
  accentColor?: string;
}

/**
 * Organism — réalisations paginées par 3 (design `blue-portfolio` :
 * cartes `rounded-xl border p-2`, hover `-translate-y-2` + bordure cyan) avec
 * la modale de détail conservée.
 */
export function WorksSection({
  title,
  subtitle,
  projects = [],
  className,
  accentColor = "#00C7FF",
}: WorksSectionProps) {
  const { t } = useI18n();
  const [page, setPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const visibleProjects = useMemo(
    () =>
      projects.slice(
        page * PROJECTS_PER_PAGE,
        page * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE,
      ),
    [projects, page],
  );

  const goToPage = (index: number) =>
    setPage(Math.max(0, Math.min(index, totalPages - 1)));

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
        "relative isolate w-full overflow-hidden bg-[#000A1F] py-24 md:py-32",
        className,
      )}
    >
      <DoodleLayer>
        <Doodle
          src="/static/doodles/projects/ahh.svg"
          position="right-[8%] top-[6%] hidden lg:block"
          width={104}
          opacity={0.5}
          delay={0.5}
        />
        <Doodle
          src="/static/doodles/projects/ooh.svg"
          position="right-[20%] top-[26%] hidden xl:block"
          width={96}
          opacity={0.45}
          delay={1.8}
        />
        <Doodle
          src="/static/doodles/projects/squiggle.svg"
          position="left-[3%] bottom-[14%] hidden lg:block"
          width={52}
          opacity={0.5}
          delay={2.6}
        />
      </DoodleLayer>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 md:gap-16">
        {/* Titre à gauche, sous-titre à droite */}
        <div
          data-reveal
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-20"
        >
          <SectionTitle
            title={title ?? t("works.title")}
            className="shrink-0 md:max-w-lg"
            accentColor={accentColor}
          />
          <p className="max-w-md text-base text-gray-300">
            {subtitle ?? t("works.subtitle")}
          </p>
        </div>

        {/* Grille de projets — 3 par page */}
        {projects.length > 0 && (
          <div data-reveal className="flex flex-col gap-12">
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <WorkProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => openModal(project)}
                  accentColor={accentColor}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <CarouselControls
                total={totalPages}
                currentIndex={page}
                onPrev={() => goToPage(page - 1)}
                onNext={() => goToPage(page + 1)}
                onDotClick={goToPage}
                accentColor={accentColor}
              />
            )}
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