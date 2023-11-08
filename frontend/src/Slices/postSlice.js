import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_API } from "../config";

const initialState = {
  postsList: [],
  selectedPost: undefined,
  editingPost: false,
  isModalOpen: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostList: (state, action) => {
      state.postsList = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setEditingPost: (state, action) => {
      state.editingPost = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setPostList, setSelectedPost, setEditingPost, setIsModalOpen } =
  postSlice.actions;

export const postsListSel = (state) => state.post.postsList;
export const selectedPostSel = (state) => state.post.selectedPost;
export const editingPostSel = (state) => state.post.editingPost;
export const isModalOpenSel = (state) => state.post.isModalOpen;

export const getPostsList = (onFail) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${BASE_API}/posts/`);
    dispatch(setPostList(data));
    const selectedPost = selectedPostSel(getState());
    if (selectedPost) {
      const foundPost = data.find((post) => post._id === selectedPost._id);
      dispatch(setSelectedPost(foundPost ? foundPost : undefined));
    }
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.message;
    onFail(message || "Error");
  }
};

export const savePost = (payload, onSuccess, onFail) => async (dispatch) => {
  try {
    if (payload.id) {
      await axios.put(`${BASE_API}/posts/${payload.id}`, payload);
      dispatch(setEditingPost(false));
    } else {
      await axios.post(`${BASE_API}/posts`, payload);
    }

    onSuccess("Post saved");
    dispatch(setIsModalOpen(false));
    dispatch(getPostsList(onFail));
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.message;
    onFail(message || "Error");
  }
};

export const deletePost = (id, onSuccess, onFail) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_API}/posts/${id}`);
    dispatch(setSelectedPost(undefined));
    onSuccess("Post deleted");
    dispatch(getPostsList(onFail));
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.message;
    onFail(message || "Error");
  }
};

export const saveRating =
  (postId, payload, onSuccess, onFail) => async (dispatch) => {
    try {
      if (payload.id) {
        await axios.put(`${BASE_API}/ratings/${postId}/${payload.id}`, payload);
      } else {
        await axios.post(`${BASE_API}/ratings/${postId}`, payload);
      }

      onSuccess("Rating saved");
      dispatch(getPostsList(onFail));
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message;
      onFail(message || "Error");
    }
  };

export const saveComment =
  (postId, payload, onSuccess, onFail) => async (dispatch) => {
    try {
      if (payload.id) {
        await axios.put(
          `${BASE_API}/comments/${postId}/${payload.id}`,
          payload
        );
      } else {
        await axios.post(`${BASE_API}/comments/${postId}`, payload);
      }

      onSuccess("Comment saved");
      dispatch(getPostsList(onFail));
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message;
      onFail(message || "Error");
    }
  };

export const deleteComment =
  (postId, commentId, onSuccess, onFail) => async (dispatch) => {
    try {
      await axios.delete(`${BASE_API}/comments/${postId}/${commentId}`);
      onSuccess("Comment deleted");
      dispatch(getPostsList(onFail));
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message;
      onFail(message || "Error");
    }
  };

export const postReducer = postSlice.reducer;
