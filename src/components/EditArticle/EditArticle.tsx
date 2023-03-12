import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { updateArticle } from "../../store/slice/articleSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { ArticleMiniType } from "../../types";
import { path } from "../../path/path";
import FormArticle from "../FormArticle/FormArticle";

const EditArticle = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.userSlice.user);
  const { article } = useAppSelector((state) => state.articleSlice);

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

  const onSubmit: SubmitHandler<ArticleMiniType> = (event) => {
    dispatch(
      updateArticle({
        article: event,
        token: token,
        slug: article.slug,
        tagList,
      })
    ).then(() => navigate(`${path.article}${article.slug}`));
  };

  useEffect(() => {
    setValue("title", article.title);
    setValue("description", article.description);
    setValue("body", article.body);
  }, [article, setValue]);

  return (
    <FormArticle
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      updateTagList={updateTagList}
      onSubmit={onSubmit}
      title={"Edit article"}
    />
  );
};

export default EditArticle;
