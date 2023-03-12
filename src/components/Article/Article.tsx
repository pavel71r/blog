import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { format, parseISO } from "date-fns";
import { Popconfirm as Popup } from "antd";
import ReactMarkdown from "react-markdown";

import { getArticle, deleteArticle } from "../../store/slice/articleSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import Rate from "../Rate/Rate";
import { path } from "../../path/path";

import style from "./Article.module.scss";

const Article = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const { token, username } = useAppSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  const { article } = useAppSelector((state) => state.articleSlice);

  useEffect(() => {
    dispatch(getArticle({ slug, token }));
  }, [dispatch, slug, token]);

  if (slug !== article.slug) return <React.Fragment />;

  const tags = article.tagList?.map((el) => (
    <span key={el} className={style.tag}>
      {el}
    </span>
  ));

  const onDelete = () => {
    dispatch(deleteArticle({ slug, token })).then(() => navigate(path.home));
  };

  const onEdit = () => {
    navigate(path.editArticle, { state: "article" });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.header}>
          <h2 className={style.title}>{article.title}</h2>
          <Rate {...article} />
        </div>
        <div className={style.tagWrapper}>{tags}</div>
        <div className={style.wrapperText}>
          <p className={style.description}>{article.description}</p>
          <ReactMarkdown className={style.text}>{article.body}</ReactMarkdown>
        </div>
      </div>
      <div className={style.info}>
        <span>{article.author.username}</span>
        <span className={style.date}>{article.createdAt && format(parseISO(article.createdAt), "PP")}</span>
        <div className={style.logo}>
          <img className={style.img} alt="" src={article.author.image} />
        </div>
        {article.author.username === username && (
          <React.Fragment>
            <Popup
              placement="rightTop"
              title="Are you sure to delete this article?"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <button className={style.delete}>Delete</button>
            </Popup>
            <button onClick={onEdit} className={style.edit}>
              Edit
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Article;
