// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/under-construction');
  }, [router]);

  return null;
};

export default Home;
