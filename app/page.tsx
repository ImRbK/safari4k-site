import QuickLinks from "./components/QuickLinks";

export default function Home() {
  return (
    <div className="space-y-10">
      {/* HERO / STREAM */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/8 backdrop-blur-xl">
        {/* light overlay */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(900px 320px at 15% 0%, rgba(255,255,255,.12), transparent 60%), radial-gradient(900px 420px at 80% 10%, rgba(214,178,94,.18), transparent 55%)",
          }}
        />

        <div className="relative p-7">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-6 items-center">
            {/* Left */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/10 text-white/70">
                  Live Hub
                </span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight">
                Safari<span className="text-[color:var(--gold)]">4K</span>
              </h1>

              {/* TEXTO NOVO */}
              <p className="text-white/75 leading-relaxed">
                Streamer • Semi Pro • MARROQUINO • Amigo do WINDOH
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://twitch.tv/safari4k"
                  target="_blank"
                  className="px-5 py-3 rounded-2xl bg-[#9146FF] font-semibold hover:brightness-110 transition"
                >
                  💜 Twitch
                </a>

                <a
                  href="/bets"
                  className="px-5 py-3 rounded-2xl bg-white/12 border border-white/12 font-semibold hover:bg-white/18 hover:border-[color:var(--gold)]/40 transition"
                >
                  🔥 Bets
                </a>

                <a
                  href="/setup"
                  className="px-5 py-3 rounded-2xl bg-white/12 border border-white/12 font-semibold hover:bg-white/18 hover:border-[color:var(--gold)]/40 transition"
                >
                  ⚙️ Setup
                </a>
              </div>

              {/* status */}
              <div className="flex items-center gap-2 text-sm text-white/65">
                <span className="w-2 h-2 rounded-full bg-zinc-300/60" />
                Offline
                <span className="text-white/35">•</span>
                <span className="text-white/45">
                 .
                </span>
              </div>
            </div>

            {/* Right: Twitch Embed */}
            <div className="rounded-3xl overflow-hidden border border-white/12 bg-black/30">
              <iframe
                src="https://player.twitch.tv/?channel=safari4k&parent=localhost&muted=true"
                height="360"
                width="100%"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="grid md:grid-cols-3 gap-4">
        {/* Objetivo */}
        <div className="rounded-3xl border border-white/10 bg-white/7 backdrop-blur-xl p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50">
            Objetivo
          </div>
          <div className="mt-2 text-lg font-bold text-white/90">
            Rumo aos 3K Elo
          </div>
          <div className="mt-1 text-sm text-white/65">
            Cada stream é mais uma tentativa. Às vezes dá clutch, às vezes dá tilt.
          </div>
        </div>

        {/* Status */}
        <div className="rounded-3xl border border-white/10 bg-white/7 backdrop-blur-xl p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50">
            Status da Stream
          </div>
          <div className="mt-2 text-lg font-bold text-white/90">
            Offline (por agora)
          </div>
          <div className="mt-1 text-sm text-white/65">
            Normalmente online à noite. Quando der, dá.
          </div>
        </div>

        {/* Sobre */}
        <div className="rounded-3xl border border-white/10 bg-white/7 backdrop-blur-xl p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-white/50">
            Sobre este site
          </div>
          <div className="mt-2 text-lg font-bold text-white/90">
            O meu hub pessoal
          </div>
          <div className="mt-1 text-sm text-white/65">
            Aqui tens stream, bets, setup e todos os links num sítio só.
          </div>
        </div>
      </section>

      {/* SOCIAL LINKS */}
      <div className="rounded-3xl border border-white/10 bg-white/6 backdrop-blur-xl p-6">
        <QuickLinks />
      </div>
    </div>
  );
}
