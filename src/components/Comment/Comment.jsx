import React, { useState } from "react";
import { MDBCardImage, MDBTypography } from "mdb-react-ui-kit";
import { CommentForm } from "../CommentForm/CommentForm";
export const Comment = ({
  comment,
  replies,
  currentUserID,
  deleteComment,
  activeComment,
  setActiveComment,
  parentId = null,
  addComment,
  isUserAdded
}) => {
  const canReply = Boolean(currentUserID);
  const [heartCount, setHeartCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const canDelete = currentUserID === comment.userId;
  const isReplying =
    activeComment &&
    activeComment.type === "reply" &&
    activeComment.id === comment.id;

  const replyId = parentId ? parentId : comment.id;
  const isCommentReply = parentId === null ? false : true;
  const toggleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
    setHeartCount((prevCount) => (isClicked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <div>
      <div className="d-flex flex-start">
        <MDBCardImage
          className="rounded-circle shadow-1-strong me-3"
          src={comment.profile}
          alt="avatar"
          width="40"
          height="40"
        />

        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <MDBTypography tag="h6" className="text-dark fw-bold mb-0">
              {comment.username}
            </MDBTypography>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <MDBTypography tag="h6" style={{ color: "rgba(100, 100, 100, 1)" }}>
              {comment.body}
            </MDBTypography>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="small mb-0" style={{ color: "#aaa" }}>
              <a href="#!" onClick={toggleClick}>
                {!isClicked ? (
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.325 1.00979C12.5187 -0.508552 9.72812 -0.280489 8 1.47841C6.27187 -0.280489 3.48125 -0.511676 1.675 1.00979C-0.674996 2.98737 -0.331246 6.21149 1.34375 7.9204L6.825 13.5033C7.1375 13.8219 7.55625 14 8 14C8.44687 14 8.8625 13.825 9.175 13.5064L14.6562 7.92353C16.3281 6.21462 16.6781 2.9905 14.325 1.00979ZM13.5875 6.86757L8.10625 12.4504C8.03125 12.5254 7.96875 12.5254 7.89375 12.4504L2.4125 6.86757C1.27188 5.70538 1.04063 3.50598 2.64063 2.15947C3.85625 1.13788 5.73125 1.29096 6.90625 2.48751L8 3.60283L9.09375 2.48751C10.275 1.28471 12.15 1.13788 13.3594 2.15635C14.9562 3.50286 14.7187 5.71475 13.5875 6.86757Z"
                      fill="#C2C2C2"
                    />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.447 0.957269C12.7345 -0.502078 10.1877 -0.239583 8.61584 1.38226L8.00023 2.01662L7.38462 1.38226C5.8159 -0.239583 3.26595 -0.502078 1.55348 0.957269C-0.408984 2.63224 -0.512107 5.63843 1.24411 7.45402L7.29087 13.6976C7.68149 14.1008 8.31585 14.1008 8.70647 13.6976L14.7532 7.45402C16.5126 5.63843 16.4094 2.63224 14.447 0.957269Z"
                      fill="#E33E38"
                    />
                  </svg>
                )}
              </a>
              {"     "}
              {heartCount}
              {"      "}•{"     "}
              {canDelete &&(
                <a
                  href="#!"
                  className="link-grey"
                  onClick={() => deleteComment(comment.id)}
                  style={{color: "red"}}
                >
                  Remove
                </a>
              )}
              
              {canReply && !isCommentReply && !isUserAdded && (
                <a
                  href="#!"
                  className="link-grey"
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: "reply" })
                  }
                >
                  Reply
                </a>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {isReplying && (
        <div className="mt-4 ms-5">
        <CommentForm handleSubmit={(text) => addComment(text, replyId)} />
        </div>
      )}
      
      {replies.length > 0 && (
        <div
          className="replies"
          style={{ marginLeft: "50px", marginTop: "25px" }}
        >
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              replies={[]}
              currentUserID={currentUserID}
              deleteComment={deleteComment}
              parentId={comment.id}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
              isUserAdded={isUserAdded}
            />
          ))}
        </div>
      )}
    </div>
  );
};
