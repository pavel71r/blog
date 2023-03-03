import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import ArticleList from "../ArticleList/ArticleList";
import Paginal from "../Paginal/Paginal";
import FormSignUp from "../FormSignUp/FormSignUp";
import FormSignIn from "../FormSignIn/FormSignIn";
import FormEditProfile from "../FormEditProfile/FormEditProfile";
import CreateArticle from "../CreateArticle/CreateArticle";
import Article from "../Article/Article";
import { getArticles } from "../../store/slice/articleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { loginUser } from "../../store/slice/userSlice";

const App = () => {
  const dispatch = useAppDispatch();
  const { articles, reload } = useAppSelector((state) => state.articleSlice);
  const { token } = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (localStorage.getItem("email") && token === "") {
      dispatch(
        loginUser({
          email: localStorage.getItem("email"),
          password: localStorage.getItem("pass"),
        })
      );
    }
    dispatch(getArticles({ value: 1, token }));
  }, [dispatch, token, reload]);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/SignUp" element={<FormSignUp />} />
        <Route path="/SignIn" element={<FormSignIn />} />
        <Route path="/Article/:slug" element={<Article />} />
        <Route path="/CreateArticle" element={<CreateArticle />} />
        <Route path="/EditProfile" element={<FormEditProfile />} />
        <Route
          path="/"
          element={
            <React.Fragment>
              <ArticleList />
              {articles.length >= 5 && <Paginal />}
            </React.Fragment>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default App;
