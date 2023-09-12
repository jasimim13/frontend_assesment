import React, { useState, useEffect } from "react";
import {
  getComments as getCommentsAPI,
  createComment as createCommentAPI,
  deleteComment as deleteCommentAPI,
} from "../../utils/api";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { CommentForm } from "../CommentForm/CommentForm";
import { Comment } from "../Comment/Comment";

export const Comments = ({ currentUserId }) => {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = comments.filter((comment) => comment.parentId === null);

  useEffect(() => {
    getCommentsAPI().then((data) => {
      setComments(data);
    });
  }, []);

  const getReplies = (commentId) => {
    return comments.filter((comment) => comment.parentId === commentId);
  };

  const addComment = (text, parentID) => {
    createCommentAPI(text, parentID).then((newComment) => {
      setComments([...comments, newComment]);
    });
    setActiveComment(null);
  };

  const deleteComment = (commentID) => {
    deleteCommentAPI(commentID).then(() => {
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentID
      );
      setComments(updatedComments);
    });
  };

  return (
    <div className="comments">
      <MDBContainer className="py-5 text-dark" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10" xl="8">
            <MDBTypography tag="h3">Comments</MDBTypography>
            {rootComments.map((rootComment) => (
              <MDBCard className="mb-3" key={rootComment.id}>
                <MDBCardBody>
                  <Comment
                    comment={rootComment}
                    replies={getReplies(rootComment.id)}
                    currentUserID={currentUserId}
                    deleteComment={deleteComment}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    isUserAdded={rootComment.isAddedByUser}
                  />
                </MDBCardBody>
              </MDBCard>
            ))}
            <MDBCard>
              <MDBCardBody>
                <CommentForm handleSubmit={addComment} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
