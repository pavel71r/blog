import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ArticleService from "../../services/articleService";
import type {
  DeleteArticleType,
  ArticleStateType,
  GetArticlesType,
  GetArticleType,
  NewArticleType,
  UpdateArticleType,
} from "../../types";

const ArticleServices = new ArticleService();

export const getArticles = createAsyncThunk<ArticleStateType, GetArticlesType>(
  "articleSlice/getArticles",
  async function ({ value = 1, token }) {
    return ArticleServices.articlesGet({ value, token });
  }
);

export const newArticle = createAsyncThunk<ArticleStateType, NewArticleType>(
  "articleSlice/newArticle",
  async ({ article, token, tagList }) => {
    return ArticleServices.articleNew({ article, token, tagList });
  }
);

export const updateArticle = createAsyncThunk<ArticleStateType, UpdateArticleType>(
  "articleSlice/updateArticle",
  async ({ article, token, slug, tagList }) => {
    return ArticleServices.articleUpdate({ article, token, slug, tagList });
  }
);

export const getArticle = createAsyncThunk<ArticleStateType, GetArticleType>(
  "articleSlice/getArticle",
  async (value) => {
    return ArticleServices.articleGet(value);
  }
);

export const deleteArticle = createAsyncThunk<ArticleStateType, DeleteArticleType>(
  "articleSlice/deleteArticle",
  async (value) => {
    return ArticleServices.articleDelete(value);
  }
);

export const likeArticle = createAsyncThunk<ArticleStateType, DeleteArticleType>(
  "articleSlice/likeArticle",
  async (value) => {
    return ArticleServices.articleLike(value);
  }
);

export const likeDelete = createAsyncThunk<ArticleStateType, DeleteArticleType>(
  "articleSlice/likeDelete",
  async (value) => {
    return ArticleServices.deleteLike(value);
  }
);

const initialState: ArticleStateType = {
  articlesCount: 0,
  articles: [],
  article: {
    author: { username: "", image: "", following: false },
    body: "",
    createdAt: "",
    description: "",
    favorited: false,
    favoritesCount: 0,
    slug: "",
    tagList: [""],
    title: "",
    updatedAt: "",
  },
  status: "loading",
  reload: false,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.status = "success";
      })

      .addCase(getArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.status = "success";
        state.article = action.payload.article;
      })
      .addCase(getArticle.rejected, (state) => {
        state.status = "error";
      })

      .addCase(updateArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.status = "success";
        state.article = action.payload.article;
        state.reload = !state.reload;
      })

      .addCase(deleteArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.status = "success";
        state.reload = !state.reload;
      })

      .addCase(newArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newArticle.fulfilled, (state) => {
        state.status = "success";
        state.reload = !state.reload;
      })

      .addCase(likeArticle.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.reload = !state.reload;
      })

      .addCase(likeDelete.fulfilled, (state, action) => {
        state.article = action.payload.article;
        state.reload = !state.reload;
      });
  },
});
export default articleSlice.reducer;
