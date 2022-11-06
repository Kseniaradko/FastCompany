import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities = [...state.entities, action.payload];
        },
        commentCreateFailed: (state, action) => {
            state.error = action.payload;
        },
        commentDeleted: (state, action) => {
            state.entities = state.entities.filter((c) => c._id !== action.payload);
        },
        commentDeleteFailed: (state, action) => {
            state.error = action.payload;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsReceived,
    commentsRequestFailed,
    commentsRequested,
    commentCreated,
    commentCreateFailed,
    commentDeleted,
    commentDeleteFailed
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
        dispatch(commentsRequested());
        try {
            const { content } = await commentService.getComments(userId);
            dispatch(commentsReceived(content));
        } catch (error) {
            dispatch(commentsRequestFailed(error.message));
        }
};

export const createComment = (comment) => async (dispatch) => {
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentCreateFailed(error.message));
    }
};

export const removeComments = (id) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentDeleted(id));
        }
    } catch (error) {
        dispatch(commentDeleteFailed(error.message));
    };
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
