import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "../css/app.module.css";
import {
  deleteAccount,
  getCurrentProfile,
  updateProfile,
} from "../actions/profile";
import {
  getPosts,
  deleteComment,
  deletePost,
  addComment,
  addLike,
  removeLike,
} from "../actions/post";
import formatDate from "../utils/formatDate";
import FormUpdateprofile from "./FormUpdateprofile";
import DeleteAccount from "./DeleteAccount";

const Dashboard = ({
  getCurrentProfile,
  getPosts,
  profile: { profile },
  post: { posts },
  addComment,
  deleteComment,
  deletePost,
  addLike,
  removeLike,
  updateProfile,
  deleteAccount,
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
    console.log("get current profile");
    getCurrentProfile();
    console.log(profile && profile);
  }, [getCurrentProfile]);

  useEffect(() => {
    getPosts();
  }, [getPosts, addComment, deleteComment, posts]);

  return (
    <div className={style.containerDashboard}>
      {profile && (
        <div>
          <h3 className="text-white mb-3">
            Your Dashboard! <i class="bi bi-stars" />
          </h3>
          <div className={`card ${style.cardProfile}`}>
            <div className="row g-3">
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                <img
                  src={profile.avatar}
                  className="img-fluid rounded"
                  alt={profile.name}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
              <div className="col-md-8">
                <div className={style.cardDesc}>
                  <h3 className="card-title">Welcome {profile?.name} !</h3>
                  <p>
                    <b>Location:</b>{" "}
                    {profile.location ? profile.location : "No location yet"}
                  </p>
                  <p>
                    <b>Bio:</b> {profile.bio ? profile.bio : "No bio yet"}
                  </p>
                  <div>
                    <b className="d-inline">Website: </b>
                    <a
                      className={`nav-link d-inline ${style.navLink}`}
                      href={profile.website}
                    >
                      {profile.website ? profile.website : "No website yet"}
                    </a>
                  </div>
                  <hr />
                  <div>
                    {profile?.social && (
                      <div className={style.socialDashboard}>
                        {profile.social.instagram && (
                          <a
                            href={profile.social.instagram}
                            className={`nav-link d-inline me-2 ${style.navLink}`}
                          >
                            <i className="bi bi-instagram" />
                          </a>
                        )}
                        {profile.social.twitter && (
                          <a
                            href={profile.social.twitter}
                            className={`nav-link d-inline me-2 ${style.navLink}`}
                          >
                            <i className="bi bi-twitter" />
                          </a>
                        )}
                        {profile.social.youtube && (
                          <a
                            href={profile.social.youtube}
                            className={`nav-link d-inline me-2 ${style.navLink}`}
                          >
                            <i className="bi bi-youtube" />
                          </a>
                        )}
                        {profile.social.facebook && (
                          <a
                            href={profile.social.facebook}
                            className={`nav-link d-inline me-2 ${style.navLink}`}
                          >
                            <i className="bi bi-facebook" />
                          </a>
                        )}
                        {profile.social.linkedin && (
                          <a
                            href={profile.social.linkedin}
                            className={`nav-link d-inline me-2 ${style.navLink}`}
                          >
                            <i className="bi bi-linkedin" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <a
                    className={`btn btn-primary mt-3 ${style.link} ${style.updateBtn}`}
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Update your profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`collapse mt-3 ${style.postItem}`}
            id="collapseExample"
          >
            <FormUpdateprofile />
          </div>
        </div>
      )}

      <div className={style.postGrid}>
        {posts
          .filter((post) => post.profile === profile?._id)
          .map((post) => (
            <article key={post._id} className={style.postItem}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    srcSet={profile.avatar}
                    className={style.profileAvatarPost}
                  />
                  <Link
                    className="nav-link d-inline"
                    to={`/profile/${profile._id}`}
                  >
                    <b>{post.name}</b>
                  </Link>
                </div>
                <small>{formatDate(post.date)}</small>
              </div>
              <img
                src={post.image}
                alt={post.name}
                srcSet={post.image}
                className={`${style.imageDashboard}`}
              />
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button
                    type="button"
                    className={style.likeBtn}
                    onClick={() =>
                      post.likes.some((like) => like.profile === profile._id)
                        ? removeLike(post._id)
                        : addLike(post._id)
                    }
                  >
                    <i
                      className={`bi ${
                        post.likes.some(
                          (like) =>
                            like.profile &&
                            like.profile.toString() === profile._id.toString()
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
                    <i className="bi bi-chat" />
                  </button>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </button>
              </div>

              <div>
                <p>{<b>{post.likes.length} likes</b>}</p>
                <Link className="nav-link" to={`/profile/${profile._id}`}>
                  <b>{post.name}</b> {post.text}
                </Link>
              </div>

              <div>
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
                          to={`/profile/${profile._id}`}
                        >
                          <b>{comment.name}</b>
                        </Link>{" "}
                        {comment.text}
                      </p>
                      <small
                        onClick={() =>
                          handleDeleteComment(post._id, comment._id)
                        }
                      >
                        Delete
                      </small>
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
          ))}
      </div>
      <DeleteAccount />
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getPosts,
  deleteComment,
  addComment,
  deletePost,
  addLike,
  removeLike,
  updateProfile,
  deleteAccount,
})(Dashboard);
