import Image from "next/image";
import { CAPTURE_HEIGHT, CAPTURE_WIDTH, type Screen } from "./content";

type DeviceFrameProps = {
  /** Every screen this device can show. All are mounted and stacked. */
  screens: readonly Screen[];
  /** Index of the one currently at full opacity. */
  activeIndex?: number;
  /** Passed to `next/image`; describes the rendered width per breakpoint. */
  sizes: string;
  /** Set on the one device that is the page's largest paint. */
  priority?: boolean;
  className?: string;
};

/**
 * The phone chrome, drawn in CSS, around real captures of the shipped app.
 *
 * Ported from `components/home/DeviceFrame.tsx` on feature/premium-landing-page.
 * Keeping the body and the island out of the artwork means one device shape
 * across the whole page, a frame that holds its height before a capture loads,
 * and captures served at the exact size they render.
 *
 * Several screens stack inside one frame and change by opacity, rather than a
 * track of phones sliding behind a clip. A clip is what forced the earlier
 * compromise: it has to cut tight to hide the next slide, which also cuts the
 * frame's own shadow into a hard-edged rectangle. Crossfading needs no clip,
 * so the shadow renders whole — and the phone staying put while its screen
 * changes reads better than a phone sliding past.
 */
export default function DeviceFrame({
  screens,
  activeIndex = 0,
  sizes,
  priority = false,
  className,
}: DeviceFrameProps) {
  return (
    <div className={className ? `device-frame ${className}` : "device-frame"}>
      <div className="device-screen">
        {screens.map((screen, i) => (
          <div
            key={screen.src}
            className="device-layer"
            data-active={i === activeIndex ? "true" : "false"}
            // Only the visible screen is exposed; the stacked ones would
            // otherwise all be read out in order.
            aria-hidden={i === activeIndex ? undefined : "true"}
          >
            <Image
              src={screen.src}
              alt={screen.alt}
              width={CAPTURE_WIDTH}
              height={CAPTURE_HEIGHT}
              sizes={sizes}
              priority={priority && i === activeIndex}
            />
          </div>
        ))}
      </div>
      <span className="device-island" aria-hidden="true" />
    </div>
  );
}
