"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "user" | "admin"; // role permitida
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login"); // não logado
      } else if (role && user.role.toLowerCase() !== role) {
        router.replace("/admin/dashboard"); // logado, mas sem permissão
      }
    }
  }, [user, isLoading, role, router]);

  if (isLoading || !user || (role && user.role.toLowerCase() !== role)) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return <>{children}</>;
}
