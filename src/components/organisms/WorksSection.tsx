import { SectionTitle } from "@/components/atoms";
import { Doodle, DoodleLayer } from "@/components/molecules/Doodles";
import { Pagination } from "@/components/molecules/Pagination";
import { ProjectModal } from "@/components/molecules/ProjectModal";
import {
  WorkProjectCard,
  type WorkProject,
} from "@/components/molecules/WorkProjectCard";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";

/** Choix « par page » proposés au visiteur : 3, 6 ou 9 réalisations. */
const PER_PAGE_OPTIONS = [3, 6, 9];

interface WorksSectionProps {
  title?: string;
  subtitle?: string;
  projects?: WorkProject[];
  className?: string;
  accentColor?: string;
}

/**
 * Organism — réalisations paginées (design `blue-portfolio` :
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
  const [perPage, setPerPage] = useState(3);
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // 14 réalisations => 03 / 06 / 09 disponibles ; 4 réalisations => 03 seul.
  const perPageOptions = useMemo(() => {
    const options = PER_PAGE_OPTIONS.filter(
      (option) => option < projects.length,
    );
    return options.length > 0 ? options : [projects.length];
  }, [projects.length]);

  const totalPages = Math.max(1, Math.ceil(projects.length / perPage));
  const visibleProjects = useMemo(
    () => projects.slice(page * perPage, page * perPage + perPage),
    [projects, page, perPage],
  );

  // Changer de page ou de taille remet le visiteur sur le haut de la grille.
  const goToPage = (index: number) => {
    setPage(Math.max(0, Math.min(index, totalPages - 1)));
    gridRef.current?.scrollIntoView({ block: "start" });
  };

  const changePerPage = (next: number) => {
    setPerPage(next);
    setPage(0);
    gridRef.current?.scrollIntoView({ block: "start" });
  };

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
        "relative isolate w-full overflow-hidden bg-[#000A1F] py-16 md:py-32",
        className,
      )}
    >
      <DoodleLayer>
        <Doodle
          src="/static/doodles/projects/ahh.svg"
          position="right-[8%] top-[6%]"
          width={104}
          opacity={0.5}
          delay={0.5}
        />
        <Doodle
          src="/static/doodles/projects/ooh.svg"
          position="right-[20%] top-[26%]"
          width={96}
          opacity={0.45}
          delay={1.8}
        />
        <Doodle
          src="/static/doodles/projects/squiggle.svg"
          position="left-[3%] bottom-[14%]"
          width={52}
          opacity={0.5}
          delay={2.6}
        />
      </DoodleLayer>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 md:gap-16">
        {/* Titre à gauche, sous-titre à droite */}
        <div
          data-reveal
          className="flex flex-col justify-between md:flex-row md:items-end md:gap-20"
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

        {/* Grille paginée — `perPage` réalisations par page */}
        {projects.length > 0 && (
          <div data-reveal className="flex flex-col gap-8">
            <div
              ref={gridRef}
              className="grid scroll-mt-28 grid-cols-1 items-start md:grid-cols-2 md:gap-8 lg:grid-cols-3 gap-8"
            >
              {visibleProjects.map((project) => (
                <WorkProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => openModal(project)}
                  accentColor={accentColor}
                />
              ))}
            </div>

            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={goToPage}
              perPageOptions={perPageOptions}
              perPage={perPage}
              onPerPageChange={changePerPage}
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
