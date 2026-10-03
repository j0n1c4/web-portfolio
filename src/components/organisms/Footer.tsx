import { CopyrightText, CreditLink } from "@/components/atoms";
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

/**
 * Organism — footer (design `blue-portfolio` : bord haut cyan, liens en
 * colonnes, ligne « Made with » et mention de copyright).
 */
export function Footer({
  copyright,
  creditName,
  creditUrl,
  socialLinks,
  showDivider = true,
  showCredit = true,
  className,
  bgColor = "#000A1F",
  accentColor = "#00C7FF",
}: FooterProps) {
  const { t } = useI18n()
  const copyrightText = copyright ?? `\u00A9 ${new Date().getFullYear()} ${profile.handle}. ${t("footer.rights")}`;

  return (
    <footer
      className={cn(
        "relative flex flex-col w-full bg-[#000A1F] px-4 py-10",
        showDivider && "border-t border-[#192742]",
        className,
      )}
      style={{ backgroundColor: bgColor }}
    >
      <div className="m-auto grid w-full max-w-7xl grid-cols-2 items-start justify-between gap-8 sm:grid-cols-3">
        {/* Réseaux sociaux */}
        <div className="mb-5 flex flex-col text-left sm:mb-0">
          <h4 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
            {t("footer.social")}
          </h4>
          <div className="mt-4">
            <FooterSocialLinks links={socialLinks} accentColor={accentColor} />
          </div>
        </div>

        {/* Navigation / Contact */}
        <div className="mb-5 flex flex-col text-left sm:mb-0">
          <h4 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
            {t("footer.explore")}
          </h4>
          <ul className="mt-4 flex flex-col gap-3">
            {[
              { label: t("nav.about"), href: "#about" },
              { label: t("nav.skills"), href: "#skills" },
              { label: t("nav.projects"), href: "#projects" },
              { label: t("nav.blog"), href: "#blog" },
              { label: t("nav.contact"), href: "#contact" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-gray-300 transition-colors duration-300 hover:text-[#00C7FF]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Crédit */}
        {showCredit && creditName && creditUrl ? (
          <div className="col-span-2 flex flex-col border-t border-[#192742] pt-6 text-left text-gray-400 sm:col-auto sm:mt-0 sm:border-0 sm:pt-0">
            <h4 className="text-sm font-bold tracking-widest uppercase">
              {t("footer.credit")}
            </h4>
            <div className="mt-4">
              <CreditLink
                name={creditName}
                href={creditUrl}
                accentColor={accentColor}
              />
            </div>
          </div>
        ) : (
          <div className="col-span-2 flex flex-col border-t border-[#192742] pt-6 text-left text-gray-400 sm:col-auto sm:mt-0 sm:border-0 sm:pt-0">
            <h4 className="text-sm font-bold tracking-widest uppercase">
              {t("footer.stack")}
            </h4>
            <p className="mt-4 font-mono text-xs">
              React · TypeScript · Vite · TailwindCSS
            </p>
          </div>
        )}
      </div>

      {/* Made with + copyright */}
      <div
        data-reveal
        className="m-auto mt-8 w-full max-w-7xl border-t border-[#192742] pt-6 text-center sm:mt-4 sm:pt-4"
      >
        <p className="flex flex-col items-center justify-center">
          <span className="inline-flex items-center text-xs font-bold tracking-widest uppercase">
            {t("footer.madeWith")}
          </span>
          <div className="mt-2">
            <CopyrightText text={copyrightText} />
          </div>
        </p>
      </div>
    </footer>
  );
}