// app/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const isLoggedIn = () => {
  // Replace this with your actual logic to check if the user is authenticated
  // For example, checking a token in local storage or calling an API
  const token = localStorage.getItem('authToken');
  return !!token;
};

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('auth');
    }
  }, [router]);

  return null
};

export default Home;
