import { pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { Hero } from '@/components/home/Hero';
import { TwoPaths } from '@/components/home/TwoPaths';
import { Possibilities } from '@/components/home/Possibilities';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ShopPreview } from '@/components/home/ShopPreview';
import { BrandStatement } from '@/components/home/BrandStatement';

export const metadata = pageMetadata({
  title: SITE.name,
  description: SITE.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TwoPaths />
      <Possibilities />
      <FeaturedProjects />
      <ShopPreview />
      <BrandStatement />
    </>
  );
}
