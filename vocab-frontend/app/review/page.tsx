"use client";

import { useState } from "react";

type ReviewWord = {
  word: string;
  meaning: string;
  difficulty: "Easy" | "Medium" | "Hard";
  practiceCount: number;
};

export default function ReviewPage() {
  const [reviewWords, setReviewWords] = useState<ReviewWord[]>([
    {
      word: "Cloud",
      meaning: "A system that stores data and runs applications on the internet.",
      difficulty: "Easy",
      practiceCount: 1,
    },
    {
      word: "API",
      meaning: "A way for different software applications to communicate.",
      difficulty: "Medium",
      practiceCount: 2,
    },
    {
      word: "Scalability",
      meaning: "The ability of a system to handle more users or traffic.",
      difficulty: "Hard",
      practiceCount: 3,
    },
  ]);

  const [newWord, setNewWord] = useState("");

  function addNewWord() {
    if (newWord.trim() === "") {
      return;
    }

    const wordToAdd: ReviewWord = {
      word: newWord.trim(),
      meaning: "New word added by student for review practice.",
      difficulty: "Medium",
      practiceCount: 0,
    };

    setReviewWords([...reviewWords, wordToAdd]);
    setNewWord("");
  }

  function practiceAgain(wordText: string) {
    setReviewWords(
      reviewWords.map((item) =>
        item.word === wordText
          ? { ...item, practiceCount: item.practiceCount + 1 }
          : item
      )
    );
  }

  function removeWord(wordText: string) {
    setReviewWords(reviewWords.filter((item) => item.word !== wordText));
  }

  const difficultWords = reviewWords.filter(
    (item) => item.difficulty === "Hard" || item.practiceCount >= 2
  );

  const totalPracticeCount = reviewWords.reduce(
    (total, item) => total + item.practiceCount,
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-6xl rounded-[2rem] bg-white p-8 shadow-xl md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-500">
          🔁 Review
        </p>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          Review Vocabulary
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Use this page to review difficult words, track practice times, and
          add new words to today&apos;s review list.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="text-4xl">📝</div>
            <h2 className="mt-4 text-2xl font-bold">Today&apos;s Review</h2>
            <p className="mt-3 text-slate-600">
              {reviewWords.length} words are currently in the review list.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="text-4xl">🔥</div>
            <h2 className="mt-4 text-2xl font-bold">Difficult Words</h2>
            <p className="mt-3 text-slate-600">
              {difficultWords.length} words need more practice.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="text-4xl">🎯</div>
            <h2 className="mt-4 text-2xl font-bold">Practice Again</h2>
            <p className="mt-3 text-slate-600">
              Total practice clicks: {totalPracticeCount}
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-3xl">➕</span>
            <h2 className="text-3xl font-bold">Add a Review Word</h2>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <input
              suppressHydrationWarning
              value={newWord}
              onChange={(event) => setNewWord(event.target.value)}
              className="flex-1 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none"
              placeholder="Type a new word, for example: database"
            />

            <button
              onClick={addNewWord}
              className="rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white shadow-md transition hover:scale-105 hover:bg-emerald-600"
            >
              ➕ Add Word
            </button>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <h2 className="text-3xl font-bold">Today&apos;s Review List</h2>
          </div>

          <div className="mt-6 grid gap-5">
            {reviewWords.map((item) => (
              <div
                key={item.word}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold">⭐ {item.word}</h3>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          item.difficulty === "Hard"
                            ? "bg-red-100 text-red-700"
                            : item.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </div>

                    <p className="mt-3 leading-7 text-slate-600">
                      {item.meaning}
                    </p>

                    <p className="mt-3 text-sm font-semibold text-slate-500">
                      🔢 Practice count: {item.practiceCount}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => practiceAgain(item.word)}
                      className="rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-white shadow-md transition hover:scale-105 hover:bg-cyan-600"
                    >
                      🎯 Practice Again
                    </button>

                    <button
                      onClick={() => removeWord(item.word)}
                      className="rounded-xl bg-red-500 px-4 py-3 font-semibold text-white shadow-md transition hover:scale-105 hover:bg-red-600"
                    >
                      🗑 Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}