import { BlogCategoryBadge, ReadMoreLink } from "@/components/atoms"
import { cn } from "@/lib/utils"

/**
 * Bloc de contenu d'un article. Un petit graphe de blocs plutôt que du
 * Markdown : le contenu vit dans `src/data/blog.ts` et n'a pas besoin d'un
 * parseur au runtime. `BlogPostBody` (molecule) sait rendre ces 6 formes.
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string }

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
  /** Corps de l'article, lu dans `BlogPostModal`. */
  content: BlogBlock[]
}

interface BlogCardProps {
  post: BlogPost
  onReadMore?: (post: BlogPost) => void
  className?: string
  accentColor?: string
}

/** Molecule — carte d'article (design `blue-portfolio`, même cadre que les projets) */
export function BlogCard({ post, onReadMore, className, accentColor = "#00C7FF" }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group mx-auto flex w-full max-w-sm cursor-pointer flex-col transition duration-300 hover:-translate-y-2 hover:opacity-80",
        className,
      )}
      onClick={() => onReadMore?.(post)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onReadMore?.(post)}
    >
      {/* Visuel — cadre `rounded-xl border p-2` */}
      <div className="rounded-xl border border-[#192742] p-2 transition-colors duration-300 group-hover:border-[#00C7FF]">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="max-h-[220px] w-full rounded-md object-cover object-top md:max-h-[240px]"
        />
      </div>

      {/* Métadonnées */}
      <div className="mt-5 w-full">
        <div className="mb-2 flex items-center gap-3">
          <BlogCategoryBadge category={post.category} />
          <span className="font-mono text-xs text-gray-400">{post.date}</span>
        </div>

        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#00C7FF]">
          {post.title}
        </h3>

        <p className="mt-1 line-clamp-3 text-sm text-gray-300">{post.excerpt}</p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <ReadMoreLink onClick={() => onReadMore?.(post)} accentColor={accentColor} />
          <span className="font-mono text-xs text-gray-400">
            {post.author} · {post.readTime}
          </span>
        </div>
      </div>
    </article>
  )
}