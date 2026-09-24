import { Link } from 'react-router-dom';
import { INSIGHTS } from '@/data/insights';
import usePageMeta from '@/components/usePageMeta';
import useHtmlLang from '@/components/useHtmlLang';

export default function Articles({ locale = 'en' }: { locale?: 'en' | 'ru' }) {
  const isRu = locale === 'ru';
  const title = isRu ? 'Статьи' : 'Articles';
  useHtmlLang(locale);
  usePageMeta(`${title} — SC Advisors`);

  return (
    <section className="min-h-screen bg-bone pb-24 pt-40" aria-label={title}>
      <div className="mx-auto max-w-site px-gutter">
        <p className="eyebrow mb-8">SC Advisors</p>
        <h1 className="font-display text-5xl font-light text-ink md:text-7xl">{title}</h1>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {INSIGHTS.map((article) => {
            const copy = isRu && article.ru ? article.ru : article;
            return (
              <Link key={article.slug} to={`${isRu ? '/ru' : ''}/insights/${article.slug}`} className="group overflow-hidden border border-stone bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze">
                <img src={article.image} alt={article.imageAlt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                <div className="p-8">
                  <p className="eyebrow mb-4">{copy.tag}</p>
                  <h2 className="font-display text-3xl text-ink group-hover:text-bronze">{copy.title}</h2>
                  <p className="mt-4 leading-relaxed text-umber">{copy.excerpt}</p>
                  <p className="mt-6 font-mono text-xs text-bronze">{isRu ? 'Читать статью' : 'Read article'} →</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
