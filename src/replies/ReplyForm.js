import { useState } from "react";

const ReplyForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <div className="form-row" >
      <form onSubmit={onSubmit} className="form-content">
        <textarea
          className="reply-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="main-btn reply-form-button" disabled={isTextareaDisabled}>
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className="cancel-btn reply-form-button reply-form-cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
    
  );
};

export default ReplyForm;
