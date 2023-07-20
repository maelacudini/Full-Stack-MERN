import style from "../css/app.module.css";
import { addPost } from "../actions/post";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState } from "react";

const FormPost = ({ addPost, auth: { isAuthenticated } }) => {
  const [input, setInput] = useState({
    text: "",
    image: "",
  });

  const { text, image } = input;

  return (
    <div>
      {isAuthenticated && (
        <article className={`mb-3 ${style.postItem}`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(input);
              addPost({ text, image }); // Pass the input values to the addPost action
              setInput({
                text: "",
                image: "",
              });
            }}
          >
            <h3>New Post</h3>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                name="text"
                id="text"
                className="form-control"
                cols="30"
                rows="5"
                placeholder="Add a description"
                value={text}
                onChange={(e) => setInput({ ...input, text: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Image
              </label>
              <input
                type="url"
                name="image"
                id="image"
                className="form-control"
                placeholder="Choose an image"
                value={image}
                onChange={(e) => setInput({ ...input, image: e.target.value })}
              />
            </div>

            <button
              type="submit"
              value="Submit"
              className={`btn btn-primary ${style.link}`}
            >
              Create
            </button>
          </form>
        </article>
      )}
    </div>
  );
};

FormPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(FormPost);
