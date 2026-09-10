import { memo } from 'react';
import { MAP_DOTS, REGION_MARKERS } from './map-data';
import { cn } from '@/lib/utils';

interface RegionDotMapProps {
  /** tooltip language */
  locale?: 'en' | 'ru';
  /** id of the region currently highlighted from the chip list */
  activeId: string | null;
  onHover?: (id: string | null) => void;
  className?: string;
}

/** Static land dots — memoised so hover state never re-renders the grid */
const LandDots = memo(function LandDots() {
  return (
    <g fill="#E5E5E2" fillOpacity="0.38">
      {MAP_DOTS.map(([x, y], i) => (
        <circle key={i} className="js-map-dot" cx={x} cy={y} r={2.1} />
      ))}
    </g>
  );
});

/**
 * Abstract world dot-grid (what-we-do.md §S4) — code-generated SVG, no asset.
 * Land dots render in stone; the six named regions get bronze markers with a
 * gentle 2.5s pulse. Hovered region scales 1.6 and shows a mono tooltip.
 * Entrance stagger (radius-based) is driven by the page's GSAP context via
 * the `.js-map-dot` hooks; default state is fully visible.
 */
const RegionDotMap = memo(function RegionDotMap({
  activeId,
  onHover,
  className,
  locale = 'en',
}: RegionDotMapProps) {
  return (
    <svg
      viewBox="0 0 1000 520"
      role="img"
      aria-label="Abstract world map marking the regions SC Advisors operates in"
      className={cn('h-auto w-full', className)}
    >
      <style>{`
        .svc-map-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: svc-map-pulse 2.5s ease-out infinite;
        }
        @keyframes svc-map-pulse {
          0% { opacity: 0.55; transform: scale(1); }
          70% { opacity: 0; transform: scale(2.8); }
          100% { opacity: 0; transform: scale(2.8); }
        }
        .svc-map-marker {
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-map-pulse { animation: none; opacity: 0; }
        }
      `}</style>

      {/* land dot grid */}
      <LandDots />

      {/* named regions */}
      {REGION_MARKERS.map((region) => {
        const active = activeId === region.id;
        return (
          <g
            key={region.id}
            className="svc-map-marker cursor-pointer"
            style={{ transform: active ? 'scale(1.6)' : undefined }}
            onMouseEnter={() => onHover?.(region.id)}
            onMouseLeave={() => onHover?.(null)}
          >
            <circle className="svc-map-pulse" cx={region.x} cy={region.y} r={7} fill="#FF824D" />
            <circle cx={region.x} cy={region.y} r={5.5} fill="#FF824D" />
            <circle cx={region.x} cy={region.y} r={1.8} fill="#0A0A0A" />
            {/* tooltip */}
            <g
              aria-hidden={!active}
              style={{
                opacity: active ? 1 : 0,
                transition: 'opacity 0.25s ease-out',
                pointerEvents: 'none',
              }}
            >
              <text
                x={region.x}
                y={region.y - 18}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={13}
                fontFamily="'IBM Plex Mono', ui-monospace, monospace"
                letterSpacing={2}
              >
                {locale === 'ru' ? (region.labelRu ?? region.label) : region.label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
});

export default RegionDotMap;
