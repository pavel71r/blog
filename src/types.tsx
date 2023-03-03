export type UserStateType = {
  user: UserType;
  statusUser: string;
};

export type UserType = {
  token: string;
  email: string;
  username: string;
  image: string;
};

export type ArticleStateType = {
  articlesCount: number;
  articles: Array<ArticleType>;
  article: ArticleType;
  status: string;
  reload: boolean;
};

export type ArticleType = {
  author: AuthorType;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: Array<string>;
  title: string;
  updatedAt: string;
};

export type AuthorType = {
  username: string;
  image: string;
  following: boolean;
};

export type CreateUserType = {
  email: string;
  password: string;
  username: string;
  repeatPassword: string;
  checkbox: string;
};

export type LoginUserType = {
  email: string | null;
  password: string | null;
};

export type UpdateUserType = {
  user: {
    email: string;
    password: string;
    username: string;
    repeatPassword: string;
  };
  token: string;
};

export type GetArticlesType = {
  value: number;
  token: string;
};

export type NewArticleType = {
  article: ArticleMiniType;
  token: string;
  tagList: Array<string>;
};

export type UpdateArticleType = {
  article: ArticleMiniType;
  token: string;
  slug: string;
  tagList: Array<string>;
};

export type GetArticleType = {
  slug: string | undefined;
  token: string;
};

export type DeleteArticleType = {
  slug: string;
  token: string;
};

export type CreateUserFormType = {
  email: string;
  password: string;
  username: string;
  image: string;
  repeatPassword: string;
};

export type ArticleMiniType = {
  title: string;
  description: string;
  body: string;
};

export type TagType = {
  updateTagList: (value: { id: string; value: string }[]) => void;
};

export type RateType = {
  slug: string;
  favorited: boolean;
  favoritesCount: number;
};
