import IMG_ABOUT_ME from "@/assets/about-me.jpg";
import BG_ABOUT_ME from "@/assets/background/about-me.svg";
import { ScrollIndicator, SectionTitle } from "@/components/atoms";
import { AboutContent } from "@/components/molecules/AboutContent";
import { AboutImage } from "@/components/molecules/AboutImage";
import { cn } from "@/lib/utils";

interface Highlight {
  text: string;
  words: string[];
}

interface AboutSectionProps {
  title?: string;
  greeting?: string;
  paragraphs?: string[];
  highlights?: Highlight[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  bgColor?: string;
  accentColor?: string;
}

const DEFAULT_PARAGRAPHS = [
  "My name is Sinan and I specialize in web developement that utilizes HTML, CSS, JS, and REACT etc.",
  "I am a highly motivated individual and eternal optimist dedicated to writing clear, concise, robust code that works. Striving to never stop learning and improving.",
  "When I'm not coding, I am writing blogs, reading, or picking up some new hands-on art project like photography.",
  "I like to have my perspective and belief systems challenged so that I see the world through new eyes.",
];

const DEFAULT_HIGHLIGHTS: Highlight[] = [
  {
    text: "My name is Sinan and I specialize in web developement that utilizes HTML, CSS, JS, and REACT etc.",
    words: ["HTML", "CSS", "JS", "REACT"],
  },
  {
    text: "I am a highly motivated individual and eternal optimist dedicated to writing clear, concise, robust code that works. Striving to never stop learning and improving.",
    words: [],
  },
  {
    text: "When I'm not coding, I am writing blogs, reading, or picking up some new hands-on art project like photography.",
    words: ["writing blogs", "photography"],
  },
  {
    text: "I like to have my perspective and belief systems challenged so that I see the world through new eyes.",
    words: [],
  },
];

/** Organism — about me section with scroll indicator, title, content & image */
export function AboutSection({
  title = "About Me",
  greeting = "Hello!",
  paragraphs = DEFAULT_PARAGRAPHS,
  highlights = DEFAULT_HIGHLIGHTS,
  imageSrc = IMG_ABOUT_ME,
  imageAlt = "About me coding",
  className,
  bgColor = BG_ABOUT_ME,
  accentColor = "#12F7D6",
}: AboutSectionProps) {
  return (
    <section
      id="about"
      className={cn("relative overflow-hidden py-24 md:py-28", className)}
    >
      {/* Blurred background layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url("${bgColor}")` }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Scroll Indicator */}
        <div className="mb-16 flex justify-center">
          <ScrollIndicator accentColor={accentColor} />
        </div>

        {/* Section Title */}
        <div className="mb-12">
          <SectionTitle title={title} accentColor={accentColor} />
        </div>

        {/* Content Grid */}
        <div className="grid items-start gap-12 lg:grid-cols-3">
          {/* Left - About Content (2/3) */}
          <div className="order-2 lg:order-1 lg:col-span-2">
            <AboutContent
              greeting={greeting}
              paragraphs={paragraphs}
              highlights={highlights}
              accentColor={accentColor}
            />
          </div>

          {/* Right - Image (1/3) */}
          <div className="order-1 lg:order-2 lg:col-span-1">
            <AboutImage src={imageSrc} alt={imageAlt} className="h-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
