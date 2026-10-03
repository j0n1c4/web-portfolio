import type { BlogBlock } from "@/components/molecules/BlogCard"
import { cn } from "@/lib/utils"

interface BlogPostBodyProps {
  content: BlogBlock[]
  accentColor?: string
  className?: string
}

/**
 * Molecule — rendu d'un article. Connaît les 6 formes de `BlogBlock` ; le
 * contenu reste du texte dans `src/data/blog.ts`, sans Markdown à parser.
 *
 * Le texte contient des backticks pour l'`inline code` : on les transforme en
 * `<code>` via un split, ce qui évite d'installer un parseur pour deux ou
 * trois occurrences par paragraphe.
 */
export function BlogPostBody({ content, accentColor = "#00C7FF", className }: BlogPostBodyProps) {
  /** Rend un paragraphe en remplaçant les `backticks` par des <code>. */
  const renderInline = (text: string) =>
    text.split(/(`[^`]+`)/g).map((chunk, index) =>
      chunk.startsWith("`") && chunk.endsWith("`") && chunk.length > 2 ? (
        <code
          key={index}
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-[#00C7FF]"
        >
          {chunk.slice(1, -1)}
        </code>
      ) : (
        chunk
      ),
    )

  return (
    <div className={cn("space-y-5 leading-relaxed text-gray-300", className)}>
      {content.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h3
                key={index}
                className="pt-4 text-2xl font-bold text-white md:text-3xl"
              >
                {block.text}
              </h3>
            )

          case "h3":
            return (
              <h4 key={index} className="pt-2 text-lg font-semibold text-white">
                {block.text}
              </h4>
            )

          case "p":
            return <p key={index}>{renderInline(block.text)}</p>

          case "ul":
            return (
              <ul key={index} className="space-y-2 pl-1">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            )

          case "ol":
            return (
              <ol key={index} className="space-y-2 pl-1">
                {block.items.map((item, itemIndex) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="font-mono text-sm font-bold"
                      style={{ color: accentColor }}
                    >
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            )

          case "code":
            return (
              <figure key={index} className="overflow-hidden rounded-xl border border-white/10">
                <figcaption
                  className="border-b border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-gray-400"
                >
                  {block.language}
                </figcaption>
                <pre className="overflow-x-auto bg-black/40 p-4">
                  <code className="font-mono text-sm text-gray-200">{block.code}</code>
                </pre>
              </figure>
            )

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 py-1 pl-5 text-lg italic text-gray-200"
                style={{ borderColor: accentColor }}
              >
                {renderInline(block.text)}
              </blockquote>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
