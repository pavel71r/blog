import ShortArticle from "../ShortArticle/ShortArticle";
import { useAppSelector } from "../../hooks/useAppSelector";

import style from "./ArticleList.module.scss";

const ArticleList = () => {
  const { articles } = useAppSelector((state) => state.articleSlice);

  const elements = articles.map((el) => {
    return (
      <li key={el.slug}>
        <ShortArticle {...el} />
      </li>
    );
  });

  return <ul className={style.wrapper}>{elements}</ul>;
};

export default ArticleList;
