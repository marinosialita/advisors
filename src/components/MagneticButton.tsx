import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';

const MotionLink = motion(Link);

type Variant = 'primary' | 'ghost' | 'ghost-light';

interface MagneticButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  /** show the sliding arrow glyph (primary default) */
  arrow?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-ink text-bone hover:bg-bronze-deep',
  ghost:
    'border border-bone/30 text-bone hover:border-bronze hover:text-bronze',
  'ghost-light':
    'border border-ink/30 text-ink hover:border-bronze hover:text-bronze',
};

/**
 * Magnetic CTA button (design.md §5.5 / §6.5).
 * Attract radius 60px, max 8px translation, spring back (stiffness 180, damping 14).
 */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className,
  arrow = true,
  type = 'button',
  ariaLabel,
}: MagneticButtonProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(relX, relY);
    const radius = 60 + Math.max(rect.width, rect.height) / 2;
    if (dist < radius) {
      const strength = 8 * (1 - dist / radius) + 2;
      x.set(Math.max(-8, Math.min(8, (relX / (rect.width / 2)) * strength)));
      y.set(Math.max(-8, Math.min(8, (relY / (rect.height / 2)) * strength)));
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    'group/btn relative inline-flex items-center gap-3 px-8 py-4 font-mono text-xs font-medium uppercase tracking-button transition-colors duration-300 ease-out-expo',
    variantClasses[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <MotionLink
        // @ts-expect-error framer-motion ref typing on Link
        ref={ref}
        to={to}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: sx, y: sy }}
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a
        // @ts-expect-error framer-motion ref typing on anchor
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: sx, y: sy }}
        className={classes}
        aria-label={ariaLabel}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      // @ts-expect-error framer-motion ref typing on button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
}
