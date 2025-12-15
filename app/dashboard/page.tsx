"use client";

import { apiConfig } from "@/config/api";
import Link from "next/link";
import { Images, Upload, TrendingUp, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useImages } from "@/contexts/ImageContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/button";
import { useEffect } from "react";

export default function Dashboard() {
  const { images, getUserImages, fetchAllImages } = useImages();
  const { user } = useAuth();

  useEffect(() => {
    fetchAllImages();
  }, [fetchAllImages]);

  // const userImages = user ? getUserImages(user.id) : []; // só em casos complexos.

  const myImages = user ? images.filter((img) => img.userId === user.id) : [];

  const recentImages = myImages.slice(0, 4);

  const stats = [
    {
      label: "Minhas Imagens",
      value: myImages.length,
      icon: Images,
      color: "bg-cyan-400/10 text-cyan-400",
    },
    {
      label: "Total no Sistema",
      value: images.length,
      icon: TrendingUp,
      color: "bg-green-500/10 text-green-500",
    },
    {
      label: "Este Mês",
      value: myImages.filter(
        (img) => new Date(img.createdAt).getMonth() === new Date().getMonth()
      ).length,
      icon: Calendar,
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  // console.log("Imagens", images);
  // console.log(images.length);
  // console.log("Minhas imagens", myImages);
  // console.log(getUserImages(user!.id));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Olá, {user?.name?.split(" ")[0]}!
            </h1>
            <p className="mt-1 text-white/60">
              Bem-vindo ao seu painel de controle
            </p>
          </div>

          <Link href="/dashboard/upload">
            <Button size="lg">
              <Upload className="h-5 w-5" />
              Nova Imagem
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-6 bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Images */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Imagens Recentes
            </h2>
            <Link href="/my-images">
              <Button variant="primary">Ver todas</Button>
            </Link>
          </div>

          {recentImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentImages.map((image) => {
                const imageUrl = `http://localhost:4007/${image.filePath.replace(
                  /\\/g,
                  "/"
                )}`;
                const {} = image;
                return (
                  <div
                    key={image.id}
                    className="rounded-xl overflow-hidden bg-white/5 border border-white/10"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={image.description}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-white truncate">
                        {image.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {image.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag.id}
                            className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl p-12 text-center bg-white/5 border border-white/10">
              <Images className="h-16 w-16 mx-auto text-white/40 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Nenhuma imagem ainda
              </h3>
              <p className="text-white/60 mb-4">
                Comece adicionando sua primeira imagem
              </p>
              <Link href="/upload">
                <Button>
                  <Upload className="h-4 w-4" />
                  Adicionar Imagem
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/upload">
            <div className="cursor-pointer rounded-xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Upload size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Cadastrar Imagem
                  </h3>
                  <p className="text-sm text-white/60">
                    Faça upload de novas imagens
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/gallery">
            <div className="cursor-pointer rounded-xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-green-500/10 text-green-500">
                  <Images size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Explorar Galeria
                  </h3>
                  <p className="text-sm text-white/60">
                    Veja todas as imagens do sistema
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
