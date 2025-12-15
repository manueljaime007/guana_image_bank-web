"use client";
import Link from "next/link";

export default function Footer() {
  const current_year = new Date().getFullYear();
  return (
    <footer className="py-8 px-4 border-t border-white/10 bg-[#080C16]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/50">
          CDCI © {current_year} . Todos os direitos reservados.
        </p>

        <div className="flex gap-6">
          <Link href="#" className="text-sm text-white/50 hover:text-white">
            Privacidade
          </Link>
          <Link href="#" className="text-sm text-white/50 hover:text-white">
            Termos
          </Link>
          <Link href="#" className="text-sm text-white/50 hover:text-white">
            Contato
          </Link>
        </div>
      </div>
    </footer>
  );
}
