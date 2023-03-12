import { Link, NavLink } from "react-router-dom";

import Spinner from "../Spinner/Spinner";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logOut } from "../../store/slice/userSlice";
import { path } from "../../path/path";

import style from "./Header.module.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.articleSlice);
  const { user } = useAppSelector((state) => state.userSlice);

  const classLogOut = [style.btn, style.logOut];
  const classCreateArticle = [style.btn, style.active];

  return (
    <div className={style.header}>
      <Link to={path.home} className={style.title}>
        Realworld Blog
      </Link>

      {status === "loading" && <Spinner />}

      {user.token === "" && (
        <NavLink to={path.singIn} className={style.btn}>
          Sign In
        </NavLink>
      )}

      {user.token === "" && (
        <NavLink to={path.singUp} className={style.btn}>
          Sign Up
        </NavLink>
      )}

      {user.token !== "" && (
        <Link to={path.createArticle} className={classCreateArticle.join(" ")}>
          Create article
        </Link>
      )}

      {user.token !== "" && (
        <Link to={path.editProfile} className={style.text}>
          {user.username}
        </Link>
      )}

      {user.token !== "" && (
        <Link to={path.editProfile}>
          <img className={style.logo} alt="" src={user.image}></img>
        </Link>
      )}

      {user.token !== "" && (
        <Link
          to={path.home}
          className={classLogOut.join(" ")}
          onClick={() => {
            dispatch(logOut());
          }}
        >
          Log Out
        </Link>
      )}
    </div>
  );
};

export default Header;
