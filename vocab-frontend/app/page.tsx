export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Vocabulary Learning</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">
              Learn vocabulary with organized word lists.
            </h1>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            Build, review, and manage vocabulary collections with a fast, clean interface that connects to your FastAPI backend.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Word Lists</h2>
              <p className="mt-2 text-sm text-slate-600">
                Create word lists, update descriptions, and delete lists when you no longer need them.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Words</h2>
              <p className="mt-2 text-sm text-slate-600">
                Add vocabulary cards, edit definitions, and assign words to the right list.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/word-lists"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Go to Word Lists
            </a>
            <a
              href="/words"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
            >
              View Words
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
