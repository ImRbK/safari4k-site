type Row = { label: string; value: string };

function SpecCard({
  title,
  rows,
}: {
  title: string;
  rows: Row[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
      {/* gold glow subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(700px 220px at 20% 0%, rgba(214,178,94,.10), transparent 60%)",
        }}
      />
      {/* gold accent line on hover */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[color:var(--gold)]/40 group-hover:bg-[color:var(--gold)]/70 transition" />

      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-widest text-white/85">
            {title.toUpperCase()}
          </h2>
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/35">
            specs
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-white/10 overflow-hidden">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-[170px_1fr] gap-4 px-4 py-3 bg-black/10 ${
                i === 0 ? "" : "border-t border-white/10"
              }`}
            >
              <div className="text-[11px] uppercase tracking-widest text-white/45">
                {r.label}
              </div>
              <div className="text-sm font-medium text-white/90">
                {r.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 h-px bg-[color:var(--gold)]/0 group-hover:bg-[color:var(--gold)]/20 transition" />
      </div>
    </div>
  );
}

export default function SetupPage() {
  const pc: Row[] = [
    { label: "Processador", value: "AMD Ryzen 7 9800X3D 8-Core" },
    { label: "Memória RAM", value: "Viper MPOWER 32GB (2x16GB) DDR5 6400MHz" },
    { label: "Placa-mãe", value: "Gigabyte B850 AORUS ELITE WIFI7 ICE" },
    { label: "Placa Gráfica", value: "GeForce RTX 4060 OC 8GB" },
    { label: "Armazenamento", value: "SSD Western Digital Black SN770 1TB Gen4 M.2 NVMe" },
  ];

  const perifericos: Row[] = [
    { label: "Monitor", value: "AOC 24\"" },
    { label: "2º Monitor", value: "Asus VG248QE 144Hz 1ms 24\"" },
    { label: "Teclado", value: "HyperX Alloy Origins - Cherry MX Red" },
    { label: "Rato", value: "Glorious Model O" },
    { label: "Headset", value: "HyperX Cloud II" },
  ];

  const streaming: Row[] = [
    { label: "Microfone", value: "Quad Cast S" },
    { label: "Câmara", value: "Emprestada do sem pescoço" },
  ];

  const outros: Row[] = [
    { label: "Cadeira", value: "Uma do ikea " },
    { label: "Secretária", value: "Tabua do ikea" },
    { label: "Internet", value: "Fraca" },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-[0.25em] text-white/50">
          safari4k
        </div>
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            SETUP
          </h1>
          <div className="text-sm text-white/60">Especificações</div>
        </div>
        <div className="h-px bg-white/10" />
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        <SpecCard title="PC Principal" rows={pc} />
        <SpecCard title="Periféricos" rows={perifericos} />
        <SpecCard title="Streaming & Áudio" rows={streaming} />
        <SpecCard title="Outros" rows={outros} />
      </div>
    </section>
  );
}
