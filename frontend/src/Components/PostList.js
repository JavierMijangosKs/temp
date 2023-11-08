import React, { useEffect } from "react";
import "./PostList.css";
import { Button, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsList,
  postsListSel,
  selectedPostSel,
  setIsModalOpen,
  setSelectedPost,
} from "../Slices/postSlice";
import { PostItem } from "./PostItem";

const { Text } = Typography;

export const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postsListSel);
  const postSelected = useSelector(selectedPostSel);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const onFail = (content) => {
      messageApi.open({
        type: "error",
        content,
        duration: 2.5,
      });
    };
    dispatch(getPostsList(onFail));
  }, [dispatch, messageApi]);

  const handleClickAdd = () => dispatch(setIsModalOpen(true));
  const handleClickPost = (post) => () => dispatch(setSelectedPost(post));

  return (
    <div className="listContainer">
      {contextHolder}
      <div className="listHeader">
        <Text strong>Select a card to evaluete it</Text>
        <Button shape="circle" type="primary" onClick={handleClickAdd}>
          +
        </Button>
      </div>
      <div className="listContent">
        {posts.map((item) => (
          <div key={item._id}>
            <PostItem
              post={item}
              isSelected={postSelected && item._id === postSelected._id}
              onClick={handleClickPost(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
