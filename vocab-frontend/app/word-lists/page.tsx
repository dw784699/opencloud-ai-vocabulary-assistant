"use client";

import { FormEvent, useEffect, useState } from "react";
import { getWordLists, createWordList, updateWordList, deleteWordList } from "../lib/api";
import type { WordList } from "../lib/types";

const initialForm = { name: "", description: "" };

export default function WordListsPage() {
  const [lists, setLists] = useState<WordList[]>([]);
  const [editing, setEditing] = useState<Record<number, { name: string; description: string }>>({});
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWordLists();
      setLists(data);
      setEditing(
        Object.fromEntries(
          data.map((item) => [item.id, { name: item.name, description: item.description ?? "" }])
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Unable to load word lists: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError("Word list name is required.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await createWordList({ name: form.name.trim(), description: form.description.trim() });
      setForm(initialForm);
      await loadLists();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Unable to create word list: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (listId: number) => {
    const item = editing[listId];
    if (!item?.name.trim()) {
      setError("Word list name is required.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await updateWordList(listId, { name: item.name.trim(), description: item.description.trim() });
      await loadLists();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Unable to update word list: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (listId: number) => {
    if (!confirm("Delete this word list and its words?")) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await deleteWordList(listId);
      await loadLists();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Unable to delete word list: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Word Lists</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          View all vocabulary lists, add new collections, or update and remove existing lists.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Create a new word list</h2>
          <form onSubmit={handleCreate} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="e.g. Daily Vocabulary"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="Describe what this list is for"
                rows={4}
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Create list"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Status</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">
              Total lists: <span className="font-semibold text-slate-900">{lists.length}</span>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">
              Total words across lists: <span className="font-semibold text-slate-900">{lists.reduce((sum, list) => sum + list.words.length, 0)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Manage word lists</h2>
            <p className="mt-2 text-sm text-slate-600">Edit or delete existing word lists from the backend.</p>
          </div>
          {loading && <p className="text-sm text-slate-500">Loading...</p>}
        </div>

        {error && <div className="mt-4 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

        <div className="mt-6 space-y-6">
          {lists.map((list) => (
            <div key={list.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                    <input
                      value={editing[list.id]?.name ?? list.name}
                      onChange={(event) =>
                        setEditing({
                          ...editing,
                          [list.id]: {
                            name: event.target.value,
                            description: editing[list.id]?.description ?? list.description ?? "",
                          },
                        })
                      }
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                    <textarea
                      value={editing[list.id]?.description ?? list.description ?? ""}
                      onChange={(event) =>
                        setEditing({
                          ...editing,
                          [list.id]: {
                            name: editing[list.id]?.name ?? list.name,
                            description: event.target.value,
                          },
                        })
                      }
                      className="w-full min-h-[96px] rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:w-52">
                  <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                    {list.words.length} words
                  </div>
                  <button
                    onClick={() => handleUpdate(list.id)}
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!loading && lists.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700">
              No word lists have been created yet. Use the form above to add your first list.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
