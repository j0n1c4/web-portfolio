import { ScrollIndicator, SectionTitle } from "@/components/atoms";
import { BlogCard, type BlogPost } from "@/components/molecules/BlogCard";
import { BlogCTAButtons } from "@/components/molecules/BlogCTAButtons";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { profile } from "@/data/profile";

interface BlogsSectionProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
  showScrollIndicator?: boolean;
  showCTAButtons?: boolean;
  onViewMore?: () => void;
  onSubscribe?: () => void;
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
  const [visiblePosts, setVisiblePosts] = useState(posts);

  const handleViewMore = () => {
    if (onViewMore) {
      onViewMore();
    } else {
      setVisiblePosts(posts);
    }
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
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
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
              onReadMore={onReadMore}
              accentColor={accentColor}
              className={index === 0 ? "border-t-2" : ""}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        {showCTAButtons && visiblePosts.length > 0 && (
          <div className="mt-16">
            <BlogCTAButtons
              onViewMore={handleViewMore}
              onSubscribe={handleSubscribe}
              viewMoreText={t("blog.viewMore")}
              subscribeText={t("blog.subscribe")}
              accentColor={accentColor}
            />
          </div>
        )}
      </div>
    </section>
  );
}
