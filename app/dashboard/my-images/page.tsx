"use client";

import { useState } from "react";
import { Trash2, Edit2, Search, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PrivateRoute from "@/components/auth/PrivateRoute";

import { useAuth } from "@/contexts/AuthContext";
import { useImages, ImageData, resolveImageUrl } from "@/contexts/ImageContext";
import { toast } from "sonner";

export default function MyImagesPage() {
  const { user } = useAuth();

  const { images: allImages, deleteImage, updateImage } = useImages();

  const userImages = user
    ? allImages.filter((img) => img.userId === user.id)
    : [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [mode, setMode] = useState<"delete" | "edit" | null>(null);

  const [editDescription, setEditDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editTags, setEditTags] = useState<string>("");

  const filteredImages = userImages.filter(
    (img) =>
      img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.tags.some((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  function openDelete(image: ImageData) {
    setSelectedImage(image);
    setMode("delete");
  }

  function openEdit(image: ImageData) {
    setSelectedImage(image);
    setEditDescription(image.description);
    setEditCategoryId(image.category.id);
    setEditTags(image.tags.map((t) => t.name).join(", "));
    setMode("edit");
  }

  function closeModal() {
    setSelectedImage(null);
    setMode(null);
  }

  function confirmDelete() {
    if (!selectedImage) return;

    deleteImage(selectedImage.id);
    toast.success("Imagem excluída");
    closeModal();
  }

  function confirmEdit() {
    if (!selectedImage) return;

    updateImage(selectedImage.id, {
      description: editDescription.trim(),
      categoryId: editCategoryId ?? undefined,
      tags: editTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    toast.success("Imagem atualizada");
    closeModal();
  }

  return (
    <PrivateRoute role="USER">
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Minhas Imagens</h1>
              <p className="text-white/60">
                {userImages.length}{" "}
                {userImages.length === 1 ? "imagem" : "imagens"}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por descrição ou tag..."
                className="pl-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => {
                const imageUrl = resolveImageUrl(image.filePath);
                return (
                  <div
                    key={image.id}
                    className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-400/30 transition"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={image.description}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />

                      {/* Actions */}
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(image)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDelete(image)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <p className="text-white font-medium line-clamp-2">
                        {image.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {/* {image.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400"
                          >
                            #{tag}
                          </span>
                        ))} */}

                        {image.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span className="px-2 py-0.5 rounded bg-white/10">
                          {image.category.name}
                        </span>
                        <span>
                          {format(new Date(image.createdAt), "dd MMM yyyy", {
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl p-12 text-center bg-white/5 border border-white/10">
              <Search className="h-12 w-12 mx-auto text-white/40 mb-4" />
              <h3 className="text-lg font-semibold text-white">
                {searchQuery
                  ? "Nenhuma imagem encontrada"
                  : "Você ainda não tem imagens"}
              </h3>
              <p className="text-white/60">
                {searchQuery
                  ? "Tente outros termos"
                  : "Comece adicionando sua primeira imagem"}
              </p>
            </div>
          )}
        </div>

        {/* MODAL de EDIT */}
        {mode === "edit" && selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="w-full max-w-lg rounded-xl bg-[#080C16] border border-white/10 p-6 space-y-5">
              <h2 className="text-xl font-semibold text-white">
                Editar imagem
              </h2>

              {/* Descrição */}
              <div>
                <label className="text-sm text-white/60">Descrição</label>
                <Input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="text-sm text-white/60">Categoria</label>
                <select
                  value={editCategoryId ?? ""}
                  onChange={(e) => setEditCategoryId(Number(e.target.value))}
                  className="w-full rounded-md bg-black/40 border border-white/10 text-white p-2"
                >
                  <option value="">Selecione</option>
                  {/* depois ligas isso à API */}
                  <option value={1}>Natureza</option>
                  <option value={2}>Arquitetura</option>
                  <option value={3}>Tecnologia</option>
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm text-white/60">
                  Tags (separadas por vírgula)
                </label>
                <Input
                  placeholder="ex: natureza, lago, céu"
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" onClick={closeModal}>
                  Cancelar
                </Button>

                <Button onClick={confirmEdit}>Salvar alterações</Button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL de DELETE */}
        {mode === "delete" && selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl bg-[#080C16] border border-white/10 p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Excluir imagem
              </h2>

              <p className="text-white/60">Essa ação não pode ser desfeita.</p>

              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={closeModal}>
                  Cancelar
                </Button>

                <Button variant="destructive" onClick={confirmDelete}>
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </PrivateRoute>
  );
}
