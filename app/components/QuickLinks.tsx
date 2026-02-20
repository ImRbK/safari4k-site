import Link from "next/link";

type Social = {
  name: string;
  href: string;
  className: string;
};

const socials: Social[] = [
  {
    name: "Twitch",
    href: "https://twitch.tv/safari4k",
    className: "bg-[#9146FF] hover:brightness-110",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@safari4k",
    className: "bg-[#FF0000] hover:brightness-110",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/safari4k",
    className: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:brightness-110",
  },
  {
    name: "Discord",
    href: "https://discord.gg/TEU_LINK",
    className: "bg-[#5865F2] hover:brightness-110",
  },
  {
    name: "Telegram",
    href: "https://t.me/TEU_LINK",
    className: "bg-[#229ED9] hover:brightness-110",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@safari4k",
    className: "bg-black hover:bg-zinc-900",
  },
  {
    name: "X",
    href: "https://x.com/safari4k",
    className: "bg-zinc-900 hover:bg-zinc-800",
  },
];

export default function QuickLinks() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-xl font-bold">Join Our Community</div>
        <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/60">
          Socials
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {socials.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            target="_blank"
            className={`group relative overflow-hidden rounded-2xl p-6 h-24 flex items-center justify-center font-bold text-white text-lg
              transition hover:-translate-y-[2px] hover:shadow-xl ${s.className}`}
          >
            <span className="relative z-10">{s.name}</span>

            {/* subtle shine */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(400px 120px at 20% 0%, rgba(255,255,255,.25), transparent 60%)",
              }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
