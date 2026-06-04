export default function ReviewPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">
          Review
        </p>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          Review Vocabulary
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Use this page to review difficult words you have learned before.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Today&apos;s Review
            </h2>
            <p className="mt-2 text-slate-600">
              Review the words added to your study list today.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Difficult Words
            </h2>
            <p className="mt-2 text-slate-600">
              Practice words that are harder to remember.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-xl font-semibold text-slate-900">
              Practice Again
            </h2>
            <p className="mt-2 text-slate-600">
              Repeat vocabulary until the meaning becomes clear.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}