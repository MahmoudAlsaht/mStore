import { redirect } from "next/navigation";
import { checkUser } from "./isAuthenticated";

export async function isAuthorizedUser() {
  const user = await checkUser();
  if (user == null || user.role === "customer") redirect("/");
}

export async function isAdmin() {
  const user = await checkUser();
  if (user == null || user.role !== "admin") redirect("/");
}

export async function isEditor() {
  const user = await checkUser();
  if (user == null || user.role === "staff" || user.role === "customer")
    redirect("/");
}
