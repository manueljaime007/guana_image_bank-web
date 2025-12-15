"use client";

import { useState, useMemo } from "react";
import { Search, X, Filter, Calendar, User, Tag } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useImages, ImageData } from "@/contexts/ImageContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CATEGORIES = [
  "Todas",
  "Natureza",
  "Urbano",
  "Cultura",
  "Pessoas",
  "Tecnologia",
  "Abstrato",
  "Outro",
];

const DATE_FILTERS = [
  { value: "all", label: "Todas as datas" },
  { value: "today", label: "Hoje" },
  { value: "week", label: "Última semana" },
  { value: "month", label: "Último mês" },
];

export default function Gallery() {
  const { images } = useImages();

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchesSearch =
        !searchQuery ||
        img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        img.authorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "Todas" || img.category === categoryFilter;

      const imgDate = new Date(img.createdAt);
      const now = new Date();

      let matchesDate = true;
      if (dateFilter === "today") {
        matchesDate = imgDate.toDateString() === now.toDateString();
      } else if (dateFilter === "week") {
        matchesDate = imgDate >= new Date(now.getTime() - 7 * 86400000);
      } else if (dateFilter === "month") {
        matchesDate = imgDate >= new Date(now.getTime() - 30 * 86400000);
      }

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [images, searchQuery, categoryFilter, dateFilter]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Galeria</h1>
          <p className="text-white/60">Explore todas as imagens do sistema</p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar imagens..."
              className="pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filtros
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-wrap gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white"
            >
              {DATE_FILTERS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Grid */}
        {filteredImages.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-cyan-400/50 transition"
              >
                <img src={img.url} className="w-full aspect-4/3 object-cover" />
                <div className="p-3">
                  <p className="text-sm text-white font-medium line-clamp-1">
                    {img.description}
                  </p>
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>{img.authorName}</span>
                    <span>{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/60">Nenhuma imagem encontrada</p>
        )}
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#080C16] rounded-xl max-w-4xl w-full overflow-hidden border border-white/10"
          >
            <img
              src={selectedImage.url}
              className="w-full max-h-100 object-cover"
            />
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-white">
                {selectedImage.description}
              </h3>

              <p className="text-white/60 flex items-center gap-2">
                <User size={14} /> {selectedImage.authorName}
              </p>

              <p className="text-white/60 flex items-center gap-2">
                <Calendar size={14} />
                {format(new Date(selectedImage.createdAt), "dd MMM yyyy", {
                  locale: ptBR,
                })}
              </p>

              <div className="flex flex-wrap gap-1">
                {selectedImage.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
