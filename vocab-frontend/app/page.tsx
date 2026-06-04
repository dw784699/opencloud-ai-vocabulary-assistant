"use client";

import { useState } from "react";

const learnWords = [
  {
    word: "Cloud",
    level: "Basic Word",
    englishMeaning:
      "A system that stores data and runs applications on the internet instead of on a local computer.",
    chineseMeaning: "云；通过互联网存储数据和运行应用程序的系统。",
    example: "Many companies use cloud services to store files and run apps.",
  },
  {
    word: "Server",
    level: "Basic Word",
    englishMeaning:
      "A computer or system that provides services, data, or applications to other computers.",
    chineseMeaning: "服务器；为其他电脑提供服务、数据或应用程序的系统。",
    example: "A website needs a server to run online.",
  },
  {
    word: "API",
    level: "Core Word",
    englishMeaning:
      "A way for different software applications to communicate with each other.",
    chineseMeaning: "应用程序接口；不同软件之间互相沟通的方式。",
    example: "The frontend uses an API to get data from the backend.",
  },
  {
    word: "Deploy",
    level: "Core Word",
    englishMeaning: "To publish an application so users can access it online.",
    chineseMeaning: "部署；把应用发布到网上，让用户可以访问。",
    example: "After testing the app, the developer deployed it to the cloud.",
  },
];

type LearnWord = (typeof learnWords)[number];

export default function LearnPage() {
  const [visibleChineseWords, setVisibleChineseWords] = useState<string[]>([]);
  const [reviewList, setReviewList] = useState<LearnWord[]>([]);

  function toggleChinese(wordText: string) {
    const alreadyVisible = visibleChineseWords.includes(wordText);

    if (alreadyVisible) {
      setVisibleChineseWords(
        visibleChineseWords.filter((item) => item !== wordText)
      );
    } else {
      setVisibleChineseWords([...visibleChineseWords, wordText]);
    }
  }

  function addToReview(word: LearnWord) {
    const alreadyAdded = reviewList.some((item) => item.word === word.word);

    if (!alreadyAdded) {
      setReviewList([...reviewList, word]);
    }
  }

  function removeFromReview(wordText: string) {
    setReviewList(reviewList.filter((item) => item.word !== wordText));
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-purple-400">
            📘 Learn
          </p>

          <h1 className="mt-6 text-5xl font-bold tracking-tight">
            Learn Cloud Vocabulary
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Study important English vocabulary used in cloud computing. Click
            the buttons to show Chinese meanings or add difficult words to the
            review list.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
            <div className="text-4xl">🧠</div>
            <h2 className="mt-4 text-2xl font-bold text-cyan-300">
              Understand
            </h2>
            <p className="mt-3 text-slate-300">
              Read clear English meanings for each vocabulary word.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
            <div className="text-4xl">🌐</div>
            <h2 className="mt-4 text-2xl font-bold text-purple-300">
              Translate
            </h2>
            <p className="mt-3 text-slate-300">
              Show Chinese meanings when a word is difficult to understand.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
            <div className="text-4xl">➕</div>
            <h2 className="mt-4 text-2xl font-bold text-emerald-300">
              Add to Review
            </h2>
            <p className="mt-3 text-slate-300">
              Save difficult words into today&apos;s review list.
            </p>
          </div>
        </div>

        <section className="mt-14 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <h2 className="text-3xl font-bold">Vocabulary Learning Cards</h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {learnWords.map((word) => {
                const showChinese = visibleChineseWords.includes(word.word);
                const isAdded = reviewList.some(
                  (item) => item.word === word.word
                );

                return (
                  <div
                    key={word.word}
                    className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-lg"
                  >
                    <div>
                      <h3 className="text-4xl font-bold">📌 {word.word}</h3>
                      <p className="mt-2 text-cyan-300">{word.level}</p>
                    </div>

                    <h4 className="mt-6 font-bold">💡 English Meaning</h4>
                    <p className="mt-2 leading-7 text-slate-300">
                      {word.englishMeaning}
                    </p>

                    <h4 className="mt-6 font-bold">📝 Example</h4>
                    <p className="mt-2 leading-7 text-slate-300">
                      {word.example}
                    </p>

                    {showChinese && (
                      <div className="mt-6 rounded-2xl border border-purple-400/40 bg-purple-400/10 p-4">
                        <h4 className="font-bold text-purple-300">
                          🌐 Chinese Meaning
                        </h4>
                        <p className="mt-2 text-slate-200">
                          {word.chineseMeaning}
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => toggleChinese(word.word)}
                        className="rounded-xl bg-purple-400 px-5 py-3 font-semibold text-slate-950 shadow-md transition hover:scale-105 hover:bg-purple-300"
                      >
                        {showChinese ? "🙈 Hide Chinese" : "🌐 Show Chinese"}
                      </button>

                      <button
                        onClick={() => addToReview(word)}
                        className={`rounded-xl px-5 py-3 font-semibold text-slate-950 shadow-md transition hover:scale-105 ${
                          isAdded
                            ? "bg-slate-400"
                            : "bg-emerald-400 hover:bg-emerald-300"
                        }`}
                      >
                        {isAdded ? "✅ Added" : "➕ Add to Review"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <h2 className="text-3xl font-bold">Review List</h2>
            </div>

            <p className="mt-4 text-slate-400">
              Words added from the learning cards will appear here.
            </p>

            <div className="mt-6 space-y-4">
              {reviewList.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-center text-slate-400">
                  No words added yet. Click “Add to Review” on a vocabulary
                  card.
                </div>
              ) : (
                reviewList.map((word) => (
                  <div
                    key={word.word}
                    className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold">⭐ {word.word}</p>
                        <p className="mt-1 text-sm text-slate-300">
                          {word.englishMeaning}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromReview(word.word)}
                        className="rounded-lg bg-red-500 px-3 py-1 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-red-400"
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}