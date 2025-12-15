"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ImageData {
  id: string;
  url: string;
  description: string;
  tags: string[];
  authorId: number;
  authorName: string;
  createdAt: Date;
  category: string;
}

interface ImageContextType {
  images: ImageData[];
  addImage: (image: Omit<ImageData, "id" | "createdAt">) => void;
  deleteImage: (id: string) => void;
  updateImage: (id: string, data: Partial<ImageData>) => void;
  getUserImages: (userId: number) => ImageData[]; // ✅
}
const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Mock initial images
const mockImages: ImageData[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    description: "Montanhas majestosas ao amanhecer",
    tags: ["natureza", "montanhas", "paisagem"],
    authorId: 2,
    authorName: "Demo User",
    createdAt: new Date("2024-10-01"),
    category: "Natureza",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    description: "Noite estrelada sobre picos nevados",
    tags: ["noite", "estrelas", "neve", "montanhas"],
    authorId: 2,
    authorName: "Demo User",
    createdAt: new Date("2024-10-15"),
    category: "Natureza",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
    description: "Cidade moderna ao entardecer",
    tags: ["cidade", "urbano", "arquitetura"],
    authorId: 2,
    authorName: "Admin User",
    createdAt: new Date("2024-11-01"),
    category: "Urbano",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    description: "Vale verde com neblina matinal",
    tags: ["natureza", "neblina", "verde"],
    authorId: 2,
    authorName: "Admin User",
    createdAt: new Date("2024-11-10"),
    category: "Natureza",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    description: "Templo japonês tradicional",
    tags: ["japão", "cultura", "arquitetura", "tradição"],
    authorId: 2,
    authorName: "Demo User",
    createdAt: new Date("2024-11-20"),
    category: "Cultura",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    description: "Lago cristalino entre montanhas",
    tags: ["lago", "montanhas", "reflexo", "água"],
    authorId: 2,
    authorName: "Admin User",
    createdAt: new Date("2024-12-01"),
    category: "Natureza",
  },
];

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageData[]>(mockImages);

  const addImage = (imageData: Omit<ImageData, "id" | "createdAt">) => {
    const newImage: ImageData = {
      ...imageData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setImages((prev) => [newImage, ...prev]);
  };

  const deleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const updateImage = (id: string, data: Partial<ImageData>) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...data } : img))
    );
  };

  function getUserImages(userId: number) {
    return images.filter((img) => img.authorId === userId);
  }

  return (
    <ImageContext.Provider
      value={{ images, addImage, deleteImage, updateImage, getUserImages }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImages() {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
}
