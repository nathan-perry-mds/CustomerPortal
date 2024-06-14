"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('auth'); // Redirect to auth page if not logged in
    } else {
      router.push('data'); // Redirect to data page if logged in
    }
  }, [session, status, router]);

  return null;
};

export default Home;
