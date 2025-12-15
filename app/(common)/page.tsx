"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Images, Sparkles, Upload, Users } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading || user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  const features = [
    {
      icon: Upload,
      title: "Upload Fácil",
      description:
        "Faça upload de suas imagens com descrições e tags personalizadas",
    },
    {
      icon: Images,
      title: "Galeria Organizada",
      description:
        "Navegue por suas imagens com filtros por categoria, data e tags",
    },
    {
      icon: Users,
      title: "Gestão Completa",
      description: "Painel administrativo para gerenciar usuários e conteúdo",
    },
  ];

  // Mostrar landing page apenas para não logados
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm mb-8">
            <Sparkles className="w-5" />
            Seu banco de imagens pessoal
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Organize suas <span className="text-cyan-400">imagens</span>
            <br />
            com elegância
          </h1>

          <p className="text-lg text-gray-400 mb-10">
            Uma plataforma moderna para gerenciar, categorizar e compartilhar
            suas imagens de forma simples.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button className="">
                Criar conta gratuita
                <ArrowRight />
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="outline">Fazer login</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden card-shadow">
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600"
              alt="Preview"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tudo o que você precisa</h2>
            <p className="text-gray-400">
              Recursos pensados para facilitar sua experiência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-8 shadow-md border-1 border-gray-500/10"
              >
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                  <feature.icon className="text-cyan-400" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto shadow-md bg-[#0A101C] rounded-3xl">
          <div className="glass rounded-3xl px-12 py-20 flex flex-col items-center ">
            <h2 className="text-4xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-gray-400 mb-8">
              Crie sua conta gratuitamente hoje mesmo.
            </p>

            <Link href="/register">
              <Button>
                Criar conta gratuita
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
