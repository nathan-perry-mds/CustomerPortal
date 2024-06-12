"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faExclamationCircle } from "@fortawesome/pro-solid-svg-icons";
import { handleSendEmailVerificationCode } from "../../lib/cognitoActions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../button";

export default function SendVerificationCode() {
  const [response, dispatch] = useFormState(handleSendEmailVerificationCode, {
    message: "",
    errorMessage: "",
  });
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        className="mt-4 w-full"
        aria-disabled={pending}
        formAction={dispatch}
      >
        Resend Verification Code{" "}
        <FontAwesomeIcon icon={faArrowRight} className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
      <div className="flex h-8 items-end space-x-1">
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {response?.errorMessage && (
            <>
              <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{response.errorMessage}</p>
            </>
          )}
          {response?.message && (
            <p className="text-sm text-green-500">{response.message}</p>
          )}
        </div>
      </div>
    </>
  );
}
