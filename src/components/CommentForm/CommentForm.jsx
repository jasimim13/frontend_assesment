import React, { useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";

export const CommentForm = ({ handleSubmit}) => {
  const [text, setText] = useState("");
  const isTextDisabled = text.length === 0;
  const onSubmit = (action) => {
    action.preventDefault();
    handleSubmit(text);
    setText("");
  };
  const buttonStyle = {
    position: "absolute",
    top: "8%",
    right: "2%",
    border: "none",
    cursor: "pointer",
    backgroundColor: "rgba(0, 0, 0, 0)",
  };

  return (
    <div>
          <div
            className="d-flex flex-start w-100"
            style={{ position: "relative" }}
          >
            <MDBInput
              label="Write Your Comment"
              id="textAreaExample"
              rows={1}
              wrapperClass="w-100"
              value={text}
              onChange={(e) => setText(e.target.value)}
              
            />
            <button
              style={buttonStyle}
              disabled={isTextDisabled}
              onClick={onSubmit}
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8763 1.0985L0.390353 9.45564C-0.175333 9.78068 -0.10345 10.5683 0.45911 10.8058L3.78134 12.1997L12.7604 4.28634C12.9323 4.1332 13.1761 4.3676 13.0292 4.54574L5.50028 13.7186L5.50028 16.2345C5.50028 16.9721 6.391 17.2627 6.82854 16.7283L8.81313 14.3124L12.7073 15.9438C13.1511 16.1314 13.6574 15.8532 13.7387 15.375L15.9889 1.87358C16.0952 1.24226 15.417 0.785966 14.8763 1.0985Z"
                  fill="#6590FF"
                />
              </svg>
            </button>
          </div>
    </div>
  );
};
