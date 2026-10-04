import { SectionTitle } from "@/components/atoms";
import { BlogCard, type BlogPost } from "@/components/molecules/BlogCard";
import { BlogCTAButtons } from "@/components/molecules/BlogCTAButtons";
import { BlogPostModal } from "@/components/molecules/BlogPostModal";
import { Doodle, DoodleLayer } from "@/components/molecules/Doodles";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { profile } from "@/data/profile";

/** Nombre d'articles affichés avant le bouton « Voir plus ». */
const PREVIEW_POSTS = 3;

interface BlogsSectionProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
  showCTAButtons?: boolean;
  /** Remplace la bascule « Voir plus / Voir moins » interne. */
  onViewMore?: () => void;
  onSubscribe?: () => void;
  /** Remplace l'ouverture de la modale de lecture. */
  onReadMore?: (post: BlogPost) => void;
  className?: string;
  bgColor?: string;
  accentColor?: string;
}

/** Organism — articles du blog en grille (mêmes cartes que les projets) */
export function BlogsSection({
  title,
  subtitle,
  posts = [],
  showCTAButtons = true,
  onViewMore,
  onSubscribe,
  onReadMore,
  className,
  bgColor = "#000A1F",
  accentColor = "#00C7FF",
}: BlogsSectionProps) {
  const { t } = useI18n()
  const [visiblePosts, setVisiblePosts] = useState(posts.slice(0, PREVIEW_POSTS));
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isExpanded = visiblePosts.length > PREVIEW_POSTS;

  const handleToggle = () => {
    if (onViewMore) {
      onViewMore();
      return;
    }
    setVisiblePosts(isExpanded ? posts.slice(0, PREVIEW_POSTS) : posts);
  };

  // `onReadMore` reste un point de sortie pour l'appelant ; par défaut c'est
  // la modale de lecture qui prend le relais (comme le fait `ProjectModal`
  // pour la section Projets).
  const openPost = (post: BlogPost) => {
    if (onReadMore) {
      onReadMore(post);
      return;
    }
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closePost = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  const handleSubscribe = () => {
    if (onSubscribe) {
      onSubscribe();
    } else {
      window.location.href = `mailto:${profile.contact.email}?subject=${t("blog.title")}`;
    }
  };

  return (
    <section
      id="blog"
      className={cn("relative overflow-hidden py-16 md:py-32", className)}
      style={{ backgroundColor: bgColor }}
    >
      <DoodleLayer>
        <Doodle
          src="/static/doodles/testimonials/speech.svg"
          position="right-[6%] top-[8%]"
          width={68}
          opacity={0.55}
          delay={0.9}
        />
        <Doodle
          src="/static/doodles/testimonials/underline.svg"
          position="left-[34%] top-[3%]"
          width={96}
          opacity={0.5}
          delay={2.1}
        />
        <Doodle
          src="/static/doodles/testimonials/squiggle2.svg"
          position="left-[4%] bottom-[10%]"
          width={42}
          opacity={0.5}
          delay={3.2}
        />
      </DoodleLayer>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-5 md:gap-20">
        {/* Titre à gauche, sous-titre à droite */}
        <div
          data-reveal
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-20"
        >
          <SectionTitle
            title={title ?? t("blog.title")}
            className="shrink-0 md:max-w-lg"
            accentColor={accentColor}
          />
          <p className="max-w-md text-base text-gray-300">
            {subtitle ?? t("blog.subtitle")}
          </p>
        </div>

        {/* Grille d'articles */}
        <div
          data-reveal
          className="grid grid-cols-1 items-start gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20"
        >
          {visiblePosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onReadMore={openPost}
              accentColor={accentColor}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        {showCTAButtons && visiblePosts.length > 0 && (
          <div data-reveal className="flex justify-center">
            <BlogCTAButtons
              onToggle={handleToggle}
              onSubscribe={handleSubscribe}
              toggleText={isExpanded ? t("blog.showLess") : t("blog.viewMore")}
              subscribeText={t("blog.subscribe")}
              accentColor={accentColor}
              showToggle={posts.length > PREVIEW_POSTS}
            />
          </div>
        )}
      </div>

      {/* Article reader */}
      <BlogPostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closePost}
        accentColor={accentColor}
      />
    </section>
  );
}