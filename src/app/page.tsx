import { ProductsSection } from '@/components/products/ProductsSection/ProductsSection';
import { getHeaders } from '@/libs/utils/headers';
import { getMetadata } from '@/libs/utils/metadata';
import { getUrl } from '@/libs/utils/urls';
import type { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Latest Products - Abelohost Shop";
  const description = "Discover our latest collection of electronics, gadgets, and accessories at unbeatable prices.";
  const url = getUrl({ path: (await getHeaders()).path });

  return await getMetadata({
    title,
    description,
    openGraphArticle: {
      ogUrl: url
    },
  });
};

export default function HomePage() {
  return <ProductsSection/>;
}