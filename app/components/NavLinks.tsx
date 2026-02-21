"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Parcerias", href: "/parcerias" },
  { name: "Bets", href: "/bets" },
  { name: "Setup", href: "/setup" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`block px-4 py-3 rounded-2xl border transition ${
              active
                ? "border-[color:var(--gold)]/40 bg-white/10"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            {l.name}
          </Link>
        );
      })}
    </nav>
  );
}
