"use client";

import { useState } from "react";

const vocabularyList = [
  {
    word: "Cloud",
    category: "Basic Word",
    englishMeaning:
      "A system that stores data and runs applications on the internet instead of on a local computer.",
    chineseMeaning: "云端 / 云计算环境，指通过互联网使用计算资源。",
    example: "Many companies use cloud services to store files and run apps.",
  },
  {
    word: "Server",
    category: "Basic Word",
    englishMeaning:
      "A computer or system that provides services, data, or applications to other computers.",
    chineseMeaning: "服务器，给其他电脑或用户提供数据、网站或应用服务的系统。",
    example: "A website needs a server to run online.",
  },
  {
    word: "Instance",
    category: "Cloud Word",
    englishMeaning:
      "A virtual server running in the cloud.",
    chineseMeaning: "实例，通常指云端运行的一台虚拟服务器。",
    example: "An EC2 instance can host a web application.",
  },
  {
    word: "Storage",
    category: "Basic Word",
    englishMeaning:
      "A place or service used to save data, files, images, or backups.",
    chineseMeaning: "存储，用来保存数据、文件、图片或备份的空间或服务。",
    example: "Amazon S3 is used for cloud storage.",
  },
  {
    word: "Database",
    category: "Application Word",
    englishMeaning:
      "A system used to organize, store, and manage data.",
    chineseMeaning: "数据库，用来组织、保存和管理数据的系统。",
    example: "A shopping website uses a database to store customer orders.",
  },
  {
    word: "Network",
    category: "Basic Word",
    englishMeaning:
      "A group of connected computers or systems that can communicate with each other.",
    chineseMeaning: "网络，多个电脑或系统连接在一起并互相通信。",
    example: "Cloud servers communicate through a network.",
  },
  {
    word: "Security",
    category: "Important Word",
    englishMeaning:
      "The protection of systems, data, and users from unauthorized access or attacks.",
    chineseMeaning: "安全，保护系统、数据和用户不被未授权访问或攻击。",
    example: "Cloud security is important for protecting customer data.",
  },
  {
    word: "Permission",
    category: "Security Word",
    englishMeaning:
      "The right to access or use a specific system, file, or service.",
    chineseMeaning: "权限，表示一个用户是否可以访问或使用某个系统、文件或服务。",
    example: "An IAM user needs permission to access an AWS resource.",
  },
  {
    word: "Deploy",
    category: "Action Word",
    englishMeaning:
      "To publish or move an application so people can use it online.",
    chineseMeaning: "部署，把应用发布到网上，让别人可以访问使用。",
    example: "We deploy a Next.js app to Vercel.",
  },
  {
    word: "Container",
    category: "DevOps Word",
    englishMeaning:
      "A package that includes an application and everything it needs to run.",
    chineseMeaning: "容器，把应用和运行所需环境打包在一起的技术。",
    example: "Docker uses containers to run applications consistently.",
  },
  {
    word: "API",
    category: "Application Word",
    englishMeaning:
      "A way for different software systems to communicate with each other.",
    chineseMeaning: "应用程序接口，让不同软件系统之间可以互相通信。",
    example: "A weather app uses an API to get weather data.",
  },
  {
    word: "Backup",
    category: "Basic Word",
    englishMeaning:
      "A copy of data that can be used if the original data is lost.",
    chineseMeaning: "备份，用来防止原始数据丢失的一份复制数据。",
    example: "Companies create backups to protect important files.",
  },
];

type VocabularyItem = {
  word: string;
  category: string;
  englishMeaning: string;
  chineseMeaning: string;
  example: string;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleChinese, setVisibleChinese] = useState<string[]>([]);
  const [reviewList, setReviewList] = useState<VocabularyItem[]>([]);

  const filteredVocabulary = vocabularyList.filter((item) => {
    const searchText = `${item.word} ${item.category} ${item.englishMeaning} ${item.chineseMeaning} ${item.example}`;
    return searchText.toLowerCase().includes(searchTerm.toLowerCase());
  });

  function toggleChinese(word: string) {
    if (visibleChinese.includes(word)) {
      setVisibleChinese(visibleChinese.filter((item) => item !== word));
    } else {
      setVisibleChinese([...visibleChinese, word]);
    }
  }

  function addToReview(item: VocabularyItem) {
    const alreadyAdded = reviewList.some(
      (reviewItem) => reviewItem.word === item.word
    );

    if (!alreadyAdded) {
      setReviewList([...reviewList, item]);
    }
  }

  function removeFromReview(word: string) {
    setReviewList(reviewList.filter((item) => item.word !== word));
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            OpenCloud Learning Project
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-6xl">
            Cloud English Vocabulary Assistant
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-300">
            A simple learning tool that helps students learn, translate, and
            review important English words used in cloud computing courses.
          </p>
        </div>

        {/* Project Purpose */}
        <div className="mb-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl font-semibold text-cyan-300">
              Learn
            </h2>
            <p className="text-slate-300">
              Students can read English meanings and examples for cloud
              vocabulary.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl font-semibold text-purple-300">
              Translate
            </h2>
            <p className="text-slate-300">
              Students can click a button to show the Chinese meaning when they
              do not understand a word.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl font-semibold text-emerald-300">
              Review
            </h2>
            <p className="text-slate-300">
              Students can add difficult words to today&apos;s review list and
              study them again later.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-10 rounded-3xl border border-white/10 bg-slate-900 p-6">
          <label
            htmlFor="search"
            className="mb-3 block text-lg font-semibold text-white"
          >
            Search vocabulary
          </label>

          <input
            id="search"
            type="text"
            placeholder="Try: server, storage, security, deploy, API..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white px-5 py-4 text-slate-900 outline-none transition focus:ring-4 focus:ring-cyan-400"
          />

          <p className="mt-3 text-sm text-slate-400">
            Showing {filteredVocabulary.length} of {vocabularyList.length} words
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Vocabulary Cards */}
          <section>
            <h2 className="mb-5 text-2xl font-bold">Vocabulary Cards</h2>

            <div className="grid gap-5 md:grid-cols-2">
              {filteredVocabulary.length > 0 ? (
                filteredVocabulary.map((item) => {
                  const chineseIsVisible = visibleChinese.includes(item.word);
                  const alreadyInReview = reviewList.some(
                    (reviewItem) => reviewItem.word === item.word
                  );

                  return (
                    <div
                      key={item.word}
                      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-white/10"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-3xl font-bold text-white">
                            {item.word}
                          </h3>
                          <p className="mt-1 text-sm text-cyan-300">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="mb-2 font-semibold text-slate-200">
                          English Meaning
                        </p>
                        <p className="text-slate-300">{item.englishMeaning}</p>
                      </div>

                      <div className="mb-4">
                        <p className="mb-2 font-semibold text-slate-200">
                          Example
                        </p>
                        <p className="text-slate-300">{item.example}</p>
                      </div>

                      {chineseIsVisible && (
                        <div className="mb-4 rounded-2xl bg-cyan-500/10 p-4">
                          <p className="mb-1 font-semibold text-cyan-300">
                            中文意思
                          </p>
                          <p className="text-slate-200">
                            {item.chineseMeaning}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => toggleChinese(item.word)}
                          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                        >
                          {chineseIsVisible
                            ? "Hide Chinese"
                            : "Show Chinese"}
                        </button>

                        <button
                          onClick={() => addToReview(item)}
                          disabled={alreadyInReview}
                          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                            alreadyInReview
                              ? "cursor-not-allowed bg-slate-700 text-slate-400"
                              : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                          }`}
                        >
                          {alreadyInReview ? "Added" : "Add to Review"}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center md:col-span-2">
                  <h3 className="mb-2 text-2xl font-semibold">
                    No word found
                  </h3>
                  <p className="text-slate-400">
                    Try another keyword, such as cloud, server, storage, or
                    security.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Review List */}
          <aside className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <h2 className="mb-2 text-2xl font-bold">Today&apos;s Review List</h2>
            <p className="mb-5 text-sm text-slate-400">
              Add difficult words here and review them before class or homework.
            </p>

            {reviewList.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/20 p-6 text-center">
                <p className="text-slate-400">
                  No words added yet. Click “Add to Review” on a vocabulary
                  card.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviewList.map((item) => (
                  <div
                    key={item.word}
                    className="rounded-2xl bg-white/5 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold text-white">
                        {item.word}
                      </h3>

                      <button
                        onClick={() => removeFromReview(item.word)}
                        className="rounded-lg bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/30"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mb-2 text-sm text-cyan-300">
                      {item.category}
                    </p>

                    <p className="text-sm text-slate-300">
                      {item.chineseMeaning}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>

        {/* Presentation Script Section */}
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-2xl font-bold">
            Simple Presentation Summary
          </h2>

          <p className="leading-8 text-slate-300">
            This project helps students learn English vocabulary used in cloud
            computing courses. Students can search for a word, read the English
            meaning and example, click the button to show the Chinese meaning,
            and add difficult words to today&apos;s review list. The goal is to
            make vocabulary learning easier, more visual, and more useful for
            beginners.
          </p>
        </section>
      </section>
    </main>
  );
}