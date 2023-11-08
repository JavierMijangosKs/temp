import React, { useState } from "react";
import "./Comment.css";
import { Button, Card, Form, Input, Typography } from "antd";
const { Title, Text } = Typography;

export const Comment = ({
  comment,
  isOwnComment,
  readOnly = false,
  onSaveComment,
  onDeleteComment,
}) => {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => setEditMode(!editMode);

  const handleDelete = () => {
    onDeleteComment(comment._id);
  };

  const handleSave = (values) => {
    const payload = {
      ...values,
      id: comment._id,
    };
    onSaveComment(payload);
  };

  return (
    <div className="commentContainer">
      <Card>
        {editMode ? (
          <Form onFinish={handleSave}>
            <Form.Item
              name="message"
              initialValue={comment.message}
              rules={[{ required: true, message: "Message is required" }]}
            >
              <Input.TextArea rows={4} placeholder="Comment" />
            </Form.Item>
            <Form.Item className="rigthBtnContainer">
              <Button style={{ marginRight: "8px" }} onClick={toggleEditMode}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <>
            <div>
              <Title className="commentUserName" level={5}>
                {comment.userName}
              </Title>
            </div>
            <Text>{comment.message}</Text>
            {isOwnComment && !readOnly && (
              <div className="rigthBtnContainer">
                <Button
                  size="small"
                  style={{ marginRight: "8px" }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="primary" size="small" onClick={toggleEditMode}>
                  Edit
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
