"use client";

import { FormEvent, useEffect, useState } from "react";
import { getWords, getWordLists, createWord, updateWord, deleteWord } from "../lib/api";
import type { Word, WordList } from "../lib/types";

const initialForm = { term: "", definition: "", example: "", word_list_id: 0 };

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [lists, setLists] = useState<WordList[]>([]);
  const [editing, setEditing] = useState<Record<number, { term: string; definition: string; example: string; word_list_id: number }>>({});
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [wordsData, listsData] = await Promise.all([getWords(), getWordLists()]);
      setWords(wordsData);
      setLists(listsData);
      setEditing(
        Object.fromEntries(
          wordsData.map((item) => [
            item.id,
            {
              term: item.term,
              definition: item.definition ?? "",
              example: item.example ?? "",
              word_list_id: item.word_list_id,
            },
          ])
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Unable to load words or word lists: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.term.trim()) {
      setError("Word term is required.");
      return;
    }
    if (!form.word_list_id) {
      setError("Choose a word list.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await createWord({
        term: form.term.trim(),
        definition: form.definition.trim(),
        example: form.example.trim(),
        word_list_id: form.word_list_id,
      });
      setForm(initialForm);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Unable to create word: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (wordId: number) => {
    const item = editing[wordId];
    if (!item?.term.trim()) {
      setError("Word term is required.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await updateWord(wordId, {
        term: item.term.trim(),
        definition: item.definition.trim(),
        example: item.example.trim(),
        word_list_id: item.word_list_id,
      });
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Unable to update word: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (wordId: number) => {
    if (!confirm("Delete this word?")) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await deleteWord(wordId);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Unable to delete word: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Words</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Review vocabulary cards, add new words, or update and remove entries from your lists.
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Create a new word</h2>
          <form onSubmit={handleCreate} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Term</label>
              <input
                value={form.term}
                onChange={(event) => setForm({ ...form, term: event.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="e.g. explore"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Definition</label>
              <textarea
                value={form.definition}
                onChange={(event) => setForm({ ...form, definition: event.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="Describe the meaning of the word"
                rows={3}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Example</label>
              <textarea
                value={form.example}
                onChange={(event) => setForm({ ...form, example: event.target.value })}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="Use the word in a sentence"
                rows={2}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Word list</label>
              <select
                value={form.word_list_id}
                onChange={(event) => setForm({ ...form, word_list_id: Number(event.target.value) })}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
              >
                <option value={0}>Select a list</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Create word"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Summary</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">
              Total words: <span className="font-semibold text-slate-900">{words.length}</span>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-slate-700">
              Available word lists: <span className="font-semibold text-slate-900">{lists.length}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Manage words</h2>
            <p className="mt-2 text-sm text-slate-600">Edit or remove vocabulary entries that belong to your lists.</p>
          </div>
          {loading && <p className="text-sm text-slate-500">Loading...</p>}
        </div>

        {error && <div className="mt-4 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

        <div className="mt-6 space-y-6">
          {words.map((word) => {
            const current = editing[word.id] ?? {
              term: word.term,
              definition: word.definition ?? "",
              example: word.example ?? "",
              word_list_id: word.word_list_id,
            };
            const listName = lists.find((list) => list.id === word.word_list_id)?.name ?? "Unknown list";

            return (
              <div key={word.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Term</label>
                      <input
                        value={current.term}
                        onChange={(event) =>
                          setEditing({
                            ...editing,
                            [word.id]: { ...current, term: event.target.value },
                          })
                        }
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Definition</label>
                      <textarea
                        value={current.definition}
                        onChange={(event) =>
                          setEditing({
                            ...editing,
                            [word.id]: { ...current, definition: event.target.value },
                          })
                        }
                        className="w-full min-h-[80px] rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Example</label>
                      <textarea
                        value={current.example}
                        onChange={(event) =>
                          setEditing({
                            ...editing,
                            [word.id]: { ...current, example: event.target.value },
                          })
                        }
                        className="w-full min-h-[80px] rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Word list</label>
                      <select
                        value={current.word_list_id}
                        onChange={(event) =>
                          setEditing({
                            ...editing,
                            [word.id]: { ...current, word_list_id: Number(event.target.value) },
                          })
                        }
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
                      >
                        {lists.map((list) => (
                          <option key={list.id} value={list.id}>
                            {list.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:w-56">
                    <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                      List: <span className="font-semibold text-slate-900">{listName}</span>
                    </div>
                    <button
                      onClick={() => handleUpdate(word.id)}
                      className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(word.id)}
                      className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {!loading && words.length === 0 && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700">
              No vocabulary cards are available. Start by creating a new word in the panel above.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
