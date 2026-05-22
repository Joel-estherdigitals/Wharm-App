export default function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-ember text-3xl shadow-lift">
        🤔
      </div>
      <h3 className="mt-5 text-lg font-extrabold text-ink">No whams here</h3>
      <p className="mt-1 max-w-sm text-sm text-ink-mute">
        Nothing matches that combination yet. Try clearing the filters or
        searching for something else.
      </p>
      <button type="button" onClick={onReset} className="btn-primary mt-5">
        Clear filters
      </button>
    </div>
  );
}
