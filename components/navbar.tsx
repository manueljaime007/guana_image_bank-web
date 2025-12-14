import Link from "next/link";

export const Navbar = () => {
  return (
    <header>
      <a href="/">
        <h1>ImageHub</h1>
      </a>

      <div>
        <Link href="/login">Entrar</Link>
        <Link href="/register">Começar</Link>
      </div>
    </header>
  );
};
