"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { apiConfig } from "@/config/api";

export interface ImageData {
  id: number;
  userId: number;
  categoryId: number;
  fileName: string;
  filePath: string;
  mimeType: string;
  size: number;
  description: string;
  createdAt: string;
  deletedAt: string | null;
  category: {
    id: number;
    name: string;
  };
  tags: { id: number; name: string }[];
}

interface ImageContextType {
  images: ImageData[];
  total: number;
  loading: boolean;
  error: string | null;
  fetchAllImages: () => Promise<void>;
  clearImages: () => void;
  getUserImages: (userId: number) => ImageData[];
  deleteImage: (id: number) => Promise<void>;
  updateImage: (
    id: number,
    data: {
      description?: string;
      name?: string;
      categoryId?: number;
      tags?: string[];
    }
  ) => Promise<void>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(apiConfig.endpoints.images.all, {
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar imagens");
      }

      const data = await res.json();

      // 🔥 AQUI ESTAVA O ERRO ANTES
      setImages(data.images);
      setTotal(data.total);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);

  function getUserImages(userId: number) {
    return images.filter((img) => img.userId === userId);
  }

  async function deleteImage(id: number) {
    await fetch(`${apiConfig.baseURL}/images/${id}`, {
      method: "DELETE",
    });

    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  async function updateImage(
    id: number,
    data: {
      description?: string;
      name?: string;
      categoryId?: number;
      tags?: string[];
    }
  ) {
    const res = await fetch(`${apiConfig.baseURL}/images/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Erro ao atualizar imagem");
    }

    const updated = await res.json();

    setImages((prev) => prev.map((img) => (img.id === id ? updated : img)));
  }

  const clearImages = () => {
    setImages([]);
    setTotal(0);
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        total,
        loading,
        error,
        fetchAllImages,
        clearImages,
        getUserImages,
        deleteImage,
        updateImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages deve ser usado dentro de ImageProvider");
  }
  return context;
}

const IMAGES_URL = process.env.NEXT_PUBLIC_API_UPLOADED_IMAGES_URL;
export function resolveImageUrl(filePath: string) {
  return `${IMAGES_URL}/${filePath.replace(/\\/g, "/")}`;
}

