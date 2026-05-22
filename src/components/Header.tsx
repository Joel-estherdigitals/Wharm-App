import { Sparkle } from "./Icons";

export default function Header({ count }: { count: number }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <a href="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ember text-gold-bright shadow-[0_6px_18px_-6px_rgba(255,69,0,0.7)] transition-transform group-hover:rotate-6">
            <Sparkle width={18} height={18} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight text-ink">
              Whamr
            </span>
            <span className="label mt-0.5 text-ink-mute">Send the wham</span>
          </span>
        </a>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink-mute">
            {count.toLocaleString()} in the library
          </span>
          <span className="rounded-full bg-gold-soft px-3 py-1.5 text-xs font-bold text-wham-dark">
            Prototype
          </span>
        </div>
      </div>
    </header>
  );
}
