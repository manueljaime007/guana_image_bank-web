import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "CDCI Banco Imagem",
// };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
