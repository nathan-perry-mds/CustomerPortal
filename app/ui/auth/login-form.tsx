"use client";

import { lusitana } from "../fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey, faExclamationCircle, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "../components/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignIn } from "../../lib/cognitoActions";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(handleSignIn, undefined);

  return (
    <div className="login-container">
      <form action={dispatch} className="space-y-3 login-form">
        <div className="rounded-lg px-6 pb-4 pt-8 bg-white shadow-lg">
          <div className="flex justify-center mb-6">
            <Image src="/MDS-logo.jpg" alt="Company Logo" width={256} height={256} />
          </div>
          <h1 className={`${lusitana.className} mb-3 text-2xl text-center`}>
            Customer Portal
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 input-focused"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <FontAwesomeIcon icon={faAt} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:icon-focused" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 input-focused"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <FontAwesomeIcon icon={faKey} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:icon-focused" />
              </div>
            </div>
          </div>
          <LoginButton />
          <div className="flex justify-center">
            <Link
              href="/auth/signup"
              className="mt-2 cursor-pointer text-blue-500"
            >
              {"Don't have an account? "} Sign up.
            </Link>
          </div>
          <div className="flex h-8 items-end space-x-1">
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full bg-customBlue text-white" aria-disabled={pending}>
      Log in <FontAwesomeIcon icon={faArrowRight} className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
