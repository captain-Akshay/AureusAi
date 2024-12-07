"use server";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "../auth";

export const loginUsingProvider = async (provider: string) => {
  await signIn(provider, { redirectTo: "/dashboard" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut();
  revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/dashboard",
  };

  // const existingUser = await getUserByEmail(rawFormData.email as string);
  try {
    await signIn("credentials", rawFormData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid password" };
        case "CallbackRouteError":
          return {
            error:
              "Your email or password might be wrong you dumbass save your password in browser to get hacked",
          };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
  revalidatePath("/");
};
