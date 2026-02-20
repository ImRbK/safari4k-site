import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Parcerias", href: "/parcerias" },
  { label: "Bets", href: "/bets" },
  { label: "Setup", href: "/setup" },
];

export default function NavLinks() {
  return (
    <nav className="space-y-2">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="block px-3 py-2 rounded-xl hover:bg-white/5 border border-white/0 hover:border-white/10 transition"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
