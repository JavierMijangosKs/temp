import React, { useMemo } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editingPostSel,
  isModalOpenSel,
  savePost,
  selectedPostSel,
  setEditingPost,
  setIsModalOpen,
} from "../Slices/postSlice";
import { userSel } from "../Slices/userSlice";

export const FormModal = ({ onSuccess, onFail }) => {
  const dispatch = useDispatch();
  const isEditing = useSelector(editingPostSel);
  const selectedPost = useSelector(selectedPostSel);
  const isModalOpen = useSelector(isModalOpenSel);
  const user = useSelector(userSel);

  const initialValues = useMemo(() => {
    if (isEditing && selectedPost) {
      return {
        picUrl: selectedPost.picUrl,
        title: selectedPost.title,
        description: selectedPost.description,
      };
    }

    return undefined;
  }, [selectedPost, isEditing]);

  const handleClickCancel = () => {
    dispatch(setEditingPost(false));
    dispatch(setIsModalOpen(false));
  };

  const handleSave = (values) => {
    const payload = {
      ...values,
      userId: user._id,
      id: selectedPost && isEditing ? selectedPost._id : undefined,
    };
    dispatch(savePost(payload, onSuccess, onFail));
  };

  return (
    <Modal
      title="Post"
      open={isModalOpen}
      onCancel={handleClickCancel}
      footer={[]}
      destroyOnClose
    >
      <Form onFinish={handleSave}>
        <Form.Item
          name="picUrl"
          initialValue={initialValues ? initialValues.picUrl : undefined}
          rules={[{ required: true, message: "Pic URL is required" }]}
        >
          <Input placeholder="Pic URL" />
        </Form.Item>
        <Form.Item
          name="title"
          initialValue={initialValues ? initialValues.title : undefined}
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          initialValue={initialValues ? initialValues.description : undefined}
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item className="rigthBtnContainer">
          <Button style={{ marginRight: "8px" }} onClick={handleClickCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
