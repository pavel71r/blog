import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";

import { useAppSelector } from "../../hooks/useAppSelector";

import style from "./TagInput.module.scss";

type TagType = {
  updateTagList: (value: { id: string; value: string }[]) => void;
};

const TagInput = ({ updateTagList }: TagType) => {
  const { tagList } = useAppSelector((state) => state.articleSlice.article);
  const location = useLocation();

  const [state, setState] = useState(
    tagList.map((el) => {
      return { id: v4(), value: el };
    })
  );

  useEffect(() => {
    if (!location.state) setState([{ id: v4(), value: "" }]);
  }, [location.state]);

  const deleteTag = (id: string) => {
    const idx = state.findIndex((el) => el.id === id);
    const newTag = [...state];
    newTag.splice(idx, 1);
    setState(newTag);
    updateTagList(newTag);
  };

  const updateTag = (value: string, id: string) => {
    const newTag = [...state];
    const idx = newTag.findIndex((el) => {
      return el.id === id;
    });
    newTag.splice(idx, 1, { value: value, id: id });
    setState(newTag);
    updateTagList(newTag);
  };

  const tags = state.map((el) => {
    return (
      <div className={style.wrapperTag} key={el.id}>
        <input
          value={el.value}
          placeholder="Tag"
          className={style.inputTag}
          onChange={(e) => {
            updateTag(e.target.value, el.id);
          }}
        ></input>
        <button type="button" className={style.btnTag} onClick={() => deleteTag(el.id)}>
          Delete
        </button>
      </div>
    );
  });

  return (
    <React.Fragment>
      {tags.length > 0 && <span>Tags</span>}
      {tags}
      <button type="button" className={style.addTag} onClick={() => setState([...state, { value: "", id: v4() }])}>
        Add tag
      </button>
    </React.Fragment>
  );
};

export default TagInput;
