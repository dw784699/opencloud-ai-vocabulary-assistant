import type { WordList, Word, WordListPayload, WordPayload } from "./types";

const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";
if (!apiBase) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined. Set it in .env.local and restart the dev server.");
}
const defaultHeaders = { "Content-Type": "application/json" };

async function fetcher<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...defaultHeaders,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || response.statusText);
  }

  return response.json();
}

export function getWordLists(): Promise<WordList[]> {
  return fetcher<WordList[]>("/word-lists");
}

export function createWordList(payload: WordListPayload): Promise<WordList> {
  return fetcher<WordList>("/word-lists", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateWordList(listId: number, payload: WordListPayload): Promise<WordList> {
  return fetcher<WordList>(`/word-lists/${listId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteWordList(listId: number): Promise<void> {
  return fetcher<void>(`/word-lists/${listId}`, {
    method: "DELETE",
  });
}

export function getWords(): Promise<Word[]> {
  return fetcher<Word[]>("/words");
}

export function createWord(payload: WordPayload): Promise<Word> {
  return fetcher<Word>("/words", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateWord(wordId: number, payload: WordPayload): Promise<Word> {
  return fetcher<Word>(`/words/${wordId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteWord(wordId: number): Promise<void> {
  return fetcher<void>(`/words/${wordId}`, {
    method: "DELETE",
  });
}
