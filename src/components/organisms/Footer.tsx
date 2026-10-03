import { CopyrightText, CreditLink } from "@/components/atoms";
import { FooterDivider } from "@/components/molecules/FooterDivider";
import {
  FooterSocialLinks,
  type FooterSocialLinkItem,
} from "@/components/molecules/FooterSocialLinks";
import { useI18n } from "@/i18n";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

interface FooterProps {
  copyright?: string;
  creditName?: string;
  creditUrl?: string;
  socialLinks?: FooterSocialLinkItem[];
  showDivider?: boolean;
  showCredit?: boolean;
  className?: string;
  bgColor?: string;
  accentColor?: string;
}

/** Organism — page footer with social links, copyright & credit */
export function Footer({
  copyright,
  creditName,
  creditUrl,
  socialLinks,
  showDivider = true,
  showCredit = true,
  className,
  bgColor = "#1A1E23",
  accentColor = "#12F7D6",
}: FooterProps) {
  const { t } = useI18n()
  const copyrightText = copyright ?? `\u00A9 ${new Date().getFullYear()} ${profile.handle}. ${t("footer.rights")}`;

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

      <div className="mx-auto max-w-7xl px-4">
        <div
          data-reveal
          className="flex flex-col items-center justify-between gap-6 md:flex-row"
        >
          {/* Left — Copyright */}
          <div className="order-2 md:order-1">
            <CopyrightText text={copyrightText} />
          </div>

          {/* Center — Social Links */}
          <div className="order-1 md:order-2">
            <FooterSocialLinks links={socialLinks} accentColor={accentColor} />
          </div>

          {/* Right — Credit */}
          {showCredit && creditName && creditUrl && (
            <div className="order-3">
              <CreditLink
                name={creditName}
                href={creditUrl}
                accentColor={accentColor}
              />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
