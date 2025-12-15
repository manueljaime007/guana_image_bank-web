import PrivateRoute from "@/components/auth/PrivateRoute";
import { ImageProvider } from "@/contexts/ImageContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CDCI Banco Imagem",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PrivateRoute>
        <ImageProvider>{children};</ImageProvider>;
      </PrivateRoute>
    </>
  );
}
