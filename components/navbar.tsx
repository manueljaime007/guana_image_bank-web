"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const LOGO = "BancoImagem";

  return (
    <header className="fixed top-0 w-full z-50 bg-[#080C16]/80 backdrop-blur border-b border-white/10">
      <div className="max-w-[85rem] mx-auto h-16 px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-cyan-400">
          ImageHub
        </Link>

        <div className="flex items-center gap-6">
          <ThemeToggle />

          <Link href="/login">
            {/* <button className="text-sm text-white/70 hover:text-white">
              Entrar
              </button> */}
            <Button className="py-1">Entrar</Button>
          </Link>

          <Link href="/register">
            <Button className="flex items-center gap-2 bg-cyan-400 text-black px-4 py-2 rounded-lg hover:bg-cyan-300 transition">
              Começar
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
