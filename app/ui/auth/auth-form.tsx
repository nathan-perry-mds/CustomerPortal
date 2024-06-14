"use client";

import { useState } from "react";
import { lusitana } from "../fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey, faExclamationCircle, faArrowRight, faUser } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "../components/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignIn, handleSignUp } from "../../lib/cognitoActions";
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import setBackground from '../../lib/setBackground.js';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setBackground();
  }, []);

  return <Component {...pageProps} />;
}

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [signInErrorMessage, signInDispatch] = useFormState(handleSignIn, undefined);
  const [signUpErrorMessage, signUpDispatch] = useFormState(handleSignUp, undefined);

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="flex justify-center mb-6">
          <Image src="/MDS-logo.jpg" alt="Company Logo" width={256} height={256} />
        </div>
        <h1 className={`${lusitana.className} mb-3 text-2xl text-center`}>
          {isSignUp ? "Create an Account" : "Customer Portal"}
        </h1>
        <form action={isSignUp ? signUpDispatch : signInDispatch} className="space-y-3 auth-form">
          {isSignUp && (
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="name">
                Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  minLength={4}
                />
                <FontAwesomeIcon icon={faUser} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          )}
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <FontAwesomeIcon icon={faAt} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <FontAwesomeIcon icon={faKey} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {isSignUp && (
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  required
                />
                <FontAwesomeIcon icon={faKey} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          )}
          <AuthButton isSignUp={isSignUp} />
          <div className="flex justify-center">
            <a onClick={toggleForm} className="mt-2 cursor-pointer text-blue-500">
              {isSignUp ? "Already have an account? Log in." : "Don't have an account? Sign up."}
            </a>
          </div>
          <div className="flex h-8 items-end space-x-1">
            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
              {(isSignUp ? signUpErrorMessage : signInErrorMessage) && (
                <>
                  <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{isSignUp ? signUpErrorMessage : signInErrorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="auth-background"></div>
    </div>
  );
}

interface AuthButtonProps {
  isSignUp: boolean;
}

function AuthButton({ isSignUp }: AuthButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full bg-customBlue text-white" aria-disabled={pending}>
      {isSignUp ? "Sign Up" : "Log In"} <FontAwesomeIcon icon={faArrowRight} className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
