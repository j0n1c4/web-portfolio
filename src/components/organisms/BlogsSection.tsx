import { ScrollIndicator, SectionTitle } from "@/components/atoms";
import { BlogCard, type BlogPost } from "@/components/molecules/BlogCard";
import { BlogCTAButtons } from "@/components/molecules/BlogCTAButtons";
import { BlogPostModal } from "@/components/molecules/BlogPostModal";
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
  showScrollIndicator?: boolean;
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

/** Organism — blog posts list with CTA buttons */
export function BlogsSection({
  title,
  subtitle,
  posts = [],
  showScrollIndicator = true,
  showCTAButtons = true,
  onViewMore,
  onSubscribe,
  onReadMore,
  className,
  bgColor = "#292F36",
  accentColor = "#12F7D6",
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
      className={cn("relative py-24 md:py-32", className)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="mx-auto max-w-5xl px-4">
        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="mb-16 flex justify-center">
            <ScrollIndicator accentColor={accentColor} />
          </div>
        )}

        {/* Section Title */}
        <div className="mb-16">
          <SectionTitle
            variant="centered"
            title={title ?? t("blog.title")}
            subtitle={subtitle ?? t("blog.subtitle")}
            accentColor={accentColor}
          />
        </div>

        {/* Blog Posts List */}
        <div className="space-y-0">
          {visiblePosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              onReadMore={openPost}
              accentColor={accentColor}
              className={index === 0 ? "border-t-2" : ""}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        {showCTAButtons && visiblePosts.length > 0 && (
          <div className="mt-16">
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
