import { redirect } from "next/navigation";
import { signUp, confirmSignUp, signIn, signOut, resendSignUpCode } from "aws-amplify/auth";
import { getErrorMessage } from "../utils/get-error-message"; 

export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")),
          name: String(formData.get("name")),
        },
        // optional
        autoSignIn: true,
        },
    });
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  let currentState;
  try {
    await resendSignUpCode({ username: String(formData.get("email")) });
    currentState = {
      ...prevState,
      message: "Code sent successfully",
    };
  } catch (error) {
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(error),
    };
  }
  return currentState;
}

export async function handleConfirmSignUp(prevState: string | undefined, formData: FormData) {
  try {
    await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

export async function handleSignIn(prevState: string | undefined, formData: FormData) {
  let redirectLink = "/data";
  try {
    const { isSignedIn, nextStep } = await signIn({username: String(formData.get("email")), password: String(formData.get("password")),});
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: String(formData.get("email")),
      });
      redirectLink = "/data";
    }
  } catch (error) {
    return getErrorMessage(error);
  }

  redirect(redirectLink);
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
  redirect("/auth");
}