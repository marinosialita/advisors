import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import vm from 'node:vm';
const root = path.resolve(import.meta.dirname, '..');
const cache = new Map();
function load(relative) {
  const file = path.resolve(root, relative);
  if (cache.has(file)) return cache.get(file);
  const source = fs.readFileSync(file, 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} }; cache.set(file, module.exports);
  const require = specifier => {
    if (!specifier.startsWith('.')) throw new Error('Only local content imports are permitted: '+specifier);
    return load(path.relative(root, path.resolve(path.dirname(file), specifier+'.ts')));
  };
  vm.runInNewContext('(function(require,module,exports){'+code+'\n})', {})(require,module,module.exports);
  return module.exports;
}
const { CONTACT, LEGAL, TEAM } = load('src/data/site.ts');
const { TEAM_BIOS } = load('src/components/who-we-are/team-data.ts');
const { INSIGHTS } = load('src/data/insights.ts');
const { CORPORATE_SERVICES, PRIVATE_SERVICES } = load('src/components/services/data.ts');
const { SERVICE_DETAILS } = load('src/components/services/details.ts');
const records = [
  { page: '/contact', type: 'contact', content: { ...CONTACT, ...LEGAL } },
  ...TEAM.map(person => ({ page: '/who-we-are', type: 'team', content: {
    name: person.name, role: person.role, roleRu: person.roleRu,
    ...(TEAM_BIOS.find(bio => bio.slug === person.slug) || {}),
  }})),
  ...[['corporate',CORPORATE_SERVICES],['private',PRIVATE_SERVICES]].flatMap(([group, services]) => services.map(service => ({
    page: (group === 'corporate' ? '/for-corporates/' : '/for-private-clients/')+service.slug,
    type: 'service', content: { ...service, blocks: SERVICE_DETAILS[group][service.slug] || [] },
  }))),
  ...INSIGHTS.map(article => ({ page: '/insights/'+article.slug, type: 'article', content: {
    title: article.title, updated: article.updated, lead: article.lead, blocks: article.blocks,
  }})),
];
const output = '/* Generated from website data. Run node scripts/sync-scopy-knowledge.mjs after content edits, then redeploy website-api. */\nexport const WEBSITE_KNOWLEDGE = '+JSON.stringify(JSON.stringify(records))+';\n';
fs.writeFileSync(path.join(root,'supabase/functions/website-api/knowledge.ts'), output);
console.log(JSON.stringify({ records: records.length, team: TEAM.length, services: CORPORATE_SERVICES.length+PRIVATE_SERVICES.length, articles: INSIGHTS.length, bytes: output.length }));
