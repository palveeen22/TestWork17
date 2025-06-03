import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import type { Metadata } from 'next';
import styles from './login.module.scss';
import { getUrl } from '@/libs/utils/urls';
import { getHeaders } from '@/libs/utils/headers';
import { getMetadata } from '@/libs/utils/metadata';

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Login - Abelohost Shop";
  const description = "Sign in to your Abelohost Shop account to access exclusive features and manage your orders.";
  const url = getUrl({ path: (await getHeaders()).path });

  return await getMetadata({
    title,
    description,
    openGraphArticle: {
      ogUrl: url
    },
  });
};

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className="container">
        <LoginForm />
      </div>
    </div>
  );
}