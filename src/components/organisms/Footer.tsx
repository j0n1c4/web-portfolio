import { CopyrightText, CreditLink } from "@/components/atoms";
import { FooterDivider } from "@/components/molecules/FooterDivider";
import {
  FooterSocialLinks,
  type FooterSocialLinkItem,
} from "@/components/molecules/FooterSocialLinks";
import { cn } from "@/lib/utils";

interface FooterProps {
  copyright?: string;
  creditName?: string;
  creditUrl?: string;
  socialLinks?: FooterSocialLinkItem[];
  showDivider?: boolean;
  className?: string;
  bgColor?: string;
  accentColor?: string;
}

/** Organism — page footer with social links, copyright & credit */
export function Footer({
  copyright = "© 2023 SinanTokmak. All rights reserved.",
  creditName = "JohannLeon",
  creditUrl = "https://johannleon.com",
  socialLinks,
  showDivider = true,
  className,
  bgColor = "#1A1E23",
  accentColor = "#12F7D6",
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright.replace("2023", String(currentYear));

  return (
    <footer
      className={cn("relative py-8", className)}
      style={{ backgroundColor: bgColor }}
    >
      {/* Top Divider */}
      {showDivider && (
        <div className="absolute top-0 right-0 left-0">
          <FooterDivider accentColor={accentColor} />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left — Copyright */}
          <div className="order-2 md:order-1">
            <CopyrightText text={copyrightText} />
          </div>

          {/* Center — Social Links */}
          <div className="order-1 md:order-2">
            <FooterSocialLinks links={socialLinks} accentColor={accentColor} />
          </div>

          {/* Right — Credit */}
          <div className="order-3">
            <CreditLink
              name={creditName}
              href={creditUrl}
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
