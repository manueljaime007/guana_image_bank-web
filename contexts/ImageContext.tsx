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
  getUserImages: (userId: number) => ImageData[]; // ✅
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
