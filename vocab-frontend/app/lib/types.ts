export interface Word {
  id: number;
  term: string;
  definition?: string | null;
  example?: string | null;
  word_list_id: number;
}

export interface WordList {
  id: number;
  name: string;
  description?: string | null;
  words: Word[];
}

export interface WordListPayload {
  name: string;
  description?: string | null;
}

export interface WordPayload {
  term: string;
  definition?: string;
  example?: string;
  word_list_id: number;
}
