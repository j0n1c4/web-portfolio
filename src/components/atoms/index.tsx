import { useI18n } from "@/i18n";
import { cn, ensureLegibleOn, readableTextColor } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "outline";
}

/** Atom — smallest UI unit */
export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-muted text-muted-foreground",
        variant === "outline" && "border border-border text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors cursor-pointer",
        variant === "primary" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "ghost" && "border border-border hover:bg-muted",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

import { type LucideIcon } from "lucide-react";
import { useState } from "react";

interface LogoProps {
  className?: string;
  text?: string;
  codeColor?: string;
}

/** Atom — site logo with `<C/>` code prefix */
export function Logo({
  className,
  text = "j0n1c4",
  codeColor = "#12F7D6",
}: LogoProps) {
  return (
    <a href="/" className={cn("group flex items-center gap-2", className)}>
      <span className="font-mono text-2xl font-bold">
        <span style={{ color: codeColor }}>&lt;C/&gt;</span>
        <span className="ml-2 text-white">{text}</span>
      </span>
    </a>
  );
}

interface NavLinkProps {
  href: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
}

/** Atom — single navigation link with active indicator */
export function NavLink({
  href,
  children,
  active = false,
  className,
}: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "relative text-sm font-medium transition-all duration-300",
        active ? "text-[#12F7D6]" : "text-gray-300 hover:text-[#12F7D6]",
        className,
      )}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 right-0 left-0 h-0.5 rounded-full bg-[#12F7D6]" />
      )}
    </a>
  );
}

interface SocialIconProps {
  icon: LucideIcon;
  href: string;
  label: string;
  className?: string;
  iconColor?: string;
}

/** Atom — single social link with icon */
export function SocialIcon({
  icon: Icon,
  href,
  label,
  className,
  iconColor = "#12F7D6",
}: SocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-2 text-sm transition-all duration-300",
        className,
      )}
      style={{ color: iconColor }}
    >
      <Icon
        className="h-4 w-4 transition-transform group-hover:scale-110"
        style={{ color: iconColor }}
      />
      <span className="hidden lg:inline">{label}</span>
    </a>
  );
}

interface SidebarIconProps {
  icon: LucideIcon;
  label?: string;
  active?: boolean;
  className?: string;
  accentColor?: string;
  onClick?: () => void;
}

/** Atom — square icon button used in the floating sidebar */
export function SidebarIcon({
  icon: Icon,
  label,
  active = false,
  className,
  accentColor = "#12F7D6",
  onClick,
}: SidebarIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300",
        active
          ? "text-[#292F36]"
          : "text-white hover:bg-white/5 hover:text-[#12F7D6]",
        className,
      )}
      style={active ? { backgroundColor: accentColor } : undefined}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

interface CodeTagProps {
  tag: string;
  closing?: boolean;
  className?: string;
  accentColor?: string;
}

/** Atom — decorative HTML-style code tag */
export function CodeTag({
  tag,
  closing = false,
  className,
  accentColor = "#12F7D6",
}: CodeTagProps) {
  return (
    <span
      className={cn("font-mono text-sm", className)}
      style={{ color: accentColor }}
    >
      {closing ? `</${tag}>` : `<${tag}>`}
    </span>
  );
}

interface SkillBadgeProps {
  label: string;
  className?: string;
  accentColor?: string;
}

/** Atom — small rounded skill badge */
export function SkillBadge({
  label,
  className,
  accentColor = "#12F7D6",
}: SkillBadgeProps) {
  return (
    <span
      className={cn("rounded-full px-3 py-1 text-xs font-medium", className)}
      style={{ backgroundColor: accentColor, color: "#292F36" }}
    >
      {label}
    </span>
  );
}

interface InfoRowProps {
  icon: LucideIcon;
  text: string;
  className?: string;
  accentColor?: string;
}

/** Atom — icon + text info line */
export function InfoRow({
  icon: Icon,
  text,
  className,
  accentColor = "#12F7D6",
}: InfoRowProps) {
  return (
    <div className={cn("flex items-center gap-3 text-sm", className)}>
      <Icon className="h-4 w-4 shrink-0" style={{ color: accentColor }} />
      <span className="font-mono text-xs text-gray-300">{text}</span>
    </div>
  );
}

interface StatItemProps {
  value: string | number;
  label: string;
  className?: string;
  accentColor?: string;
}

/** Atom — single stat (value + label) */
export function StatItem({
  value,
  label,
  className,
  accentColor = "#12F7D6",
}: StatItemProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-4xl font-bold" style={{ color: accentColor }}>
        {value}
      </span>
      <span className="text-sm leading-tight whitespace-pre-line text-gray-300">
        {label}
      </span>
    </div>
  );
}

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  accentColor?: string;
}

/** Atom — section heading: "corner" (About) or "centered" with decorative line (Skills) */
export function SectionTitle({
  title,
  subtitle,
  variant = "corner",
  className,
  accentColor = "#12F7D6",
}: SectionTitleProps & { variant?: "corner" | "centered" }) {
  if (variant === "centered") {
    return (
      <div className={cn("space-y-4 text-center", className)}>
        <h2
          className="text-5xl font-bold md:text-6xl"
          style={{ color: accentColor }}
        >
          {title}
        </h2>
        {/* Decorative line with dots */}
        <div className="flex items-center justify-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="h-0.5 w-24"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>
        {subtitle && (
          <p className="font-mono text-sm text-gray-300">{subtitle}</p>
        )}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "inline-block rounded-tl-3xl border-b-2 border-l-2 px-8 py-4 text-4xl font-bold text-white md:text-5xl",
        className,
      )}
      style={{ borderColor: accentColor, backgroundColor: "#292F36" }}
    >
      {title}
    </div>
  );
}

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}

/** Atom — inline highlighted text */
export function HighlightText({
  children,
  className,
  accentColor = "#12F7D6",
}: HighlightTextProps) {
  return (
    <span
      className={cn("font-mono font-semibold", className)}
      style={{ color: accentColor }}
    >
      {children}
    </span>
  );
}

interface ScrollIndicatorProps {
  className?: string;
  accentColor?: string;
}

/** Atom — animated scroll cue (oval + dashed line + diamond) */
export function ScrollIndicator({
  className,
  accentColor = "#12F7D6",
}: ScrollIndicatorProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {/* Oval */}
      <div
        className="flex h-10 w-6 items-start justify-center rounded-full border-2 pt-2"
        style={{ borderColor: accentColor }}
      >
        <div
          className="h-1.5 w-1.5 animate-bounce rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>
      {/* Dashed line */}
      <div
        className="h-16 w-px border-l-2 border-dashed"
        style={{ borderColor: accentColor }}
      />
      {/* Diamond */}
      <div
        className="h-3 w-3 rotate-45"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
}

interface CodeIconProps {
  className?: string;
  accentColor?: string;
}

/** Atom — decorative `</>` code glyph */
export function CodeIcon({
  className,
  accentColor = "#12F7D6",
}: CodeIconProps) {
  return (
    <div className={cn("font-mono text-6xl font-bold md:text-8xl", className)}>
      <span style={{ color: accentColor }}>&lt;</span>
      <span style={{ color: accentColor }}>/</span>
      <span style={{ color: accentColor }}>&gt;</span>
    </div>
  );
}

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  className?: string;
  accentColor?: string;
}

/** Atom — rectangular skill category card */
export function SkillCard({
  icon: Icon,
  title,
  subtitle,
  className,
  accentColor = "#12F7D6",
}: SkillCardProps) {
  return (
    <div
      className={cn(
        "group relative cursor-pointer rounded-xl border-l-4 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl",
        className,
      )}
      style={{ backgroundColor: accentColor, borderColor: accentColor }}
    >
      <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-white/10" />
      <Icon className="mb-3 h-8 w-8 text-[#292F36]!" />
      <h4 className="mb-1 text-lg font-bold text-[#292F36]!">{title}</h4>
      <p className="font-mono text-sm text-[#292F36]/80!">{subtitle}</p>
    </div>
  );
}

interface SkillCircleProps {
  icon: LucideIcon;
  label: string;
  color: string;
  className?: string;
}

/** Atom — circular colored skill badge */
export function SkillCircle({
  icon: Icon,
  label,
  color,
  className,
}: SkillCircleProps) {
  return (
    <div className={cn("group flex flex-col items-center gap-3", className)}>
      <div
        className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl md:h-28 md:w-28"
        style={{ backgroundColor: color }}
      >
        <Icon
          className="h-12 w-12"
          style={{ color: readableTextColor(color) }}
        />
      </div>
      <span
        className="font-mono text-lg font-bold"
        style={{ color: ensureLegibleOn(color, "#292F36") }}
      >
        {label}
      </span>
    </div>
  );
}

interface CarouselButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  direction: "prev" | "next";
  className?: string;
  accentColor?: string;
}

/** Atom — round prev/next carousel button */
export function CarouselButton({
  icon: Icon,
  onClick,
  direction,
  className,
  accentColor = "#12F7D6",
}: CarouselButtonProps) {
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        direction === "prev" ? t("common.previous") : t("common.next")
      }
      className={cn(
        "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-110 hover:shadow-lg",
        className,
      )}
      style={{ borderColor: accentColor, color: accentColor }}
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}

interface DotIndicatorProps {
  total: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
  accentColor?: string;
}

/** Atom — carousel slide dots */
export function DotIndicator({
  total,
  currentIndex,
  onDotClick,
  className,
  accentColor = "#12F7D6",
}: DotIndicatorProps) {
  const { t } = useI18n();

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onDotClick(index)}
          aria-label={`${t("common.goToSlide")} ${index + 1}`}
          className={cn(
            "rounded-full transition-all duration-300",
            index === currentIndex
              ? "h-3 w-8"
              : "h-3 w-3 bg-gray-600 hover:bg-gray-500",
          )}
          style={
            index === currentIndex
              ? { backgroundColor: accentColor }
              : undefined
          }
        />
      ))}
    </div>
  );
}

interface BlogCategoryBadgeProps {
  category: string;
  className?: string;
}

/** Atom — small category pill for blog posts */
export function BlogCategoryBadge({
  category,
  className,
}: BlogCategoryBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full border border-[#12F7D6]/20 bg-[#12F7D6]/10 px-3 py-1 text-xs font-medium text-[#12F7D6]",
        className,
      )}
    >
      {category}
    </span>
  );
}

interface BlogMetaItemProps {
  label: string;
  value: string;
  className?: string;
}

/** Atom — single meta info line (label + value) for blog posts */
export function BlogMetaItem({ label, value, className }: BlogMetaItemProps) {
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <span className="font-semibold text-gray-500">{label}</span>
      <span className="text-gray-300">{value}</span>
    </div>
  );
}

interface ReadMoreLinkProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  accentColor?: string;
}

/** Atom — "Read more >>" link styled with accent color */
export function ReadMoreLink({
  href,
  onClick,
  className,
  accentColor = "#12F7D6",
}: ReadMoreLinkProps) {
  const { t } = useI18n();
  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 border-b pb-0.5 text-sm font-medium transition-all duration-300 hover:gap-2",
        className,
      )}
      style={{ color: accentColor, borderColor: accentColor }}
    >
      <span>{t("blog.readMore")}</span>
      <span>&gt;&gt;</span>
    </Component>
  );
}

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
  accentColor?: string;
}

/** Atom — text input with floating label (Material style) */
export function FloatingLabelInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  error,
  className,
  accentColor = "#12F7D6",
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isLabelFloating = isFocused || hasValue;

  return (
    <div className={cn("relative", className)}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className={cn(
          "w-full border-b-2 bg-transparent pb-2 pt-6 text-base outline-none transition-colors duration-300",
          error ? "border-red-500" : "border-gray-600 focus:border-[#12F7D6]",
        )}
        style={{ color: "#fff" }}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 transition-all duration-300",
          isLabelFloating ? "top-0 text-xs" : "top-6 text-base",
        )}
        style={{ color: accentColor }}
      >
        {label}
        {required && " *"}
      </label>
      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface FloatingLabelTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  rows?: number;
  className?: string;
  accentColor?: string;
}

/** Atom — textarea with floating label (Material style) */
export function FloatingLabelTextarea({
  id,
  label,
  value,
  onChange,
  required = false,
  error,
  rows = 4,
  className,
  accentColor = "#12F7D6",
}: FloatingLabelTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isLabelFloating = isFocused || hasValue;

  return (
    <div className={cn("relative", className)}>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        rows={rows}
        className={cn(
          "w-full resize-none border-b-2 bg-transparent pb-2 pt-6 text-base outline-none transition-colors duration-300",
          error ? "border-red-500" : "border-gray-600 focus:border-[#12F7D6]",
        )}
        style={{ color: "#fff" }}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 transition-all duration-300",
          isLabelFloating ? "top-0 text-xs" : "top-6 text-base",
        )}
        style={{ color: accentColor }}
      >
        {label}
        {required && " *"}
      </label>
      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface FooterSocialIconProps {
  icon: LucideIcon;
  href: string;
  label: string;
  className?: string;
  accentColor?: string;
}

/** Atom — round social icon link for the footer */
export function FooterSocialIcon({
  icon: Icon,
  href,
  label,
  className,
  accentColor = "#12F7D6",
}: FooterSocialIconProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110",
        className,
      )}
      style={{ backgroundColor: accentColor }}
    >
      <Icon className="h-5 w-5" style={{ color: "#292F36" }} />
    </a>
  );
}

interface CopyrightTextProps {
  text: string;
  className?: string;
}

/** Atom — mono-spaced copyright text */
export function CopyrightText({ text, className }: CopyrightTextProps) {
  return (
    <p className={cn("font-mono text-sm text-gray-400", className)}>{text}</p>
  );
}

interface CreditLinkProps {
  name: string;
  href?: string;
  className?: string;
  accentColor?: string;
}

/** Atom — underlined credit link */
export function CreditLink({
  name,
  href,
  className,
  accentColor = "#12F7D6",
}: CreditLinkProps) {
  const Component = href ? "a" : "span";

  return (
    <Component
      href={href}
      className={cn(
        "text-sm font-medium underline underline-offset-4 transition-opacity duration-300 hover:opacity-80",
        className,
      )}
      style={{ color: accentColor }}
      {...(href && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {name}
    </Component>
  );
}
