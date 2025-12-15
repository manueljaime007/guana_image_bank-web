"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Images,
  Upload,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Users,
  Shield,
} from "lucide-react";

import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import Button from "../ui/button";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const userNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/upload", label: "Cadastrar Imagem", icon: Upload },
    { href: "/dashboard/my-images", label: "Minhas Imagens", icon: Images },
  ];

  const adminNavItems = [
    { href: "/admin", label: "Painel Admin", icon: Shield },
    { href: "/admin/users", label: "Usuários", icon: Users },
  ];

  const navItems =
    user?.role === "admin" ? [...userNavItems, ...adminNavItems] : userNavItems;

  return (
    <div className="min-h-screen bg-[#080C16] text-white">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#080C16] border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-16">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <Link href="/dashboard" className="text-xl font-bold text-cyan-400">
            ImageHub
          </Link>

          <ThemeToggle />
        </div>
      </header>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-[#080C16] border-r border-white/10 transition-transform duration-300",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Link
              href="/dashboard"
              className="text-2xl font-bold text-cyan-400"
            >
              ImageHub
            </Link>
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>

          {/* User */}
          <div className="px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center">
                <span className="text-cyan-400 font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-white/50 capitalize">
                  {user?.role === "ADMIN" ? "Admin" : "User"}
                </p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition",
                    isActive
                      ? "bg-cyan-400 text-black"
                      : "text-white/80 hover:bg-white/10"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-white/60 hover:text-red-500"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
