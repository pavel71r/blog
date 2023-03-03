import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { updateUser, resetStatus } from "../../store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Spinner from "../Spinner/Spinner";
import { CreateUserFormType } from "../../types";

import style from "./FormEditProfile.module.scss";

const patternEmail =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;

const patternUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*+,;=.]+$/gm;

const FormEditProfile = () => {
  const dispatch = useAppDispatch();
  const { user, statusUser } = useAppSelector((state) => state.userSlice);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormType>({ mode: "onBlur" });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateUserFormType> = (e) => {
    dispatch(updateUser({ token: user.token, user: { ...e } })).then((response) => {
      if (response.payload) {
        navigate("/", { replace: true });
      }
    });
  };

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  useEffect(() => {
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("password", String(localStorage.getItem("pass")));
    setValue("image", user.image);
  }, [setValue, user]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.load}>{statusUser === "loading" && <Spinner />}</div>
      {statusUser === "error" && <div className={style.error}>Такой пользователь уже существует!</div>}
      <h3 className={style.title}>Edit Profile</h3>
      <label className={style.label}>
        <span>Username</span>
        <input
          autoFocus
          autoComplete="off"
          className={style.input}
          placeholder="Username"
          {...register("username", {
            required: true,
          })}
        />
        {errors?.username && <span className={style.validate}>invalid name</span>}
      </label>
      <label className={style.label}>
        <span>Email address</span>
        <input
          className={style.input}
          placeholder="Email address"
          autoComplete="off"
          {...register("email", { required: true, pattern: patternEmail })}
        />
      </label>
      <label className={style.label}>
        <span>New password</span>
        <input
          className={style.input}
          placeholder="New password"
          autoComplete="off"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
        />
        {errors?.password && <span className={style.validate}>invalid password</span>}
      </label>
      <label className={style.label}>
        <span>Avatar image (url)</span>
        <input
          className={style.input}
          placeholder="Avatar image (url)"
          autoComplete="off"
          {...register("image", {
            pattern: patternUrl,
            required: true,
          })}
        />
        {errors?.image && <span className={style.validate}>invalid url</span>}
      </label>
      <input className={style.inputSubmit} type="submit" value={"Save"} />
    </form>
  );
};

export default FormEditProfile;
