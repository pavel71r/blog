import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { newArticle } from "../../store/slice/articleSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import type { ArticleMiniType } from "../../types";
import { path } from "../../path/path";
import FormArticle from "../FormArticle/FormArticle";

const CreateArticle = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.userSlice.user);
  const { article } = useAppSelector((state) => state.articleSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleMiniType>({ mode: "onBlur" });

  const navigate = useNavigate();
  const [tagList, setTagList] = useState<Array<string>>(article.tagList);

  const updateTagList = (value: Array<{ id: string; value: string }>) => {
    setTagList(value.map((el) => el.value));
  };

  const onSubmit: SubmitHandler<ArticleMiniType> = (event) => {
    dispatch(newArticle({ article: event, token: token, tagList })).then(() => {
      navigate(path.home);
    });
  };

  return (
    <FormArticle
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      updateTagList={updateTagList}
      onSubmit={onSubmit}
      title={"Create new article"}
    />
  );
};

export default CreateArticle;
