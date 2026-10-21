/**
 * Feather-style line icons used across the landing page and content pages.
 *
 * The reference HTML pasted the same `<svg>` markup inline up to fifteen times
 * per icon (the five-pointed star alone appeared twenty times). Here each path
 * is declared once; stroke width, colour and size still come from the parent
 * rule in `landing.css`, exactly as they did in the reference, so the rendered
 * result is unchanged.
 */

type IconProps = {
  className?: string;
};

/** Shared wrapper: no fill, stroke inherited from the parent CSS rule. */
function Line({
  children,
  className,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/*
        The fill is repeated on the polygon because this same icon is used as a
        `.stat-icon`, whose rule sets `fill: none` on the <svg>. A CSS rule
        beats a presentation attribute on the same element, but not one on the
        child — so the star stays solid in every context it appears.
      */}
      <polygon
        fill="currentColor"
        stroke="none"
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </svg>
  );
}

/** Five stars in a row — the hero trust line and every testimonial card. */
export function StarRow({ className }: IconProps) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className={className} />
      ))}
    </>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Line>
  );
}

export function ActivityIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </Line>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Line>
  );
}

export function BellIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Line>
  );
}

export function UsersIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Line>
  );
}

export function BuildingIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </Line>
  );
}

export function DumbbellIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M6.5 6.5h11" />
      <path d="M6.5 17.5h11" />
      <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
    </Line>
  );
}

export function BookIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </Line>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Line>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </Line>
  );
}

export function MessageCircleIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </Line>
  );
}

export function SunIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 0V3" />
    </Line>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <polyline points="20 6 9 17 4 12" />
    </Line>
  );
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </Line>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Line>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </Line>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Line>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </Line>
  );
}

export function TwitterIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </Line>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Line>
  );
}

/* ── Brand glyphs (solid fill, not line icons) ── */

export function AppleLogo() {
  return (
    <svg viewBox="0 0 384 512" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

export function GooglePlayLogo() {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-10.3 18-28.5-1.2-40.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}
