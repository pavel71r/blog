import { Link, NavLink } from "react-router-dom";

import Spinner from "../Spinner/Spinner";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { logOut } from "../../store/slice/userSlice";

import style from "./Header.module.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.articleSlice);
  const { user } = useAppSelector((state) => state.userSlice);

  const classLogOut = [style.btn, style.logOut];
  const classCreateArticle = [style.btn, style.active];

  const exit = () => {
    dispatch(logOut());
  };

  return (
    <div className={style.header}>
      <Link to="/" className={style.title}>
        Realworld Blog
      </Link>

      {status === "loading" && <Spinner />}

      {user.token === "" && (
        <NavLink to="/SignIn" className={style.btn}>
          Sign In
        </NavLink>
      )}

      {user.token === "" && (
        <NavLink to="/SignUp" className={style.btn}>
          Sign Up
        </NavLink>
      )}

      {user.token !== "" && (
        <Link to="/CreateArticle" className={classCreateArticle.join(" ")}>
          Create article
        </Link>
      )}

      {user.token !== "" && (
        <Link to="/EditProfile" className={style.text}>
          {user.username}
        </Link>
      )}

      {user.token !== "" && (
        <Link to="/EditProfile">
          <img className={style.logo} alt="" src={user.image}></img>
        </Link>
      )}

      {user.token !== "" && (
        <Link to="/" className={classLogOut.join(" ")} onClick={exit}>
          Log Out
        </Link>
      )}
    </div>
  );
};

export default Header;
