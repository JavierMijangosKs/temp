import React, { useMemo } from "react";
import "./User.css";
import { Button, Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, userSel } from "../Slices/userSlice";
import { postsListSel } from "../Slices/postSlice";
import { Link } from "react-router-dom";
import { PostItem } from "../Components/PostItem";
import { Comment } from "../Components/Comment";
const { Title, Text } = Typography;

export const UserView = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSel);
  const posts = useSelector(postsListSel);

  const userStats = useMemo(() => {
    const userPosts = posts.filter((post) => post.userId === user._id);
    let userComments = [];
    posts.forEach((post) => {
      const comments = post.comments.filter(
        (comment) => comment.userId === user._id
      );
      userComments = [...userComments, ...comments];
    });

    return {
      posts: userPosts,
      comments: userComments,
    };
  }, [user, posts]);

  const handleLogOut = () => dispatch(setIsLoggedIn(false));

  return (
    <div className="userView">
      <Link to={"/"}>
        <Title level={4}>{"< Back"}</Title>
      </Link>

      <div className="userInfoContainer">
        <Title level={1}>{user.name}</Title>
        <div>
          <Text strong>No. Posts: </Text>
          <Text>{userStats.posts.length}</Text>
        </div>
        <div>
          <Text strong>No. Comments: </Text>
          <Text>{userStats.comments.length}</Text>
        </div>
        <div className="rigthBtnContainer">
          <Button type="primary" onClick={handleLogOut}>
            Log out
          </Button>
        </div>
        <Row gutter={48}>
          <Col xs={24} md={12}>
            <Title level={3}>Posts</Title>
            {userStats.posts.map((p) => (
              <PostItem post={p} readOnly />
            ))}
          </Col>
          <Col xs={24} md={12}>
            <Title level={3}>Comments</Title>
            {userStats.comments.map((c) => (
              <Comment comment={c} isOwnComment={false} readOnly />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};
