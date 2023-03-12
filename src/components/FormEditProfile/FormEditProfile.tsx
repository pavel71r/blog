import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { updateUser, resetStatus } from "../../store/slice/userSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import Spinner from "../Spinner/Spinner";
import { CreateUserFormType } from "../../types";
import { path } from "../../path/path";
import LocalStorage from "../../services/localStorage";
import { SchemaFormEdit } from "../../yup/yup";

import style from "./FormEditProfile.module.scss";

const UserLocalStorage = new LocalStorage();

const FormEditProfile = () => {
  const dispatch = useAppDispatch();
  const { user, statusUser } = useAppSelector((state) => state.userSlice);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormType>({ mode: "onBlur", resolver: yupResolver(SchemaFormEdit) });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateUserFormType> = (e) => {
    dispatch(updateUser({ token: user.token, user: { ...e } })).then((response) => {
      if (response.payload) {
        navigate(path.home, { replace: true });
      }
    });
  };

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("password", String(UserLocalStorage.getPassword()));
    setValue("image", user.image);
  }, [setValue, user]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.load}>{statusUser === "loading" && <Spinner />}</div>
      {statusUser === "error" && <div className={style.error}>Такой пользователь уже существует!</div>}
      <h3 className={style.title}>Edit Profile</h3>
      <label className={style.label}>
        <span>Username</span>
        <input autoFocus autoComplete="off" className={style.input} placeholder="Username" {...register("username")} />
        {errors?.username && <span className={style.validate}>invalid name</span>}
      </label>
      <label className={style.label}>
        <span>Email address</span>
        <input className={style.input} placeholder="Email address" autoComplete="off" {...register("email")} />
        {errors?.email && <span className={style.validate}>invalid email</span>}
      </label>
      <label className={style.label}>
        <span>New password</span>
        <input className={style.input} placeholder="New password" autoComplete="off" {...register("password")} />
        {errors?.password && <span className={style.validate}>invalid password</span>}
      </label>
      <label className={style.label}>
        <span>Avatar image (url)</span>
        <input className={style.input} placeholder="Avatar image (url)" autoComplete="off" {...register("image")} />
        {errors?.image && <span className={style.validate}>invalid url</span>}
      </label>
      <input className={style.inputSubmit} type="submit" value={"Save"} />
    </form>
  );
};

export default FormEditProfile;
