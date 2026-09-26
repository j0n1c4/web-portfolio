import { BlogCategoryBadge, BlogMetaItem, ReadMoreLink } from "@/components/atoms"
import { cn } from "@/lib/utils"

export interface BlogPost {
  id: string
  image: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  slug?: string
}

interface BlogCardProps {
  post: BlogPost
  onReadMore?: (post: BlogPost) => void
  className?: string
  accentColor?: string
}

/** Molecule — horizontal blog card (image left, content right) */
export function BlogCard({ post, onReadMore, className, accentColor = "#12F7D6" }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group border-y border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.02] md:py-12",
        className,
      )}
    >
      <div className="grid items-start gap-8 md:grid-cols-[280px_1fr]">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-auto md:h-48">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Title */}
          <h3
            className="cursor-pointer text-2xl font-bold transition-colors duration-300 md:text-3xl"
            style={{ color: accentColor }}
            onClick={() => onReadMore?.(post)}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">{post.excerpt}</p>

          {/* Read More */}
          <ReadMoreLink onClick={() => onReadMore?.(post)} accentColor={accentColor} />

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <BlogCategoryBadge category={post.category} />

            <div className="flex items-center gap-4 text-sm">
              <BlogMetaItem label="Text" value={post.author} />
              <BlogMetaItem label="Date" value={post.date} />
              <BlogMetaItem label="Read" value={post.readTime} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}