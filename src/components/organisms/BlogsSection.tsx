import heroImage from "@/assets/hero.png";
import { ScrollIndicator, SectionTitle } from "@/components/atoms";
import { BlogCard, type BlogPost } from "@/components/molecules/BlogCard";
import { BlogCTAButtons } from "@/components/molecules/BlogCTAButtons";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

// Mock Data — 3 blog posts
const basePosts: BlogPost[] = [
  {
    id: "1",
    image: heroImage,
    title: "What does it take to become a web developer?",
    excerpt:
      "Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...",
    category: "Web Developer",
    author: "Sinan",
    date: "10.Oct 2023",
    readTime: "1 Min",
    slug: "what-does-it-take-to-become-a-web-developer",
  },
  {
    id: "2",
    image: heroImage,
    title: "Mastering React Hooks: A Complete Guide",
    excerpt:
      "React Hooks revolutionized how we write React components. Learn about useState, useEffect, useContext, and custom hooks to write cleaner code...",
    category: "React",
    author: "Sinan",
    date: "15.Nov 2023",
    readTime: "5 Min",
    slug: "mastering-react-hooks-complete-guide",
  },
  {
    id: "3",
    image: heroImage,
    title: "CSS Grid vs Flexbox: When to Use Which?",
    excerpt:
      "Understanding the difference between CSS Grid and Flexbox is crucial for modern web layouts. This guide helps you choose the right tool...",
    category: "CSS",
    author: "Sinan",
    date: "22.Dec 2023",
    readTime: "3 Min",
    slug: "css-grid-vs-flexbox-when-to-use",
  },
];
/** Organism — blog posts list with CTA buttons */
export function BlogsSection({
  title = "Blogs",
  subtitle = "My thoughts on technology and business, welcome to subscribe",
  posts = basePosts,
  showScrollIndicator = true,
  showCTAButtons = true,
  onViewMore,
  onSubscribe,
  onReadMore,
  className,
  bgColor = "#292F36",
  accentColor = "#12F7D6",
}: BlogsSectionProps) {
  const [visiblePosts, setVisiblePosts] = useState(posts.slice(0, 3));

  const handleViewMore = () => {
    if (onViewMore) {
      onViewMore();
    } else {
      // Default behavior: show all posts
      setVisiblePosts(posts);
    }
  };

  const handleSubscribe = () => {
    if (onSubscribe) {
      onSubscribe();
    } else {
      // Default: open mailto
      window.location.href =
        "mailto:abdurrahman_sinan@hotmail.com?subject=Subscribe";
    }
  };

  const handleReadMore = (post: BlogPost) => {
    if (onReadMore) {
      onReadMore(post);
    } else {
      // Default: navigate to blog post page
      window.location.href = `/blog/${post.slug}`;
    }
  };

  return (
    <section
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
            title={title}
            subtitle={subtitle}
            accentColor={accentColor}
          />
        </div>

        {/* Blog Posts List */}
        <div className="space-y-0">
          {visiblePosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              onReadMore={handleReadMore}
              accentColor={accentColor}
              className={index === 0 ? "border-t-2" : ""}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        {showCTAButtons && (
          <div className="mt-16">
            <BlogCTAButtons
              onViewMore={handleViewMore}
              onSubscribe={handleSubscribe}
              accentColor={accentColor}
            />
          </div>
        )}
      </div>
    </section>
  );
}
