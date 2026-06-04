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

export default function LearnPage() {
  const [visibleChineseWords, setVisibleChineseWords] = useState<string[]>([]);

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
            the button to show Chinese meanings when needed.
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
            <div className="text-4xl">✍️</div>
            <h2 className="mt-4 text-2xl font-bold text-emerald-300">
              Practice
            </h2>
            <p className="mt-3 text-slate-300">
              Review examples and connect words with real cloud situations.
            </p>
          </div>
        </div>

        <section className="mt-14">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <h2 className="text-3xl font-bold">Vocabulary Learning Cards</h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {learnWords.map((word) => {
              const showChinese = visibleChineseWords.includes(word.word);

              return (
                <div
                  key={word.word}
                  className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-4xl font-bold">📌 {word.word}</h3>
                      <p className="mt-2 text-cyan-300">{word.level}</p>
                    </div>
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

                  <button
                    onClick={() => toggleChinese(word.word)}
                    className="mt-6 rounded-xl bg-purple-400 px-5 py-3 font-semibold text-slate-950 shadow-md transition hover:scale-105 hover:bg-purple-300"
                  >
                    {showChinese ? "🙈 Hide Chinese" : "🌐 Show Chinese"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}