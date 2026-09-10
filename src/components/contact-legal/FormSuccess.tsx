import { motion } from 'framer-motion';
import { EASE_IN_OUT_LUXE, EASE_OUT_EXPO } from '@/lib/motion';

interface FormSuccessProps {
  /** mono confirmation line (design.md §6.7 default) */
  line?: string;
  heading?: string;
}

/**
 * Animated form success state (design.md §6.7): SVG checkmark draws via
 * stroke animation + mono confirmation line.
 */
export default function FormSuccess({
  line = 'MESSAGE RECEIVED — WE REPLY WITHIN ONE BUSINESS DAY',
  heading = 'Thank you.',
}: FormSuccessProps) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="flex flex-col items-start gap-10 border border-stone bg-bone/70 p-10 md:p-14"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      <motion.svg
        viewBox="0 0 64 64"
        className="h-16 w-16"
        aria-hidden="true"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="var(--bronze)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: EASE_IN_OUT_LUXE }}
        />
        <motion.path
          d="M20 33 L28.5 41.5 L44 24"
          fill="none"
          stroke="var(--bronze)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, delay: 0.75, ease: 'easeOut' }}
        />
      </motion.svg>

      <div>
        <motion.p
          className="font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.15] text-ink"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT_EXPO }}
        >
          {heading}
        </motion.p>
        <motion.p
          className="mt-5 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-bronze"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {line}
        </motion.p>
      </div>
    </motion.div>
  );
}
