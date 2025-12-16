"use client";

import { useState, useRef } from "react";
import {
  Upload as UploadIcon,
  X,
  Plus,
  ImagePlus,
  Loader2,
} from "lucide-react";

import PrivateRoute from "@/components/auth/PrivateRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Textarea } from "@/components/ui/Textarea";

import { useAuth } from "@/contexts/AuthContext";
import { useImages } from "@/contexts/ImageContext";
import { toast } from "sonner";

const CATEGORIES = [
  "Natureza",
  "Urbano",
  "Cultura",
  "Pessoas",
  "Tecnologia",
  "Abstrato",
  "Outro",
];

export default function UploadPage() {
  const { user } = useAuth();
  const { addImage } = useImages();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function addTag() {
    const value = tagInput.trim().toLowerCase();
    if (!value || tags.includes(value)) return;
    setTags([...tags, value]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!imageUrl || !description || !category) {
      toast.error("Preencha todos os campos");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    addImage({
      url: imageUrl,
      description,
      tags,
      category,
      authorId: user!.id,
      authorName: user!.name,
    });

    toast.success("Imagem cadastrada com sucesso!");
    setPreviewUrl("");
    setImageUrl("");
    setDescription("");
    setCategory("");
    setTags([]);
    setIsLoading(false);
  }

  return (
    <PrivateRoute role="USER">  
      <DashboardLayout>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-white">Cadastrar Imagem</h1>

          {/* Upload */}
          <div className="rounded-xl p-6 bg-white/5 border border-white/10">
            {!previewUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center cursor-pointer hover:border-cyan-400/50 transition"
              >
                <ImagePlus className="mx-auto mb-3 text-white/50" />
                <p className="text-white/60">
                  Clique para selecionar uma imagem
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="rounded-xl w-full max-h-80 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl("");
                    setImageUrl("");
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80"
                >
                  <X className="text-white" />
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
                setImageUrl(url);
              }}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm">Descrição</label>
            <Textarea
              className="mt-2"
              placeholder="Descreva a imagem..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm">Categoria</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm transition ${
                    category === cat
                      ? "bg-cyan-400 text-black"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-white/80 text-sm">Tags</label>
            <div className="flex gap-2 mt-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                placeholder="Digite e pressione Enter"
              />
              <Button type="button" onClick={addTag}>
                <Plus />
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 text-sm"
                >
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button disabled={isLoading} className="w-full" size="lg">
            {isLoading ? <Loader2 className="animate-spin" /> : <UploadIcon />}
            Salvar Imagem
          </Button>
        </form>
      </DashboardLayout>
    </PrivateRoute>
  );
}
