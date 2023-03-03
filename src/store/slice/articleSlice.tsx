import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type {
  ArticleStateType,
  DeleteArticleType,
  GetArticlesType,
  GetArticleType,
  NewArticleType,
  UpdateArticleType,
} from "../../types";

export const getArticles = createAsyncThunk<ArticleStateType, GetArticlesType>(
  "articleSlice/getArticles",
  async function ({ value = 1, token }) {
    const num = value > 1 ? 5 * value : 0;

    return axios({
      url: `https://blog.kata.academy/api/articles?offset=${num}&limit=5`,
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.data);
  }
);

export const newArticle = createAsyncThunk<ArticleStateType, NewArticleType>(
  "articleSlice/newArticle",
  async ({ article, token, tagList }) => {
    return axios({
      method: "POST",
      url: "https://blog.kata.academy/api/articles",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList,
        },
      },
    }).then((response) => response.data);
  }
);

export const updateArticle = createAsyncThunk<ArticleStateType, UpdateArticleType>(
  "articleSlice/updateArticle",
  async ({ article, token, slug, tagList }) => {
    return axios({
      method: "PUT",
      url: `https://blog.kata.academy/api/articles/${slug}`,
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList,
        },
      },
    }).then((response) => response.data);
  }
);

export const getArticle = createAsyncThunk<ArticleStateType, GetArticleType>(
  "articleSlice/getArticle",
  async (value) => {
    return axios({
      url: `https://blog.kata.academy/api/articles/${value.slug}`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
  }
);

export const deleteArticle = createAsyncThunk<ArticleStateType, DeleteArticleType>(
  "articleSlice/deleteArticle",
  async (value) => {
    return axios({
      method: "DELETE",
      url: `https://blog.kata.academy/api/articles/${value.slug}`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
  }
);

export const likeArticle = createAsyncThunk<ArticleStateType, DeleteArticleType>(
  "articleSlice/likeArticle",
  async (value) => {
    return axios({
      method: "POST",
      url: `https://blog.kata.academy/api/articles/${value.slug}/favorite`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
  }
);

export const likeDelete = createAsyncThunk<ArticleStateType, DeleteArticleType>(
  "articleSlice/likeDelete",
  async (value) => {
    return axios({
      method: "DELETE",
      url: `https://blog.kata.academy/api/articles/${value.slug}/favorite`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
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
