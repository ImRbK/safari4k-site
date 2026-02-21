"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/", icon: "🏠" },
  { name: "Parcerias", href: "/parcerias", icon: "🤝" },
  { name: "Bets", href: "/bets", icon: "🎯" },
  { name: "Setup", href: "/setup", icon: "⚙️" },
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
            className={[
              "group relative flex items-center gap-3 rounded-2xl px-4 py-3",
              "border transition",
              "bg-white/6 border-white/10 hover:bg-white/10 hover:border-white/15",
              "backdrop-blur-xl",
              active ? "border-[color:var(--gold)]/45 bg-white/10" : "",
            ].join(" ")}
          >
            {/* gold accent line (active) */}
            <span
              className={[
                "absolute left-0 top-0 h-full w-[3px] rounded-r-full transition",
                active
                  ? "bg-[color:var(--gold)]/80 shadow-[0_0_18px_rgba(214,178,94,.35)]"
                  : "bg-transparent",
              ].join(" ")}
            />

            {/* icon bubble */}
            <span
              className={[
                "flex h-9 w-9 items-center justify-center rounded-xl",
                "border border-white/10 bg-black/25",
                "text-white/85 transition",
                active
                  ? "border-[color:var(--gold)]/35 bg-[color:var(--gold)]/10"
                  : "group-hover:bg-black/35",
              ].join(" ")}
              aria-hidden
            >
              {l.icon}
            </span>

            {/* text */}
            <div className="min-w-0">
              <div
                className={[
                  "text-[15px] font-semibold tracking-tight",
                  active ? "text-white" : "text-white/85",
                ].join(" ")}
              >
                {l.name}
              </div>

              {/* micro label */}
              <div className="text-[11px] text-white/45">
                {l.name === "Home" && "hub principal"}
                {l.name === "Parcerias" && "sponsors & collabs"}
                {l.name === "Bets" && "boletins & stats"}
                {l.name === "Setup" && "pc & periféricos"}
              </div>
            </div>

            {/* right chevron */}
            <span
              className={[
                "ml-auto text-white/35 transition",
                active ? "text-[color:var(--gold)]/70" : "group-hover:text-white/55",
              ].join(" ")}
              aria-hidden
            >
              ›
            </span>
          </Link>
        );
      })}
    </nav>
  );
}