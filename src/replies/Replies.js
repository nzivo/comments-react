import { useState, useEffect } from "react";
import ReplyForm from "./ReplyForm";
import Reply from "./Reply";
import {
  getReplies as getRepliesApi,
  createReply as createReplyApi,
  updateReply as updateReplyApi,
  deleteReply as deleteReplyApi,
} from "../api";

const Replies = ({ repliesUrl, currentUserId }) => {
  const [backendReplies, setBackendReplies] = useState([]);
  const [activeReply, setActiveReply] = useState(null);
  const rootReplies = backendReplies.filter(
    (backendReply) => backendReply.parentId === null
  );
  const getReplies = (replyId) =>
    backendReplies
      .filter((backendReply) => backendReply.parentId === replyId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addReply = (text, parentId) => {
    createReplyApi(text, parentId).then((reply) => {
      setBackendReplies([reply, ...backendReplies]);
      setActiveReply(null);
    });
  };

  const updateReply = (text, replyId) => {
    updateReplyApi(text).then(() => {
      const updatedBackendReplies = backendReplies.map((backendReply) => {
        if (backendReply.id === replyId) {
          return { ...backendReply, body: text };
        }
        return backendReply;
      });
      setBackendReplies(updatedBackendReplies);
      setActiveReply(null);
    });
  };
  const deleteReply = (replyId) => {
    if (window.confirm("Are you sure you want to remove reply?")) {
      deleteReplyApi().then(() => {
        const updatedBackendReplies = backendReplies.filter(
          (backendReply) => backendReply.id !== replyId
        );
        setBackendReplies(updatedBackendReplies);
      });
    }
  };

  useEffect(() => {
    getRepliesApi().then((data) => {
      setBackendReplies(data);
    });
  }, []);

  return (
    <div className="">
      <div className="replies">
        
        <div className="replies-container">
          {rootReplies.map((rootReply) => (
            <Reply
              key={rootReply.id}
              reply={rootReply}
              replies={getReplies(rootReply.id)}
              activeReply={activeReply}
              setActiveReply={setActiveReply}
              addReply={addReply}
              deleteReply={deleteReply}
              updateReply={updateReply}
              currentUserId={currentUserId}
            />
          ))}
        </div>

        <ReplyForm className="form" submitLabel="Send" handleSubmit={addReply} />
      </div>
    </div>
    
  );
};

export default Replies;
