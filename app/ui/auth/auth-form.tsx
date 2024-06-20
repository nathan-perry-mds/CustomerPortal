"use client";

import { useState, FormEvent } from "react";
import { lusitana } from "../fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey, faExclamationCircle, faArrowRight, faUser, faRedo } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "../components/button";
import { handleSignIn, handleSignUp, handleConfirmSignUp, handleSendEmailVerificationCode } from "../../lib/cognitoActions";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";  // Import useRouter from next/navigation

export default function AuthForm() {
  const router = useRouter();  // Initialize useRouter

  const [isSignUp, setIsSignUp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const toggleForm = () => setIsSignUp(!isSignUp);

  const handleSignUpSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
    } else {
      setPasswordMatchError('');
      setLoading(true);
      const formData = new FormData(event.target as HTMLFormElement);
      setEmail(String(formData.get('email')));

      try {
        const error = await handleSignUp(undefined, formData);
        if (error) {
          setErrorMessage(error);
        } else {
          setIsVerifying(true);
        }
      } catch (error) {
        setErrorMessage('An error occurred during sign up');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("code", verificationCode);

    try {
      const result = await handleConfirmSignUp(undefined, formData);
      if (result === true) {  // Check for success
        setSuccessMessage('Verification successful! Logging in...');
        // Show success message and then log in the user after a delay
        setTimeout(async () => {
          const signInFormData = new FormData();
          signInFormData.append("email", email);
          signInFormData.append("password", password);
          const redirectLink = await handleSignIn(undefined, signInFormData);
          if (typeof redirectLink === 'string') {
            router.push(redirectLink);
          } else {
            setErrorMessage(redirectLink);
          }
        }, 3000); // 3-second delay to show the success message
      } else {
        setErrorMessage(result);
      }
    } catch (error) {
      setErrorMessage('Invalid code provided, please request a code again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);

    try {
      const state = await handleSendEmailVerificationCode({ message: '', errorMessage: '' }, formData);
      if (state.errorMessage) {
        setErrorMessage(state.errorMessage);
      } else {
        setSuccessMessage(state.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred while resending the code.');
    } finally {
      setLoading(false);
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
            <AuthButton isSignUp={isSignUp} isVerifying={isVerifying} loading={loading} />
            <div className="flex justify-center">
              <a onClick={toggleForm} className="mt-2 cursor-pointer text-blue-500">
                {isSignUp ? "Already have an account? Log in." : "Don't have an account? Sign up."}
              </a>
            </div>
            <div className="flex h-8 items-end space-x-1">
              <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                {errorMessage && (
                  <>
                    <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
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
                  placeholder="Enter the verification code"
                  required
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <FontAwesomeIcon icon={faKey} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-main" />
              </div>
              {errorMessage && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
              {successMessage && <p className="text-sm text-green-500 mt-1">{successMessage}</p>}
            </div>
            <AuthButton isVerifying={true} loading={loading} />
            <div className="flex justify-center mt-4">
              <Button onClick={handleResendCode} className="bg-gray-300 text-black" aria-disabled={loading}>
                {loading ? "Resending..." : "Resend Code"} <FontAwesomeIcon icon={faRedo} className="ml-2 h-5 w-5 text-black" />
              </Button>
            </div>
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
  loading?: boolean;
}

function AuthButton({ isSignUp, isVerifying, loading }: AuthButtonProps) {
  let buttonText = "Log In";
  if (isSignUp) buttonText = "Sign Up";
  if (isVerifying) buttonText = "Verify";

  return (
    <Button className="mt-4 w-full bg-customBlue text-white" aria-disabled={loading}>
      {loading ? "Loading..." : buttonText} <FontAwesomeIcon icon={faArrowRight} className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
