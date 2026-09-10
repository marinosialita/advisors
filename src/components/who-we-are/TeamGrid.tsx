import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { TEAM } from '@/data/site';
import type { TeamMember } from '@/data/site';
import { teamBioFor } from './team-data';
import { EASE_IN_OUT_LUXE } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Team grid (design/who-we-are.md §S5): 3×2 desktop / 2-col tablet / 1-col
 * mobile. Each card toggles an inline profile drawer that spans the full
 * grid width below the card's row (Framer Motion height spring, one open
 * at a time). Deep-linkable via #team + member slug.
 *
 * Scroll-reveal of the cards (.js-team-card / .js-team-imgwrap / .js-team-img)
 * is owned by the page-level GSAP context; this component only uses
 * Framer Motion for the accordion interaction.
 */

/** Responsive column count matching the grid's Tailwind breakpoints. */
function useColumnCount(): number {
  const get = () =>
    typeof window === 'undefined'
      ? 3
      : window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 640
          ? 2
          : 1;
  const [cols, setCols] = useState<number>(get);

  useEffect(() => {
    const onResize = () => setCols(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cols;
}

function TeamCard({
  member,
  open,
  onToggle,
  locale = 'en',
}: {
  member: TeamMember;
  open: boolean;
  onToggle: () => void;
  locale?: 'en' | 'ru';
}) {
  const bio = teamBioFor(member.slug);
  const role = locale === 'ru' ? (member.roleRu ?? member.role) : member.role;

  return (
    <button
      type="button"
      id={member.slug}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={`team-drawer-${member.slug}`}
      className="js-team-card group scroll-mt-28 text-left"
    >
      <div className="js-team-imgwrap relative aspect-[1024/1436] overflow-hidden border border-stone/60 bg-ivory">
        <img
          src={member.image}
          alt={`${member.name} — ${role}`}
          loading="lazy"
          className="js-team-img h-full w-full object-cover grayscale-[0.15] transition-[transform,filter] duration-500 ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0"
        />
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-normal leading-[1.15] text-ink transition-colors duration-300 group-hover:text-bronze">
            {member.name}
          </h3>
          <p className="mt-2 font-mono text-[11px] font-medium uppercase tracking-nav text-bronze">
            {role}
          </p>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            'mt-1 flex h-8 w-8 shrink-0 items-center justify-center border border-stone text-ink transition-all duration-300 ease-out-expo group-hover:border-bronze group-hover:text-bronze',
            open && 'rotate-45 border-bronze text-bronze',
          )}
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>

      <span className="rule mt-5" aria-hidden="true" />

      {bio && (
        <p className="mt-5 line-clamp-2 text-[15px] leading-[1.7] text-umber">
          {locale === 'ru' ? (bio.teaserRu ?? bio.teaser) : bio.teaser}
        </p>
      )}
    </button>
  );
}

function TeamDrawer({ member, locale = 'en' }: { member: TeamMember; locale?: 'en' | 'ru' }) {
  const bio = teamBioFor(member.slug);
  if (!bio) return null;
  const role = locale === 'ru' ? (member.roleRu ?? member.role) : member.role;
  const paras = locale === 'ru' ? (bio.bioRu ?? bio.bio) : bio.bio;
  const creds = locale === 'ru' ? (bio.credentialsRu ?? bio.credentials) : bio.credentials;

  return (
    <motion.div
      key={member.slug}
      id={`team-drawer-${member.slug}`}
      role="region"
      aria-label={locale === 'ru' ? `${member.name} — биография` : `${member.name} — biography`}
      className="col-span-full overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        height: { duration: 0.5, ease: EASE_IN_OUT_LUXE },
        opacity: { duration: 0.3, ease: 'easeOut' },
      }}
      onAnimationComplete={() => ScrollTrigger.refresh()}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
        className="grid gap-10 border border-stone bg-ivory p-8 md:grid-cols-12 md:gap-14 md:p-12"
      >
        {/* Identity — no repeated portrait (already on the card above) */}
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-bronze">
            {role}
          </p>
          <h3 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.1] text-ink">
            {member.name}
          </h3>
          <span
            className="mt-8 block h-px w-14 bg-bronze"
            aria-hidden="true"
          />
        </div>

        {/* Biography + credentials */}
        <div className="md:col-span-8">
          <div className="max-w-2xl">
            {paras.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="mb-5 text-[16px] leading-[1.75] text-umber last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>

          <p className="mt-10 font-mono text-[10px] font-medium uppercase tracking-eyebrow text-mist">
            {locale === 'ru' ? 'Регалии' : 'Credentials'}
          </p>
          <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {creds.map((cred) => (
              <li
                key={cred}
                className="flex items-baseline gap-3 border-t border-stone pt-3 font-mono text-xs leading-[1.6] text-ink"
              >
                <span className="text-bronze" aria-hidden="true">
                  —
                </span>
                {cred}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamGrid({ locale = 'en' }: { locale?: 'en' | 'ru' }) {
  const cols = useColumnCount();
  const location = useLocation();
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  /* Deep-linking: /who-we-are#<member-slug> opens that profile drawer. */
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (!hash || hash === 'team') return;
    const member = TEAM.find((m) => m.slug === hash);
    if (!member) return;
    setOpenSlug(member.slug);
    const t = window.setTimeout(() => {
      document
        .getElementById(member.slug)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  const toggle = (slug: string) =>
    setOpenSlug((current) => (current === slug ? null : slug));

  /* Chunk members into rows so the drawer renders directly below the
     row containing the open card, spanning the full grid width. */
  const rows: TeamMember[][] = [];
  for (let i = 0; i < TEAM.length; i += cols) {
    rows.push(TEAM.slice(i, i + cols));
  }

  return (
    <div className="js-team-grid grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row) => (
        <Fragment key={row[0].slug}>
          {row.map((member) => (
            <TeamCard
              key={member.slug}
              member={member}
              open={openSlug === member.slug}
              onToggle={() => toggle(member.slug)}
              locale={locale}
            />
          ))}
          <AnimatePresence
            initial={false}
            onExitComplete={() => ScrollTrigger.refresh()}
          >
            {openSlug && row.some((m) => m.slug === openSlug) && (
              <TeamDrawer
                member={TEAM.find((m) => m.slug === openSlug)!}
                locale={locale}
              />
            )}
          </AnimatePresence>
        </Fragment>
      ))}
    </div>
  );
}
