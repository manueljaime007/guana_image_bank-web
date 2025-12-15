"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function PrivateRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "USER" | "ADMIN";
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }

    if (!isLoading && role && user?.role !== role) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, role, router]);

  if (isLoading || !user) return null;

  return <>{children}</>;
}
