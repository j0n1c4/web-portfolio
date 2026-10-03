import { HighlightText } from "@/components/atoms";
import { cn } from "@/lib/utils";

interface Highlight {
  text: string;
  words: string[];
}

interface AboutContentProps {
  greeting?: string;
  paragraphs: string[];
  highlights?: Highlight[];
  className?: string;
  accentColor?: string;
}

/** Molecule — texte « à propos » (style `blue-portfolio` : texte libre, sans carte) */
export function AboutContent({
  greeting = "Hello!",
  paragraphs,
  highlights = [],
  className,
  accentColor = "#00C7FF",
}: AboutContentProps) {
  const renderHighlightedText = (text: string, highlightWords: string[]) => {
    if (highlightWords.length === 0) return text;

    const regex = new RegExp(`(${highlightWords.join("|")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      highlightWords.some(
        (word) => part.toLowerCase() === word.toLowerCase(),
      ) ? (
        <HighlightText key={index} accentColor={accentColor}>
          {part}
        </HighlightText>
      ) : (
        <span key={index}>{part}</span>
      ),
    );
  };

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <h3 className="text-2xl font-bold tracking-tighter text-white md:text-3xl">
        {greeting}
      </h3>

      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph, index) => {
          const highlight = highlights[index];
          return (
            <p
              key={index}
              className="text-base leading-relaxed text-gray-300"
            >
              {highlight
                ? renderHighlightedText(paragraph, highlight.words)
                : paragraph}
            </p>
          );
        })}
      </div>
    </div>
  );
}