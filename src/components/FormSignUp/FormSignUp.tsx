import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createUser, resetStatus } from "../../store/slice/userSlice";
import Spinner from "../Spinner/Spinner";
import type { CreateUserType } from "../../types";

import style from "./FormSignUp.module.scss";

const patternEmail =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;

const FormSignUp = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserType>({ mode: "onBlur" });

  const { statusUser } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const [pass, setPass] = useState(false);

  const onSubmit: SubmitHandler<CreateUserType> = (user) => {
    if (user.password === user.repeatPassword) {
      setPass(false);
      dispatch(createUser(user)).then(() => navigate("/SignIn", { replace: true }));
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
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors?.username && <span className={style.validate}>invalid name</span>}
        </label>
        <label className={style.label}>
          <span>Email address</span>
          <input
            autoComplete="off"
            className={style.input}
            placeholder="Email address"
            {...register("email", {
              required: true,
              pattern: patternEmail,
            })}
          />
          {errors?.email && <span className={style.validate}>invalid email address</span>}
        </label>
        <label className={style.label}>
          <span>Password</span>
          <input
            autoComplete="off"
            className={style.input}
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
          />
          {errors?.password && <span className={style.validate}>invalid password</span>}
        </label>
        <label className={style.label}>
          <span>Repeat Password</span>
          <input
            className={style.input}
            autoComplete="off"
            placeholder="Repeat Password"
            {...register("repeatPassword", {
              required: true,
            })}
          />
        </label>
        <label className={style.labelCheckbox}>
          <input className={style.checkbox} type="checkbox" {...register("checkbox", { required: true })} />
          <span>I agree to the processing of my personal information</span>
        </label>
        <input className={style.inputSubmit} type="submit" value={"Create"} />
        <span className={style.link}>
          Already have an account?
          <Link to="/SignIn">
            <span className={style.textLink}> Sign In.</span>
          </Link>
        </span>
      </form>
    </React.Fragment>
  );
};

export default FormSignUp;
