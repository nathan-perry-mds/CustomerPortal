// app/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('pages/under-construction');
  }, [router]);

  return null;
};

export default Home;