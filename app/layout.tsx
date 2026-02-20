import "./globals.css";
import type { Metadata } from "next";
import NavLinks from "./components/NavLinks";

export const metadata: Metadata = {
  title: "Safari4K",
  description: "Stream hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="text-white">
        <div className="min-h-screen grid grid-cols-[260px_1fr]">
          {/* SIDEBAR */}
          <aside className="p-4 border-r border-white/10 bg-black/25 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-extrabold tracking-tight">
                SAFARI<span className="text-[color:var(--gold)]">4K</span>
              </div>

              {/* badge pequeno e clean (não é premium) */}
              <span className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/60">
                HUB
              </span>
            </div>

            <NavLinks />

            {/* CONTACTOS */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">Contactos</div>
              <div className="text-sm text-white/60 mt-1">
                Discord • Instagram • Email
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <div className="min-w-0">
            {/* TOPBAR */}
            <header className="h-16 px-6 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl">
              {/* Search */}
              <div className="flex-1 max-w-xl">
                <input
                  placeholder="Search..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-[color:var(--gold)]"
                />
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                {/* status clean */}
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-2xl border border-white/10 bg-white/5 text-white/70">
                  <span className="w-2 h-2 rounded-full bg-zinc-300/60" />
                  Offline
                </div>

                {/* botão HOME melhor */}
                <a
                  href="/"
                  className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/10 font-semibold
                    hover:bg-white/15 hover:border-[color:var(--gold)]/40 transition"
                >
                  <span className="opacity-80 group-hover:opacity-100">🏠</span>
                  HOME
                </a>
              </div>
            </header>

            {/* CONTENT */}
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
