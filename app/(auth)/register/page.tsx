"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";

import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password);
      toast.success("Conta criada com sucesso!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#080C16] text-white">
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-purple-600/30 to-black" />
        <div className="relative z-10 flex items-end p-12">
          <div>
            <h3 className="text-3xl font-bold">Comece sua jornada visual</h3>
            <p className="mt-2 text-white/70 max-w-md">
              Crie sua conta e organize suas imagens com estilo.
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-cyan-400">ImageHub</h1>
            <p className="text-white/60 mt-1">Criar conta</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
          >
            <div>
              <Label>Nome completo</Label>
              <Input
                value={name}
                placeholder="Seu nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label>E-mail</Label>
              <Input
                value={email}
                placeholder="seu@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Senha</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password} // conecta o estado
                  onChange={(e) => setPassword(e.target.value)} // atualiza o estado
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <Label>Confirmar senha</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <Button disabled={isLoading} className="w-full">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Criando conta...
                </span>
              ) : (
                "Criar conta"
              )}
            </Button>

            <p className="text-center text-sm text-white/60">
              Já tem conta?{" "}
              <Link href="/login" className="text-cyan-400 hover:underline">
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
