"use client";

import { useEffect, useState } from "react";
import { simpleVocabulary, type VocabularyWord } from "../../lib/simpleVocabulary";

export default function SimpleVocabularyPage() {
  const [searchWord, setSearchWord] = useState("");
  const [result, setResult] = useState<VocabularyWord | null>(null);
  const [message, setMessage] = useState("");
  const [wordBank, setWordBank] = useState<VocabularyWord[]>([]);

  useEffect(() => {
    const savedWords = localStorage.getItem("simple-word-bank");

    if (savedWords) {
      setWordBank(JSON.parse(savedWords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("simple-word-bank", JSON.stringify(wordBank));
  }, [wordBank]);

  function handleSearch() {
    const keyword = searchWord.trim().toLowerCase();

    if (!keyword) {
      setResult(null);
      setMessage("Please enter an English cloud vocabulary word.");
      return;
    }

    const foundWord = simpleVocabulary.find(
      (item) => item.word.toLowerCase() === keyword
    );

    if (!foundWord) {
      setResult(null);
      setMessage(
        "Word not found. Try: cloud, server, storage, database, security, deploy, API."
      );
      return;
    }

    setResult(foundWord);
    setMessage("");
  }

  function addToWordBank() {
    if (!result) return;

    const alreadySaved = wordBank.some(
      (item) => item.word.toLowerCase() === result.word.toLowerCase()
    );

    if (alreadySaved) {
      setMessage("This word is already in your word bank.");
      return;
    }

    setWordBank([...wordBank, result]);
    setMessage("Word added to your word bank.");
  }

  function clearWordBank() {
    setWordBank([]);
    setMessage("Word bank cleared.");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-300">
            Cloud Vocabulary Assistant
          </p>

          <h1 className="mb-4 text-4xl font-bold">
            Learn Cloud English Vocabulary Faster
          </h1>

          <p className="max-w-3xl text-lg text-slate-300">
            Enter an English cloud computing word, see the Chinese meaning,
            learn an example sentence, and save difficult words to your personal
            word bank for daily review.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-bold">1. Translate a Word</h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={searchWord}
                onChange={(event) => setSearchWord(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Try: server, storage, security..."
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <button
                onClick={handleSearch}
                className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300"
              >
                Search
              </button>
            </div>

            {message && (
              <p className="mt-4 rounded-xl bg-slate-900 p-3 text-sm text-yellow-200">
                {message}
              </p>
            )}

            {result && (
              <div className="mt-6 rounded-2xl border border-cyan-400/30 bg-slate-900 p-5">
                <p className="mb-2 text-sm uppercase tracking-widest text-cyan-300">
                  Search Result
                </p>

                <h3 className="mb-2 text-3xl font-bold capitalize">
                  {result.word}
                </h3>

                <p className="mb-3 text-xl text-green-300">
                  Chinese: {result.chinese}
                </p>

                <p className="mb-4 text-slate-300">{result.meaning}</p>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="mb-1 text-sm font-semibold text-cyan-300">
                    2. Example Sentence
                  </p>
                  <p className="text-slate-100">{result.example}</p>
                </div>

                <button
                  onClick={addToWordBank}
                  className="mt-5 rounded-xl bg-green-400 px-5 py-3 font-bold text-slate-950 hover:bg-green-300"
                >
                  Add to My Word Bank
                </button>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/10 p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">3. My Word Bank</h2>

              <button
                onClick={clearWordBank}
                className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                Clear
              </button>
            </div>

            <p className="mb-5 text-slate-300">
              Save difficult words here and review them before class.
            </p>

            {wordBank.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/20 p-6 text-slate-400">
                No saved words yet. Search a word and add it to your word bank.
              </div>
            ) : (
              <div className="space-y-4">
                {wordBank.map((item) => (
                  <div
                    key={item.word}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xl font-bold capitalize">
                        {item.word}
                      </h3>
                      <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-sm text-cyan-200">
                        {item.chinese}
                      </span>
                    </div>

                    <p className="mb-2 text-sm text-slate-300">
                      {item.meaning}
                    </p>

                    <p className="rounded-xl bg-white/10 p-3 text-sm text-slate-100">
                      {item.example}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6">
          <h2 className="mb-3 text-2xl font-bold">Presentation Summary</h2>

          <p className="leading-8 text-slate-300">
            This project helps students learn English vocabulary used in cloud
            computing courses. The app has three main features: it translates an
            English cloud word into Chinese, shows an example sentence, and lets
            students save difficult words into a personal word bank for daily
            review.
          </p>
        </section>
      </section>
    </main>
  );
}