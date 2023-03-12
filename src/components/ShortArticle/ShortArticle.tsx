import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

import Rate from "../Rate/Rate";
import type { ArticleType } from "../../types";
import { path } from "../../path/path";

import style from "./ShortArticle.module.scss";

const ShortArticle = (props: ArticleType) => {
  const tags = props.tagList?.map((el) => (
    <span key={el} className={style.tag}>
      {el}
    </span>
  ));

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.header}>
          <Link to={`${path.article}${props.slug}`} className={style.title}>
            {props.title}
          </Link>
          <Rate {...props} />
        </div>
        <div className={style.tagsWrapper}>{tags}</div>
        <div className={style.wrapperText}>
          <p className={style.text}>{props.description}</p>
        </div>
      </div>
      <div className={style.info}>
        <span>{props.author.username}</span>
        <span className={style.date}>{format(parseISO(props.createdAt), "PP")}</span>
        <div className={style.logo}>
          <img className={style.img} alt="" src={props.author.image} />
        </div>
      </div>
    </div>
  );
};

export default ShortArticle;
