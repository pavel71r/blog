import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { loginUser, resetStatus } from "../../store/slice/userSlice";
import Spinner from "../Spinner/Spinner";
import { LoginUserType } from "../../types";

import style from "./FormSignIn.module.scss";

const patternEmail =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/;

const FormSignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { statusUser } = useAppSelector((state) => state.userSlice);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUserType>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginUserType> = (value) => {
    dispatch(loginUser(value)).then((response) => {
      if (response.payload) {
        navigate("/", { replace: true });
        reset();
      }
    });
  };

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.load}>{statusUser === "loading" && <Spinner />}</div>
      {statusUser === "error" && <div className={style.error}>Такой аккаунт не существует !</div>}
      <h3 className={style.title}>Sign In</h3>
      <label className={style.label}>
        <span>Email address</span>
        <input
          autoFocus
          className={style.input}
          placeholder="Email address"
          autoComplete="off"
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
          className={style.input}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
        />
        {errors?.password && <span className={style.validate}>invalid password</span>}
      </label>
      <input className={style.inputSubmit} type="submit" value={"Login"} />
      <span className={style.link}>
        Don’t have an account?
        <Link to="/SignUp">
          <span className={style.textLink}> Sign Up.</span>
        </Link>
      </span>
    </form>
  );
};

export default FormSignIn;
