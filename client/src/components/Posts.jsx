import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addComment,
  deleteComment,
} from "../actions/post";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
import style from "../css/app.module.css";
import FormPost from "./FormPost";
import Backtotop from "./Backtotop";

const Posts = ({
  getPosts,
  addLike,
  removeLike,
  deletePost,
  addComment,
  deleteComment,
  auth,
  post: { posts },
  profile: { profiles },
}) => {
  const [text, setText] = useState("");

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    await addComment(postId, { text });
    setText("");
  };

  const handleDeleteComment = async (postId, commentId) => {
    await deleteComment(postId, commentId);
  };

  useEffect(() => {
    getPosts();
  }, [getPosts, posts]);

  return (
    <div>
      <FormPost />

      {posts.map((post) => {
        const profile = profiles.find(
          (profile) =>
            profiles && profiles.length > 0 && profile?._id === post.profile
        );

        return (
          <div key={post._id} className="mb-3">
            <article className={style.postItem}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <img
                    src={profile?.avatar}
                    alt={profile?.name}
                    srcSet={profile?.avatar}
                    className={style.profileAvatarPost}
                  />
                  <Link
                    className="nav-link d-inline"
                    to={`/profile/${profile?._id}`}
                  >
                    <b>{post.name}</b>
                  </Link>
                </div>
                <small>{formatDate(post.date)}</small>
              </div>
              <div className="d-flex justify-content-center">
                <img
                  src={post.image}
                  alt={post.name}
                  srcSet={post.image}
                  className={`${style.imageDashboard}`}
                />
              </div>

              {auth.isAuthenticated && (
                <div className="d-flex justify-content-between">
                  <div>
                    <button
                      type="button"
                      className={style.likeBtn}
                      onClick={() =>
                        post.likes.some(
                          (like) =>
                            like.profile && like.profile === auth.profile._id
                        )
                          ? removeLike(post._id)
                          : addLike(post._id)
                      }
                    >
                      <i
                        className={`bi ${
                          post.likes.some(
                            (like) =>
                              like.profile &&
                              auth.profile &&
                              like.profile.toString() ===
                                auth.profile._id.toString()
                          )
                            ? `bi bi-heart-fill ${style.redBackground}`
                            : "bi-heart"
                        } me-2`}
                      />
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#comment-form-${post._id}`}
                      aria-expanded="false"
                      aria-controls={`#comment-form-${post._id}`}
                      className={style.commentBtn}
                    >
                      <i className="bi bi-chat me-2" />
                    </button>
                  </div>
                  <button
                    className={style.sendBtn}
                    onClick={() => {
                      navigator.clipboard.writeText(post.image);
                      window.alert("Link copied!");
                    }}
                  >
                    <i className="bi bi-send" />
                  </button>
                </div>
              )}

              <p>
                <b>{post.likes.length} likes</b>
              </p>

              <p>
                <Link
                  className="nav-link d-inline"
                  to={`/profile/${post.user}`}
                >
                  <b>{post.name}</b>
                </Link>{" "}
                {post.text}
              </p>

              <div style={{ cursor: "pointer" }}>
                <a
                  className={style.postComments}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#comments-${post._id}`}
                  aria-expanded="false"
                  aria-controls={`comments-${post._id}`}
                >
                  View all {post.comments.length} comments
                </a>
                {post.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="collapse"
                    id={`comments-${post._id}`}
                  >
                    <div className="d-flex justify-content-between">
                      <p>
                        <Link
                          className="nav-link d-inline"
                          to={`/profile/${post.user}`}
                        >
                          <b>{comment.name}</b>
                        </Link>{" "}
                        {comment.text}
                      </p>
                      {auth.isAuthenticated &&
                        auth.profile &&
                        comment.profile === auth.profile._id && (
                          <small
                            onClick={() =>
                              handleDeleteComment(post._id, comment._id)
                            }
                          >
                            Delete
                          </small>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="collapse" id={`comment-form-${post._id}`}>
                <form
                  onSubmit={(e) => handleCommentSubmit(e, post._id)}
                  className={style.commentPostForm}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add a comment"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      minLength={1}
                    />
                    <button
                      className="input-group-text"
                      type="submit"
                      value="submit"
                    >
                      <i className="bi bi-arrow-up-short" />
                    </button>
                  </div>
                </form>
              </div>
            </article>
          </div>
        );
      })}

      <Backtotop />
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  getPosts,
  addComment,
  deleteComment,
})(Posts);
