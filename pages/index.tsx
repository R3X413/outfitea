
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Bienvenido a Outfitea</h1>
      <p>Descubre y comparte tus mejores outfits</p>
      <Link href="/sign-in">Iniciar sesión</Link> | <Link href="/sign-up">Registrarse</Link>
    </main>
  );
}
