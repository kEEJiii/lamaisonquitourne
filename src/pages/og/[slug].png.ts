import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const prerender = true;
export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map(article => ({ params: { slug: article.id }, props: { article } }));
};

// Bundled assets keep image generation independent of fonts installed on the build host.
const font = await readFile(`${process.cwd()}/src/assets/fonts/BricolageGrotesque-Bold.ttf`);
const logo = await readFile(`${process.cwd()}/public/logo-mark.svg`);
const logoUrl = `data:image/svg+xml;base64,${logo.toString('base64')}`;

export const GET: APIRoute = async ({ props }) => {
  const { title, category } = props.article.data;
  const svg = await satori({
    type: 'div',
    props: {
      style: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '56px 64px', backgroundColor: '#F3F5F2', color: '#16323C', fontFamily: 'Bricolage', fontWeight: 700 },
      children: [
        { type: 'div', props: { style: { display: 'flex', alignItems: 'center', gap: 20 }, children: [
          { type: 'img', props: { src: logoUrl, width: 58, height: 58 } },
          { type: 'div', props: { style: { fontSize: 30 }, children: 'La Maison qui Tourne' } },
        ] } },
        { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, gap: 20 }, children: [
          { type: 'div', props: { style: { fontSize: 23, color: '#94600B' }, children: category } },
          { type: 'div', props: { style: { fontSize: title.length > 85 ? 56 : 64, lineHeight: 1.12, letterSpacing: '-1.5px' }, children: title } },
        ] } },
        { type: 'div', props: { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 22, borderTop: '2px solid #DFE5E1', fontSize: 22, color: '#3C5A66' }, children: [
          { type: 'div', props: { children: 'Home Assistant, testé en famille' } },
          { type: 'div', props: { children: 'lamaisonquitourne.fr' } },
        ] } },
      ],
    },
  }, { width: 1200, height: 630, fonts: [{ name: 'Bricolage', data: font, weight: 700, style: 'normal' }] });
  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
