import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * SplitText-equivalent word splitter (design.md §5): wraps each word in an
 * overflow-hidden mask with an inner `.js-word` span that GSAP animates
 * from y:110%. Default rendered state is fully visible — animations use
 * fromTo inside a prefers-reduced-motion guard, so no-JS / reduced-motion
 * users always see the text.
 */
export function MaskWord({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom', className)}
    >
      <span className={cn('js-word inline-block will-change-transform', innerClassName)}>
        {children}
      </span>
    </span>
  );
}

export default function SplitWords({
  text,
  className,
  innerClassName,
}: {
  text: string;
  className?: string;
  innerClassName?: string;
}) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <MaskWord innerClassName={innerClassName}>{word}</MaskWord>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}
