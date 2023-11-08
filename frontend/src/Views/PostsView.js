import React from "react";
import "./Post.css";
import { Col, Layout, Row, message } from "antd";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import { userSel } from "../Slices/userSlice";
import { Link } from "react-router-dom";
import { PostList } from "../Components/PostList";
import { FormModal } from "../Components/FormModal";
import { Detail } from "../Components/Detail";

const { Title } = Typography;
const { Header, Content } = Layout;

export const PostsView = () => {
  const user = useSelector(userSel);
  const [messageApi, contextHolder] = message.useMessage();

  const onSuccess = (content) => {
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

  return (
    <Layout>
      {contextHolder}
      <Header className="header">
        <Title level={5} className="title">
          Evaluation App
        </Title>
      </Header>
      <Content>
        <div className="strip">
          <Title level={5} className="nameTitle">
            <Link to={"/user"}>{`Hello ${user.name}!`}</Link>
          </Title>
          <Title level={3} className="welcomeTitle">
            Welcome to the Evaluation App!
          </Title>
        </div>
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <PostList />
          </Col>
          <Col xs={24} md={16}>
            <Detail />
          </Col>
        </Row>
      </Content>
      <FormModal isModalOpen={true} onSuccess={onSuccess} onFail={onFail} />
    </Layout>
  );
};
