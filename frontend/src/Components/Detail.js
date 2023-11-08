import React, { useCallback, useMemo } from "react";
import "./Detail.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  deletePost,
  saveComment,
  saveRating,
  selectedPostSel,
  setEditingPost,
  setIsModalOpen,
} from "../Slices/postSlice";
import { Button, Form, Input, Rate, Typography, message } from "antd";
import { getAverage } from "./utils";
import { userSel } from "../Slices/userSlice";
import { Comment } from "./Comment";
import { TagStar } from "./TagStar";
const { Title, Text } = Typography;

export const Detail = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const selectedPost = useSelector(selectedPostSel);
  const user = useSelector(userSel);
  const [messageApi, contextHolder] = message.useMessage();

  const onSuccess = (content) => {
    form.resetFields();
    messageApi.open({
      type: "success",
      content,
      duration: 2.5,
    });
  };

  const onFail = (content) => {
    messageApi.open({
      type: "error",
      content,
      duration: 2.5,
    });
  };

  const average = useMemo(
    () => (selectedPost ? getAverage(selectedPost.ratings) : 0),
    [selectedPost]
  );

  const userRating = useMemo(() => {
    if (selectedPost) {
      const foundRating = selectedPost.ratings.find(
        ({ userId }) => userId === user._id
      );

      return foundRating;
    }

    return undefined;
  }, [selectedPost, user]);

  const isOwn = useCallback(
    (commentUserId) => commentUserId === user._id,
    [user]
  );

  const isOwnPost = useMemo(
    () => selectedPost?.userId === user._id,
    [selectedPost, user]
  );

  const handleSave = (values) => {
    const payload = {
      ...values,
      userId: user._id,
      userName: user.name,
    };
    dispatch(saveComment(selectedPost._id, payload, onSuccess, onFail));
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(selectedPost._id, id, onSuccess, onFail));
  };

  const handleRate = (value) => {
    const payload = {
      id: userRating?._id,
      value,
      userId: user._id,
    };
    dispatch(saveRating(selectedPost._id, payload, onSuccess, onFail));
  };

  const handleDeletePost = () => {
    dispatch(deletePost(selectedPost._id, onSuccess, onFail));
  };

  const handleEditPost = () => {
    dispatch(setEditingPost(true));
    dispatch(setIsModalOpen(true));
  };

  if (!selectedPost) {
    return (
      <div className="emptyDetails">
        <Title level={2}>Select a card</Title>
      </div>
    );
  }

  return (
    <div className="detailContainer">
      {contextHolder}
      {isOwnPost && (
        <div className="rigthBtnContainer">
          <Button
            size="small"
            style={{ marginRight: "8px" }}
            onClick={handleDeletePost}
          >
            Delete
          </Button>
          <Button type="primary" size="small" onClick={handleEditPost}>
            Edit
          </Button>
        </div>
      )}
      <img src={selectedPost.picUrl} alt="post img" className="postImg" />
      <div className="postTitleContainer">
        <Title level={1}>{selectedPost.title}</Title>
        <div className="rateContainer">
          <Rate allowClear={false} value={average} onChange={handleRate} />
          <Text>{"Your rating: "}</Text>
          {userRating ? <TagStar score={userRating.value} /> : "--"}
        </div>
      </div>
      <div>
        <Title className="description" level={4}>
          {selectedPost.description}
        </Title>
      </div>
      {selectedPost.comments.map((comment) => (
        <Comment
          comment={comment}
          isOwnComment={isOwn(comment.userId)}
          onSaveComment={handleSave}
          onDeleteComment={handleDeleteComment}
        />
      ))}
      <div>
        <Form form={form} onFinish={handleSave}>
          <Form.Item
            name="message"
            rules={[{ required: true, message: "Message is required" }]}
          >
            <Input.TextArea rows={4} placeholder="Comment" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
