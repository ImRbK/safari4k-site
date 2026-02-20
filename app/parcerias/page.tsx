export default function ParceriasPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-[0.25em] text-white/50">
          safari4k
        </div>
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Parcerias
          </h1>
          <div className="text-sm text-white/60">
            Em construção
          </div>
        </div>
        <div className="h-px bg-white/10" />
      </div>

      {/* Empty State Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 backdrop-blur-xl p-10 text-center">
        {/* subtle glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(800px 300px at 20% 0%, rgba(214,178,94,.15), transparent 60%)",
          }}
        />

        <div className="relative space-y-4">
          <div className="text-6xl">🤝</div>

          <h2 className="text-2xl font-bold">
            Ainda não há parcerias
          </h2>

          <p className="text-white/70 max-w-xl mx-auto">
            Neste momento esta secção está mais vazia que a minha aim num dia mau.
            Mas calma… estamos a cozinhar cenas boas 👀
          </p>

          <p className="text-white/50 text-sm">
            Se quiseres fazer parceria, manda mensagem no Discord ou Instagram.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="https://discord.gg/TEU_LINK"
              target="_blank"
              className="px-5 py-3 rounded-2xl bg-[#5865F2] font-semibold hover:brightness-110 transition"
            >
              Discord
            </a>

            <a
              href="https://instagram.com/safari4k"
              target="_blank"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] font-semibold hover:brightness-110 transition"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Footer joke */}
      <div className="text-center text-xs text-white/40">
        Parcerias loading… 0% • Buff em breve 😎
      </div>
    </section>
  );
}
