"use client";
import { RegisterPage } from "@/components/register-page";
import { AppHeader } from "@/components/app-header";
import { useRouter } from "next/navigation";

export default function RegisterRoute() {
  const router = useRouter();
  return (
    <>
      <AppHeader logoUrl="/placeholder-logo.png" currentUser={null} />
      <RegisterPage onNavigate={(page) => {
        if (page === "login") {
          router.push("/login");
        }
      }} />
    </>
  );
} 