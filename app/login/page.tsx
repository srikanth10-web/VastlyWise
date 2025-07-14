"use client";
import { LoginPage } from "@/components/login-page";
import { AppHeader } from "@/components/app-header";
import { useRouter } from "next/navigation";

export default function LoginRoute() {
  const router = useRouter();
  return (
    <>
      <AppHeader logoUrl="/placeholder-logo.png" currentUser={null} />
      <LoginPage onLogin={() => {
        router.push("/");
      }} onNavigate={() => {}} />
    </>
  );
} 