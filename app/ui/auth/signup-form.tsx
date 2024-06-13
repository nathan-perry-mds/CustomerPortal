// ui/auth/signup-form.tsx
"use client";

import { lusitana } from "../fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey, faExclamationCircle, faArrowRight, faUser } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "../components/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleSignUp } from "../../lib/cognitoActions";
import Link from "next/link";

export default function SignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleSignUp, undefined);

  return (
    <div className="sign-up-container">
      <form action={dispatch} className="space-y-3 sign-up-form">
        <div className="rounded-lg px-6 pb-4 pt-8 bg-white shadow-lg flex flex-col justify-center h-full">
          <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Please create an account.
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
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
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
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
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
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
          </div>
          <SignUpButton />
          <div className="flex justify-center">
            <Link
              href="/auth/login"
              className="mt-2 cursor-pointer text-blue-500"
            >
              Already have an account? Log in.
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

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full bg-customBlue text-white" aria-disabled={pending}>
      Sign Up <FontAwesomeIcon icon={faArrowRight} className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
