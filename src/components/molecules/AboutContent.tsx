import { CodeTag, HighlightText } from "@/components/atoms";
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

/** Molecule — about text card with code tags and keyword highlighting */
export function AboutContent({
  greeting = "Hello!",
  paragraphs,
  highlights = [],
  className,
  accentColor = "#12F7D6",
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
    <div
      className={cn(
        "space-y-6 rounded-3xl border border-white/5 bg-[#292F36] p-8 shadow-2xl md:p-12",
        className,
      )}
    >
      <CodeTag tag="p" accentColor={accentColor} />

      <h3
        className="font-mono text-3xl font-bold md:text-4xl"
        style={{ color: accentColor }}
      >
        {greeting}
      </h3>

      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => {
          const highlight = highlights[index];
          return (
            <p
              key={index}
              className="font-mono text-sm leading-relaxed text-gray-300 md:text-base"
            >
              {highlight
                ? renderHighlightedText(paragraph, highlight.words)
                : paragraph}
            </p>
          );
        })}
      </div>

      <CodeTag tag="p" closing accentColor={accentColor} />
    </div>
  );
}
