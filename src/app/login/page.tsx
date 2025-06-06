import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import type { Metadata } from 'next';
import styles from './login.module.scss';
import { getMetadata } from '@/libs/utils/metadata';

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Login - Abelohost Shop";
  const description = "Sign in to your Abelohost Shop account to access exclusive features and manage your orders.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  return await getMetadata({
    title,
    description,
    openGraphArticle: {
      ogUrl: baseUrl
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