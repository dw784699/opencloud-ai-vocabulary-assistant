import Link from "next/link";

export default function Navigation() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-2xl font-semibold text-slate-900">
            Unicorn Vocabulary App
          </Link>
          <p className="text-sm text-slate-600">
            Learn, translate, and review important English vocabulary.
          </p>
        </div>

        <nav className="flex flex-wrap gap-3 text-sm font-medium text-slate-700">
          <Link
            href="/"
            className="rounded-full px-4 py-2 transition hover:bg-slate-100"
          >
            Home
          </Link>

          <Link
            href="/simple"
            className="rounded-full px-4 py-2 transition hover:bg-slate-100"
          >
            Learn
          </Link>

          <Link
            href="/review"
            className="rounded-full px-4 py-2 transition hover:bg-slate-100"
          >
            Review
          </Link>
        </nav>
      </div>
    </header>
  );
}