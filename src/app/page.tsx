import { ProductsSection } from '@/components/products/ProductsSection/ProductsSection';
import { getMetadata } from '@/libs/utils/metadata';
import { Metadata } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Latest Products - Abelohost Shop";
  const description = "Discover our latest collection of electronics, gadgets, and accessories at unbeatable prices.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return await getMetadata({
    title,
    description,
    openGraphArticle: {
      ogUrl: baseUrl
    },
  });
};



export default function HomePage() {
  return <ProductsSection/>;
}