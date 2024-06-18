"use client";

import { useState, FormEvent } from "react";
import { lusitana } from "../fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey, faExclamationCircle, faArrowRight, faUser } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "../components/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignIn, handleSignUp, handleConfirmSignUp } from "../../lib/cognitoActions";
import Link from "next/link";
import Image from "next/image";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');

  const [signInErrorMessage, signInDispatch] = useFormState(handleSignIn, undefined);
  const [signUpErrorMessage, signUpDispatch] = useFormState(handleSignUp, undefined);
  const [verifyErrorMessage, verifyDispatch] = useFormState(handleConfirmSignUp, undefined);

  const toggleForm = () => setIsSignUp(!isSignUp);

  const handleSignUpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
    } else {
      setPasswordMatchError('');
      const formData = new FormData(event.target as HTMLFormElement);
      setEmail(formData.get('email') as string);
      signUpDispatch(formData);
      setIsVerifying(true);
    }
  };

  const handleVerifySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    verifyDispatch(formData);
    if (!verifyErrorMessage) {
      setIsVerifying(false);
      setIsSignUp(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="flex justify-center mb-6">
          <Image src="/MDS-logo.jpg" alt="Company Logo" width={256} height={256} />
        </div>
        <h1 className={`${lusitana.className} mb-3 text-3xl text-center`}>
          {isVerifying ? "Verify Your Account" : isSignUp ? "Create an Account" : "Customer Portal"}
        </h1>
        {!isVerifying ? (
          <form onSubmit={handleSignUpSubmit} className="space-y-6 auth-form">
            {isSignUp && (
              <div>
                <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="name">
                  Name
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:border-main focus:border-4"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    minLength={4}
                  />
                  <FontAwesomeIcon icon={faUser} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-main" />
                </div>
              </div>
            )}
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:border-main focus:border-4"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FontAwesomeIcon icon={faAt} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-main" />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:border-main focus:border-4"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FontAwesomeIcon icon={faKey} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-main" />
              </div>
            </div>
            {isSignUp && (
              <div className="mt-4">
                <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:border-main focus:border-4"
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faKey} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-main" />
                </div>
                {passwordMatchError && (
                  <p className="text-sm text-red-500 mt-1">{passwordMatchError}</p>
                )}
              </div>
            )}
            <AuthButton isSignUp={isSignUp} isVerifying={isVerifying} />
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
        ) : (
          <form onSubmit={handleVerifySubmit} className="space-y-6 verification-form">
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="verificationCode">
                Verification Code
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:border-main focus:border-4"
                  id="verificationCode"
                  type="text"
                  name="code"
                  placeholder="Enter the verification code sent to your email"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <FontAwesomeIcon icon={faKey} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-main" />
              </div>
              {verifyErrorMessage && <p className="text-sm text-red-500 mt-1">{verifyErrorMessage}</p>}
            </div>
            <AuthButton isVerifying={true} />
          </form>
        )}
      </div>
      <div className="auth-background"></div>
    </div>
  );
}

interface AuthButtonProps {
  isSignUp?: boolean;
  isVerifying?: boolean;
}

function AuthButton({ isSignUp, isVerifying }: AuthButtonProps) {
  const { pending } = useFormStatus();
  let buttonText = "Log In";
  if (isSignUp) buttonText = "Sign Up";
  if (isVerifying) buttonText = "Verify";

  return (
    <Button className="mt-4 w-full bg-customBlue text-white" aria-disabled={pending}>
      {buttonText} <FontAwesomeIcon icon={faArrowRight} className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
