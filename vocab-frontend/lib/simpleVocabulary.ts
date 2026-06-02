export type VocabularyWord = {
  word: string;
  chinese: string;
  meaning: string;
  example: string;
};

export const simpleVocabulary: VocabularyWord[] = [
  {
    word: "cloud",
    chinese: "云；云计算",
    meaning: "Cloud means using online servers to store data or run applications.",
    example: "Many companies use the cloud to store files and run software.",
  },
  {
    word: "server",
    chinese: "服务器",
    meaning: "A server is a computer that provides services or data to other computers.",
    example: "The website is running on a cloud server.",
  },
  {
    word: "storage",
    chinese: "存储",
    meaning: "Storage is a place where data and files are saved.",
    example: "Cloud storage helps users save files online.",
  },
  {
    word: "database",
    chinese: "数据库",
    meaning: "A database is a system used to store and manage data.",
    example: "The app saves user information in a database.",
  },
  {
    word: "security",
    chinese: "安全",
    meaning: "Security protects systems, data, and users from risks and attacks.",
    example: "Cloud security helps protect customer data.",
  },
  {
    word: "deploy",
    chinese: "部署；发布",
    meaning: "Deploy means to publish an application so users can access it.",
    example: "I will deploy my web app to the cloud.",
  },
  {
    word: "api",
    chinese: "应用程序接口",
    meaning: "An API allows different software systems to communicate with each other.",
    example: "The app uses an API to get data from the server.",
  },
];