import ReplyForm from "./ReplyForm";

const Reply = ({
  reply,
  replies,
  setActiveReply,
  activeReply,
  updateReply,
  deleteReply,
  addReply,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeReply &&
    activeReply.id === reply.id &&
    activeReply.type === "editing";
  const isReplying =
    activeReply &&
    activeReply.id === reply.id &&
    activeReply.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(reply.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === reply.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === reply.userId && !timePassed;
  const replyId = parentId ? parentId : reply.id;
  const createdAt = Math.round((new Date().getTime() - new Date(reply.createdAt).getTime())/ (1000 * 3600 * 24));
  return (
    <div className="card">
      <div key={reply.id} className="reply">
        <div className="reply-image-container">
          <img src={reply.icon} alt="user profile" />
        </div>
        <div className="reply-right-part">
          <div className="reply-content">
            <div className="reply-author">{reply.username}</div>
            <div className="reply-date"> {createdAt} days ago</div>
          <div className="reply-actions">
            {canEdit && (
              <div
                className="reply-action reply-action-color"
                onClick={() =>
                  setActiveReply({ id: reply.id, type: "editing" })
                }
              >
                <i class="material-icons">edit</i> Edit
              </div>
            )}
            {canDelete && (
              <div
                className="reply-action delete-action"
                onClick={() => deleteReply(reply.id)}
              >
                <i class="material-icons">delete</i> Delete
              </div>
            )}
            {canReply && (
              <div
                className="reply-action reply-action-color"
                onClick={() =>
                  setActiveReply({ id: reply.id, type: "replying" })
                }
              >
                 <i class="material-icons">reply</i> Reply
              </div>
            )}
          </div>
          </div>
          {!isEditing && <div className="reply-text">{reply.body}</div>}
          {isEditing && (
            <ReplyForm
              submitLabel="Update"
              hasCancelButton
              initialText={reply.body}
              handleSubmit={(text) => updateReply(text, reply.id)}
              handleCancel={() => {
                setActiveReply(null);
              }}
            />
          )}
          {isReplying && (
            <ReplyForm
              submitLabel="Reply"
              handleSubmit={(text) => addReply(text, replyId)}
            />
          )}
          {replies.length > 0 && (
            <div className="replies">
              {replies.map((reply) => (
                <Reply
                  reply={reply}
                  key={reply.id}
                  setActiveReply={setActiveReply}
                  activeReply={activeReply}
                  updateReply={updateReply}
                  deleteReply={deleteReply}
                  addReply={addReply}
                  parentId={reply.id}
                  replies={[]}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
