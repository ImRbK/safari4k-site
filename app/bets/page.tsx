"use client";

import { useEffect, useMemo, useState } from "react";

type PickStatus = "WIN" | "PENDING" | "LOSS" | "VOID";
type SlipStatus = "WIN" | "PENDING" | "LOSS";

type PickRow = {
  slip_id: string;
  slip_title: string;
  slip_date: string; // YYYY-MM-DD
  slip_stake: number;

  sport: string;
  pick: string;
  evento: string;
  pick_date: string; // YYYY-MM-DD
  pick_time: string; // HH:mm
  odd: number;
  status: PickStatus;
  notes: string;
};

type Slip = {
  slip_id: string;
  title: string;
  date: string;
  stake: number;
  status: SlipStatus;
  oddTotal: number;
  potential: number;
  picks: PickRow[];
};

function parseCSV(csv: string): PickRow[] {
  const lines = csv.trim().split(/\r?\n/);
  if (!lines.length) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idx = (name: string) => headers.indexOf(name);

  const out: PickRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.trim()) continue;

    // Split simples (EVITA vírgulas dentro dos campos)
    const cols = raw.split(",").map((c) => c.trim());

    const statusRaw = (cols[idx("status")] || "PENDING").toUpperCase();
    const status: PickStatus =
      statusRaw === "WIN" || statusRaw === "LOSS" || statusRaw === "PENDING" || statusRaw === "VOID"
        ? (statusRaw as PickStatus)
        : "PENDING";

    out.push({
      slip_id: cols[idx("slip_id")] || `S${i}`,
      slip_title: cols[idx("slip_title")] || "MÚLTIPLA",
      slip_date: cols[idx("slip_date")] || "",
      slip_stake: Number(cols[idx("slip_stake")] || 0),

      sport: cols[idx("sport")] || "",
      pick: cols[idx("pick")] || "",
      evento: cols[idx("evento")] || "",
      pick_date: cols[idx("pick_date")] || "",
      pick_time: cols[idx("pick_time")] || "",
      odd: Number(cols[idx("odd")] || 0),
      status,
      notes: cols[idx("notes")] || "",
    });
  }

  // Ordena picks por data/hora
  out.sort((a, b) => {
    const da = `${a.pick_date || a.slip_date}T${a.pick_time || "00:00"}`;
    const db = `${b.pick_date || b.slip_date}T${b.pick_time || "00:00"}`;
    return da.localeCompare(db);
  });

  return out;
}

function eur(n: number) {
  return n.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

function statusPillSlip(s: SlipStatus) {
  if (s === "WIN") return "border-emerald-400/35 bg-emerald-500/10 text-emerald-200";
  if (s === "PENDING") return "border-amber-400/35 bg-amber-500/10 text-amber-200";
  return "border-rose-400/35 bg-rose-500/10 text-rose-200";
}

function statusTextPick(s: PickStatus) {
  if (s === "WIN") return "text-emerald-300";
  if (s === "PENDING") return "text-amber-300";
  if (s === "VOID") return "text-white/70";
  return "text-rose-300";
}

function statusDotPick(s: PickStatus) {
  if (s === "WIN") return "bg-emerald-400";
  if (s === "PENDING") return "bg-amber-400";
  if (s === "VOID") return "bg-white/30";
  return "bg-rose-400";
}

function statusIconPick(s: PickStatus) {
  if (s === "WIN") return "✓";
  if (s === "PENDING") return "…";
  if (s === "VOID") return "—";
  return "×";
}

function statusAccentBarSlip(s: SlipStatus) {
  if (s === "WIN") return "bg-emerald-400/90";
  if (s === "PENDING") return "bg-amber-400/90";
  return "bg-rose-400/90";
}

function statusGlowSlip(s: SlipStatus) {
  if (s === "WIN")
    return "hover:shadow-[0_0_0_1px_rgba(52,211,153,.25),0_20px_50px_-20px_rgba(52,211,153,.25)]";
  if (s === "PENDING")
    return "hover:shadow-[0_0_0_1px_rgba(251,191,36,.22),0_20px_50px_-20px_rgba(251,191,36,.22)]";
  return "hover:shadow-[0_0_0_1px_rgba(244,63,94,.20),0_20px_50px_-20px_rgba(244,63,94,.20)]";
}

function oddBoxClassPick(s: PickStatus) {
  if (s === "WIN") return "border-emerald-400/25 bg-emerald-500/10";
  if (s === "PENDING") return "border-amber-400/25 bg-amber-500/10";
  if (s === "VOID") return "border-white/15 bg-white/5";
  return "border-rose-400/25 bg-rose-500/10";
}

function oddValueClassPick(s: PickStatus) {
  if (s === "WIN") return "text-emerald-200";
  if (s === "PENDING") return "text-amber-200";
  if (s === "VOID") return "text-white/80";
  return "text-rose-200";
}

function sportEmoji(s: string) {
  const x = s.toLowerCase();
  if (x.includes("nba") || x.includes("basket")) return "🏀";
  if (x.includes("tennis")) return "🎾";
  if (x.includes("foot") || x.includes("fut")) return "⚽";
  if (x.includes("cs") || x.includes("esports") || x.includes("valorant")) return "🎮";
  return "•";
}

function computeSlip(picks: PickRow[]): Slip {
  const first = picks[0];

  const slipStatus: SlipStatus = picks.some((p) => p.status === "LOSS")
    ? "LOSS"
    : picks.some((p) => p.status === "PENDING")
    ? "PENDING"
    : "WIN";

  // Odd total: VOID conta como 1.00
  const oddTotal = picks.reduce((acc, p) => acc * (p.status === "VOID" ? 1 : (p.odd || 1)), 1);

  const stake = first?.slip_stake || 0;
  const potential = stake * oddTotal;

  return {
    slip_id: first?.slip_id || "",
    title: first?.slip_title || "MÚLTIPLA",
    date: first?.slip_date || "",
    stake,
    status: slipStatus,
    oddTotal,
    potential,
    picks,
  };
}

function buildCopySlipText(s: Slip) {
  const lines = s.picks.map((p) => `${p.pick} @${(p.odd || 0).toFixed(2)} — ${p.evento}`);
  return `${s.title} (${s.date})\nValor: ${eur(s.stake)} | Odd total: ${s.oddTotal.toFixed(2)}\n\n` + lines.join("\n");
}

function StatCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "green" | "red" | "amber";
}) {
  const ring =
    tone === "green"
      ? "border-emerald-400/25"
      : tone === "red"
      ? "border-rose-400/25"
      : tone === "amber"
      ? "border-amber-400/25"
      : "border-white/10";

  const valueColor =
    tone === "green"
      ? "text-emerald-300"
      : tone === "red"
      ? "text-rose-300"
      : tone === "amber"
      ? "text-amber-200"
      : "text-white/90";

  return (
    <div className={`rounded-2xl border ${ring} bg-white/5 backdrop-blur-xl`}>
      <div className="p-5">
        <div className={`text-3xl font-extrabold tracking-tight ${valueColor}`}>{value}</div>
        <div className="mt-1 text-[11px] uppercase tracking-widest text-white/50">{label}</div>
      </div>
    </div>
  );
}

export default function Bets() {
  const url = process.env.NEXT_PUBLIC_BETS_CSV_URL;

  const [rows, setRows] = useState<PickRow[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"ALL" | SlipStatus>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setError(null);
        if (!url) {
          setError("Falta o NEXT_PUBLIC_BETS_CSV_URL no .env.local");
          return;
        }
        const r = await fetch(url, { cache: "no-store" });
        const csv = await r.text();
        setRows(parseCSV(csv));
      } catch {
        setError("Não consegui ler a Google Sheet (verifica o link publish CSV).");
      }
    };

    run();
    const t = setInterval(run, 60_000);
    return () => clearInterval(t);
  }, [url]);

  const slips = useMemo(() => {
    // agrupar por slip_id
    const map = new Map<string, PickRow[]>();
    for (const r of rows) {
      const key = r.slip_id || "S0";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }

    const grouped = Array.from(map.values()).map((picks) => computeSlip(picks));

    // ordenar por slip_date (mais recente primeiro)
    grouped.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return grouped;
  }, [rows]);

  const counts = useMemo(() => {
    let win = 0, loss = 0, pending = 0;
    for (const s of slips) {
      if (s.status === "WIN") win++;
      else if (s.status === "LOSS") loss++;
      else pending++;
    }
    return { total: slips.length, win, loss, pending };
  }, [slips]);

  const money = useMemo(() => {
    const totalStake = slips.reduce((acc, s) => acc + (s.stake || 0), 0);
    const totalWinReturn = slips.reduce((acc, s) => (s.status === "WIN" ? acc + s.potential : acc), 0);
    const profit = totalWinReturn - totalStake;
    const decided = counts.win + counts.loss;
    const winRate = decided > 0 ? counts.win / decided : 0;
    return { totalStake, totalWinReturn, profit, winRate };
  }, [slips, counts.win, counts.loss]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return slips.filter((s) => {
      if (filter !== "ALL" && s.status !== filter) return false;
      if (!qq) return true;

      const hay =
        `${s.title} ${s.date} ${s.slip_id} ` +
        s.picks.map((p) => `${p.sport} ${p.pick} ${p.evento} ${p.notes}`).join(" ");
      return hay.toLowerCase().includes(qq);
    });
  }, [slips, q, filter]);

  const copySlip = async (s: Slip) => {
    const text = buildCopySlipText(s);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(s.slip_id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      setCopiedId(s.slip_id);
      setTimeout(() => setCopiedId(null), 1200);
      alert(text);
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-white/50">safari4k</div>
        <h1 className="text-4xl font-extrabold tracking-tight">BETS</h1>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Total boletins" value={`${counts.total}`} tone="neutral" />
        <StatCard label="Ganhas" value={`${counts.win}`} tone="green" />
        <StatCard label="Perdidas" value={`${counts.loss}`} tone="red" />
        <StatCard label="Pendentes" value={`${counts.pending}`} tone="amber" />
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Total apostado" value={eur(money.totalStake)} tone="neutral" />
        <StatCard label="Total ganho" value={eur(money.totalWinReturn)} tone="green" />
        <StatCard
          label="Profit"
          value={`${money.profit >= 0 ? "+" : ""}${eur(money.profit)}`}
          tone={money.profit >= 0 ? "green" : "red"}
        />
        <StatCard label="Win rate" value={`${(money.winRate * 100).toFixed(1)}%`} tone="green" />
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-[1fr_auto] gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Procurar (múltipla, jogo, equipa...)"
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-[color:var(--gold)]"
        />

        <div className="flex gap-2">
          {(["ALL", "PENDING", "WIN", "LOSS"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-3 rounded-2xl border transition ${
                filter === f
                  ? "border-[color:var(--gold)] bg-white/10"
                  : "border-white/10 bg-white/5 hover:bg-white/7"
              }`}
            >
              {f === "ALL" ? "Todos" : f === "WIN" ? "Green" : f === "LOSS" ? "Red" : "Pendente"}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl border border-rose-400/25 bg-rose-500/10 text-rose-200">
          {error}
        </div>
      )}

      {/* SLIPS */}
      <div className="grid gap-6">
        {filtered.map((s) => {
          const isWin = s.status === "WIN";
          const rightLabel = isWin ? "Ganho" : "Potencial";

          return (
            <div
              key={s.slip_id}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
                transition hover:-translate-y-[2px] ${statusGlowSlip(s.status)}`}
            >
              {/* status accent */}
              <div className={`absolute left-0 top-0 h-full w-[4px] ${statusAccentBarSlip(s.status)}`} />

              {/* gold glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  background:
                    "radial-gradient(800px 260px at 25% 0%, rgba(214,178,94,.10), transparent 60%)",
                }}
              />

              <div className="relative p-6">
                {/* top header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold tracking-wide text-white/90">{s.title}</div>
                    <div className="text-xs text-white/50 mt-1">{s.date}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold tracking-widest ${statusPillSlip(s.status)}`}>
                      <span className={`w-2 h-2 rounded-full ${s.status === "WIN" ? "bg-emerald-400" : s.status === "PENDING" ? "bg-amber-400" : "bg-rose-400"}`} />
                      {s.status === "WIN" ? "GANHO" : s.status === "PENDING" ? "PENDENTE" : "PERDIDO"}
                    </div>

                    <button
                      onClick={() => copySlip(s)}
                      className="px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5
                        hover:bg-white/10 hover:border-[color:var(--gold)] transition"
                      title="Copiar boletim"
                    >
                      {copiedId === s.slip_id ? "✅ Copiado" : "📋 Copiar"}
                    </button>
                  </div>
                </div>

                {/* picks list */}
                <div className="mt-5 rounded-2xl border border-white/10 overflow-hidden">
                  {s.picks.map((p, i) => (
                    <div
                      key={`${s.slip_id}-${i}`}
                      className={`grid grid-cols-[40px_1fr_auto] gap-4 px-4 py-4 bg-black/10 ${
                        i === 0 ? "" : "border-t border-white/10"
                      }`}
                    >
                      <div className="flex items-start justify-center pt-1 text-lg">{sportEmoji(p.sport)}</div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`font-semibold truncate ${statusTextPick(p.status)}`}>
                            {p.pick}
                          </div>

                          <span
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/10 bg-black/20 text-[11px] ${statusTextPick(p.status)}`}
                            title={p.status}
                          >
                            {statusIconPick(p.status)}
                          </span>

                          {p.status === "VOID" ? (
                            <span className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 bg-white/5 px-2 py-1 rounded-lg">
                              ANULADO
                            </span>
                          ) : null}
                        </div>

                        <div className="text-sm text-white/60 truncate mt-0.5">{p.evento}</div>
                        <div className="text-xs text-white/40 mt-1">
                          {(p.pick_date || s.date) + (p.pick_time ? ` • ${p.pick_time}` : "")}
                        </div>

                        {p.notes ? <div className="text-xs text-white/45 mt-1">{p.notes}</div> : null}
                      </div>

                      {/* odd box like image */}
                      <div className="flex items-center">
                        <div className={`rounded-xl border px-4 py-3 text-right ${oddBoxClassPick(p.status)}`}>
                          <div className="text-[10px] uppercase tracking-widest text-white/60">ODD</div>
                          <div className={`text-xl font-extrabold leading-6 ${oddValueClassPick(p.status)}`}>
                            {(p.status === "VOID" ? 1 : (p.odd || 0)).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* bottom summary (como na imagem) */}
                <div className="mt-5 grid md:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-white/50">Odd total</div>
                    <div className="mt-1 text-xl font-extrabold text-white/90">{s.oddTotal.toFixed(2)}</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-white/50">Valor apostado</div>
                    <div className="mt-1 text-xl font-extrabold text-white/90">{eur(s.stake)}</div>
                  </div>

                  <div
                    className={`rounded-2xl border p-4 ${
                      s.status === "LOSS"
                        ? "border-rose-400/25 bg-rose-500/10"
                        : s.status === "WIN"
                        ? "border-emerald-400/25 bg-emerald-500/10"
                        : "border-amber-400/25 bg-amber-500/10"
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-widest text-white/60">{rightLabel}</div>
                    <div
                      className={`mt-1 text-xl font-extrabold ${
                        s.status === "WIN"
                          ? "text-emerald-300"
                          : s.status === "PENDING"
                          ? "text-amber-200"
                          : "text-rose-300"
                      }`}
                    >
                      {eur(s.potential)}
                    </div>
                  </div>
                </div>

                {/* tiny id bottom-right */}
                <div className="mt-4 flex justify-end">
                  <div className="text-[10px] uppercase tracking-widest text-white/30">
                    ID APOSTA #{s.slip_id}
                  </div>
                </div>

                <div className="mt-4 h-px bg-[color:var(--gold)]/0 group-hover:bg-[color:var(--gold)]/20 transition" />
              </div>
            </div>
          );
        })}

        {!filtered.length && (
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 text-white/70">
            Nada encontrado.
          </div>
        )}
      </div>
    </section>
  );
}
