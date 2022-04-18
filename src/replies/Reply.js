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
    <div className="">
      <div key={reply.id} className="card">
        <div class="column-voting">
          <div className="vote p-5">
            <i className="material-icons">add</i>
            <p className="votes">12</p>
            <i className="material-icons">minimize</i>
          </div>
        </div>

        <div className="column-description">
          <div className="profile">
            <div className="profile-details">
              <img src={reply.icon} alt="user profile" />
              <p className="author p-5">{reply.username}</p>
              <p className="date p-5">{createdAt} days ago</p>
            </div>
            <div className="reply-content">
              <div className="reply-actions">
                {canEdit && (
                  <div
                    className="reply-actions reply-action-color"
                    onClick={() =>
                      setActiveReply({ id: reply.id, type: "editing" })
                    }
                  >
                    <i class="material-icons">edit</i> Edit
                  </div>
                )}
                {canDelete && (
                  <div
                    className="reply-actions delete-action"
                    onClick={() => deleteReply(reply.id)}
                  >
                    <i class="material-icons">delete</i> Delete
                  </div>
                )}
                {canReply && (
                  <div
                    className="reply-actions reply-action-color"
                    onClick={() =>
                      setActiveReply({ id: reply.id, type: "replying" })
                    }
                  >
                    <i class="material-icons">reply</i> Reply
                  </div>
                )}
              </div>
            </div>
          </div>
          {!isEditing &&<div className="profile-description"><p>{reply.body}</p></div>}
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
