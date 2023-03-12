import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

import TagInput from "../TagInput/TagInput";
import type { ArticleMiniType } from "../../types";

import style from "./FormArticle.module.scss";

type FormArticleType = {
  errors: FieldErrors<ArticleMiniType>;
  handleSubmit: UseFormHandleSubmit<ArticleMiniType>;
  onSubmit: SubmitHandler<ArticleMiniType>;
  register: UseFormRegister<ArticleMiniType>;
  updateTagList: (value: { id: string; value: string }[]) => void;
  title: string;
};

const FormArticle = ({ errors, handleSubmit, onSubmit, register, updateTagList, title }: FormArticleType) => {
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
      <TagInput updateTagList={updateTagList} />
      <input className={style.inputSubmit} type="submit" value={"Send"} />
    </form>
  );
};

export default FormArticle;
