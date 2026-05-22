import Header from "@/components/Header";
import Browser from "@/components/Browser";
import { catalog } from "@/lib/catalog";
import { isMediaConfigured } from "@/lib/media";

export default function Home() {
  const configured = isMediaConfigured();

  return (
    <main className="min-h-dvh">
      <Header count={catalog.length} />

      {!configured && (
        <div className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-6">
          <div className="rounded-xl border border-gold/40 bg-gold-soft px-4 py-3 text-sm text-wham-dark">
            <span className="font-bold">Heads up:</span> set{" "}
            <code className="font-mono">NEXT_PUBLIC_R2_BASE_URL</code> in your
            environment so media loads from R2. Cards will show a placeholder
            until then.
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-4 pb-2 pt-8 sm:px-6 sm:pt-12">
        <p className="label text-wham">The reaction, not the format</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl">
          Find the right one.
          <br />
          <span className="bg-ember bg-clip-text text-transparent">
            Send the wham.
          </span>
        </h1>
        <p className="mt-3 max-w-xl text-sm text-ink-soft sm:text-base">
          Browse memes and stickers, save your favourites, and fire them off to
          any chat in one tap. No signup needed.
        </p>
      </section>

      <Browser />

      <footer className="border-t border-line/70 bg-bg-alt/60">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-8 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            <span className="font-bold text-ink">Whamr</span> — prototype.
            Favourites are saved on this device only.
          </p>
          <p>Media served from Cloudflare R2 · Deployed on Vercel</p>
        </div>
      </footer>
    </main>
  );
}
