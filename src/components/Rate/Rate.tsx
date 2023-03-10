import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button } from "antd";

import { likeArticle, likeDelete } from "../../store/slice/articleSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

import style from "./Rate.module.scss";

type RateType = {
  slug: string;
  favorited: boolean;
  favoritesCount: number;
};

const Rate = ({ slug, favorited, favoritesCount }: RateType) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.userSlice.user);

  const onLike = () => {
    if (favorited) dispatch(likeDelete({ token, slug }));
    else dispatch(likeArticle({ token, slug }));
  };

  const iconLike = favorited ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined style={{ color: "gray" }} />;

  return (
    <div className={style.container}>
      <Button type="text" shape="circle" onClick={onLike} disabled={!token && true} icon={iconLike} />
      <div>{favoritesCount}</div>
    </div>
  );
};

export default Rate;
