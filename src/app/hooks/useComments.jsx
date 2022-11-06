import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";
import { getCurrentUserId } from "../store/users";
import { useSelector } from "react-redux";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState();
    const [error, setError] = useState(null);
    useEffect(() => {
       getComments();
    }, [userId]);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        };
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    };

    async function removeComments(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments(prevState => prevState.filter((c) => c._id !== id));
            }
        } catch (error) {
            errorCatcher(error);
        };
    };

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments(prevState => [...prevState, content]);
        } catch (error) {
            errorCatcher(error);
        }
    };

    return (
        <CommentsContext.Provider value={{ comments, createComment, isLoading, removeComments }}>
            { children }
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
