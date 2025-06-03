import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';
import { Metadata } from 'next';
import { getUrl } from '@/libs/utils/urls';
import { getHeaders } from '@/libs/utils/headers';
import { getMetadata } from '@/libs/utils/metadata';

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Page Not Found";
  const description = " The page you're looking for doesn't exist.";
  const url = getUrl({ path: (await getHeaders()).path });

  return await getMetadata({
    title,
    description,
    openGraphArticle: {
      ogUrl: url
    },
  });
};

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      textAlign: 'center',
      gap: '1rem'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
        404 - Page Not Found
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
