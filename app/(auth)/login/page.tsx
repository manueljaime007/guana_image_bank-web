"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#080C16] text-white">
      {/* FORM */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-cyan-400">ImageHub</h1>
            <p className="text-white/60 mt-1">Entre na sua conta</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur rounded-2xl p-8 space-y-6 shadow-lg border border-white/10"
          >
            <div>
              <Label>E-mail</Label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Senha</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button disabled={isLoading} variant="glow" className="w-full py-3">
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            <p className="text-sm text-center text-white/60">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-cyan-400 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT IMAGE / HIGHLIGHT */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/30 via-blue-600/30 to-black" />

        {/* Background image (opcional, se quiseres depois) */}
        <img
          // src="/images/login-bg.jpg"
          src="https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHIlQzMlQTlkaW9zfGVufDB8fDB8fHww"
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative z-10 flex items-end p-12">
          <div className="max-w-md">
            <h3 className="text-3xl font-bold leading-tight">
              Organize suas imagens <br /> de forma inteligente
            </h3>
            <p className="mt-3 text-white/70">
              Acesse sua conta e gerencie sua galeria com rapidez, estilo e
              controle total.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
