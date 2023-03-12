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
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { loginUser } from "../../store/slice/userSlice";
import Private from "../../hoc/Private";
import LocalStorage from "../../services/localStorage";
import { path } from "../../path/path";
import EditArticle from "../EditArticle/EditArticle";

const UserLocalStorage = new LocalStorage();

const App = () => {
  const dispatch = useAppDispatch();
  const { articles, reload } = useAppSelector((state) => state.articleSlice);
  const { token } = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (UserLocalStorage.getEmail() && token === "") {
      dispatch(
        loginUser({
          email: UserLocalStorage.getEmail(),
          password: UserLocalStorage.getPassword(),
        })
      );
    }
    dispatch(getArticles({ value: 1, token }));
  }, [dispatch, token, reload]);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path={path.singUp} element={<FormSignUp />} />
        <Route path={path.singIn} element={<FormSignIn />} />
        <Route path={`${path.article}:slug`} element={<Article />} />
        <Route
          path={path.createArticle}
          element={
            <Private>
              <CreateArticle />
            </Private>
          }
        />
        <Route path={path.editArticle} element={<EditArticle />} />
        <Route path={path.editProfile} element={<FormEditProfile />} />
        <Route
          path={path.home}
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
