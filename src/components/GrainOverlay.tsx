/**
 * Filmic grain overlay (design.md §2): fixed full-viewport SVG fractal-noise
 * at ~5% opacity, mix-blend overlay. Pure code — no image asset.
 */
export default function GrainOverlay() {
  return <div aria-hidden="true" className="grain-overlay" />;
}
