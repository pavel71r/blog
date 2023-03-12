import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { createUser, resetStatus } from "../../store/slice/userSlice";
import Spinner from "../Spinner/Spinner";
import type { CreateUserType } from "../../types";
import { path } from "../../path/path";
import { SchemaSignUp } from "../../yup/yup";

import style from "./FormSignUp.module.scss";

const FormSignUp = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserType>({ mode: "onBlur", resolver: yupResolver(SchemaSignUp) });

  const { statusUser } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [pass, setPass] = useState(false);

  const onSubmit: SubmitHandler<CreateUserType> = (user) => {
    if (user.password === user.repeatPassword) {
      setPass(false);
      dispatch(createUser(user)).then(() => navigate(path.singIn, { replace: true }));
    } else setPass(true);
  };

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  return (
    <React.Fragment>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.load}>{statusUser === "loading" && <Spinner />}</div>
        {statusUser === "error" && <div className={style.error}>Такой пользователь уже существует !</div>}
        {pass && <div className={style.error}>Пароли не совпадают !</div>}
        <h3 className={style.title}>Create new account</h3>
        <label className={style.label}>
          <span>Username</span>
          <input
            autoFocus
            autoComplete="off"
            className={style.input}
            placeholder="Username"
            {...register("username")}
          />
          {errors?.username && <span className={style.validate}>invalid name</span>}
        </label>
        <label className={style.label}>
          <span>Email address</span>
          <input autoComplete="off" className={style.input} placeholder="Email address" {...register("email")} />
          {errors?.email && <span className={style.validate}>invalid email address</span>}
        </label>
        <label className={style.label}>
          <span>Password</span>
          <input
            autoComplete="off"
            className={style.input}
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          {errors?.password && <span className={style.validate}>invalid password</span>}
        </label>
        <label className={style.label}>
          <span>Repeat Password</span>
          <input
            className={style.input}
            autoComplete="off"
            type="password"
            placeholder="Repeat Password"
            {...register("repeatPassword")}
          />
        </label>
        <label className={style.labelCheckbox}>
          <input className={style.checkbox} type="checkbox" {...register("checkbox")} />
          <span>I agree to the processing of my personal information</span>
        </label>
        {errors?.checkbox && <span className={style.validate}>you have not read the information</span>}
        <input className={style.inputSubmit} type="submit" value={"Create"} />
        <span className={style.link}>
          Already have an account?
          <Link to={path.singIn}>
            <span className={style.textLink}> Sign In.</span>
          </Link>
        </span>
      </form>
    </React.Fragment>
  );
};

export default FormSignUp;
