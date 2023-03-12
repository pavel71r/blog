import { Pagination } from "antd";

import "./Paginal.css";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getArticles } from "../../store/slice/articleSlice";

const Paginal = () => {
  const dispatch = useAppDispatch();
  const { articlesCount } = useAppSelector((state) => state.articleSlice);
  const { token } = useAppSelector((state) => state.userSlice.user);

  const changePage = (value: number) => {
    dispatch(getArticles({ value, token }));
  };

  return (
    <Pagination
      defaultCurrent={1}
      total={articlesCount}
      showSizeChanger={false}
      hideOnSinglePage
      onChange={changePage}
    />
  );
};

export default Paginal;
