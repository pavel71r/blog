import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { newArticle, updateArticle } from "../../store/slice/articleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import TagInput from "../TagInput/TagInput";
import { ArticleMiniType } from "../../types";

import style from "./CreateArticle.module.scss";

const CreateArticle = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.userSlice.user);
  const { article } = useAppSelector((state) => state.articleSlice);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleMiniType>({ mode: "onBlur" });

  const navigate = useNavigate();
  const [tagList, setTagList] = useState<Array<string>>(article.tagList);

  const updateTagList = (value: Array<{ id: string; value: string }>) => {
    setTagList(value.map((el) => el.value));
  };

  const title = location.state ? "Edit article" : "Create new article";

  const onSubmit: SubmitHandler<ArticleMiniType> = (event) => {
    if (!location.state) {
      dispatch(newArticle({ article: event, token: token, tagList })).then(() => {
        navigate("/");
      });
    } else {
      dispatch(
        updateArticle({
          article: event,
          token: token,
          slug: article.slug,
          tagList,
        })
      ).then(() => navigate(`/Article/${article.slug}`));
    }
  };

  useEffect(() => {
    if (location.state) {
      setValue("title", article.title);
      setValue("description", article.description);
      setValue("body", article.body);
    }
  }, [location, article, setValue]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={style.title}>{title}</h3>
      <label className={style.label}>
        <span>Title</span>
        <input
          autoComplete="off"
          className={style.input}
          placeholder="Title"
          {...register("title", {
            required: true,
          })}
        />
      </label>
      {errors?.title && <span className={style.error}>the field should not be empty</span>}

      <label className={style.label}>
        <span>Short description</span>
        <input
          autoComplete="off"
          className={style.input}
          placeholder="Short description"
          {...register("description", { required: true })}
        />
      </label>
      {errors?.description && <span className={style.error}>the field should not be empty</span>}
      <label className={style.label}>
        <span>Text</span>
        <textarea
          autoComplete="off"
          className={style.text}
          placeholder="Text"
          {...register("body", { required: true })}
        />
      </label>
      {errors?.body && <span className={style.error}>the field should not be empty</span>}
      <TagInput updateTagList={(value: { id: string; value: string }[]) => updateTagList(value)} />
      <input className={style.inputSubmit} type="submit" value={"Send"} />
    </form>
  );
};

export default CreateArticle;
