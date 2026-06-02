import Link from "next/link";

export default function Navigation() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-2xl font-semibold text-slate-900">
            Vocabulary App
          </Link>
          <p className="text-sm text-slate-600">Manage your word lists and vocabulary cards.</p>
        </div>

        <nav className="flex flex-wrap gap-3 text-sm font-medium text-slate-700">
          <Link className="rounded-full px-4 py-2 transition hover:bg-slate-100" href="/">
            Home
          </Link>
          <Link className="rounded-full px-4 py-2 transition hover:bg-slate-100" href="/simple">
            Learn
          </Link>
          <Link className="rounded-full px-4 py-2 transition hover:bg-slate-100" href="/word-lists">
            Word Lists
          </Link>
          <Link className="rounded-full px-4 py-2 transition hover:bg-slate-100" href="/words">
            Words
          </Link>
        </nav>
      </div>
    </header>
  );
}
