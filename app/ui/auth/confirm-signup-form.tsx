"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey, faExclamationCircle, faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "../components/button";
import { useFormState, useFormStatus } from "react-dom";
import { handleConfirmSignUp } from "../../lib/cognitoActions";
import SendVerificationCode from "../auth/send-verification-code-form";

export default function ConfirmSignUpForm() {
  const [errorMessage, dispatch] = useFormState(handleConfirmSignUp, undefined);
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-[#1232db]">
          Please confirm your account.
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
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-[#1232db] focus:ring-[#1232db]"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <FontAwesomeIcon icon={faAt} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-[#1232db]" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="code"
            >
              Code
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-[#1232db] focus:ring-[#1232db]"
                id="code"
                type="text"
                name="code"
                placeholder="Enter code"
                required
                minLength={6}
              />
              <FontAwesomeIcon icon={faKey} className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-[#1232db]" />
            </div>
          </div>
        </div>
        <ConfirmButton />
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
        <SendVerificationCode />
      </div>
    </form>
  );
}

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full bg-[#1232db] hover:bg-[#0f2ba5] active:bg-[#0c2284]" aria-disabled={pending}>
      Confirm <FontAwesomeIcon icon={faArrowRight} className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
