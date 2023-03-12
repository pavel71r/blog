import axios from "axios";

import type { DeleteArticleType, GetArticlesType, GetArticleType, NewArticleType, UpdateArticleType } from "../types";

export default class ArticleService {
  BaseUrl = "https://blog.kata.academy/api/";

  async articlesGet({ value = 1, token }: GetArticlesType) {
    const num = value > 1 ? 5 * value : 0;

    return axios({
      url: `${this.BaseUrl}articles?offset=${num}&limit=5`,
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.data);
  }

  async articleNew({ article, token, tagList }: NewArticleType) {
    return axios({
      method: "POST",
      url: `${this.BaseUrl}articles`,
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

  async articleUpdate({ article, token, slug, tagList }: UpdateArticleType) {
    return axios({
      method: "PUT",
      url: `${this.BaseUrl}articles/${slug}`,
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

  async articleGet(value: GetArticleType) {
    return axios({
      url: `${this.BaseUrl}articles/${value.slug}`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
  }

  async articleDelete(value: DeleteArticleType) {
    return axios({
      method: "DELETE",
      url: `${this.BaseUrl}articles/${value.slug}`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
  }

  async articleLike(value: DeleteArticleType) {
    return axios({
      method: "POST",
      url: `${this.BaseUrl}articles/${value.slug}/favorite`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
  }

  async deleteLike(value: DeleteArticleType) {
    return axios({
      method: "DELETE",
      url: `${this.BaseUrl}articles/${value.slug}/favorite`,
      headers: {
        Authorization: `Token ${value.token}`,
      },
    }).then((response) => response.data);
  }
}
