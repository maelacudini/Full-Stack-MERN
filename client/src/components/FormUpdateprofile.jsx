import React, { useEffect, useState } from "react";
import style from "../css/app.module.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, updateProfile } from "../actions/profile";
import { setAlert } from "../actions/alert";
import Alert from "./Alert";

const FormUpdateprofile = ({
  setAlert,
  updateProfile,
  getCurrentProfile,
  auth: { profile },
}) => {
  const [input, setInput] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    avatar: profile?.avatar || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
    social: profile?.social || {},
    password: "",
  });

  useEffect(() => {
    setInput((prevInput) => ({
      ...prevInput,
      name: profile?.name || "",
      email: profile?.email || "",
      avatar: profile?.avatar || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      website: profile?.website || "",
      social: profile?.social || {},
      password: "",
    }));
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {
      avatar: input.avatar,
      name: input.name,
      bio: input.bio,
      location: input.location,
      website: input.website,
      social: {
        instagram: input.social.instagram,
        youtube: input.social.youtube,
        twitter: input.social.twitter,
        linkedin: input.social.linkedin,
        facebook: input.social.facebook,
      },
    };

    delete updatedFields.password; // Remove the password field from updatedFields

    await updateProfile(updatedFields, profile._id);
    console.log("Profile updated");

    setInput((prevInput) => ({
      ...prevInput,
      password: "", // Clear the password field
    }));

    getCurrentProfile();
  };

  return (
    <article className={style.cardContainer}>
      <form className={style.postCard} onSubmit={handleSubmit}>
        <Alert />
        <div className="row">
          <div className="mb-3 col-sm-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </div>
          <div className="mb-3 col-sm-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-sm-6">
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <input
              type="url"
              className="form-control"
              id="avatar"
              placeholder="Avatar"
              value={input.avatar}
              onChange={(e) => setInput({ ...input, avatar: e.target.value })}
            />
          </div>
          <div className="mb-3 col-sm-6">
            <label htmlFor="website" className="form-label">
              Website
            </label>
            <input
              type="text"
              className="form-control"
              id="website"
              placeholder="Website"
              value={input.website}
              onChange={(e) => setInput({ ...input, website: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Location"
            value={input.location}
            onChange={(e) => setInput({ ...input, location: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            type="text"
            className="form-control"
            id="bio"
            placeholder="Bio"
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
          />
        </div>
        <div className="row">
          <label htmlFor="social" className="form-label">
            Social
          </label>
          <div className="mb-3 col-6">
            <input
              type="text"
              className="form-control mb-2"
              id="instagram"
              placeholder="Instagram"
              value={input.social.instagram}
              onChange={(e) =>
                setInput({
                  ...input,
                  social: {
                    ...input.social,
                    instagram: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              id="twitter"
              placeholder="Twitter"
              value={input.social.twitter}
              onChange={(e) =>
                setInput({
                  ...input,
                  social: {
                    ...input.social,
                    twitter: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              id="youtube"
              placeholder="Youtube"
              value={input.social.youtube}
              onChange={(e) =>
                setInput({
                  ...input,
                  social: {
                    ...input.social,
                    youtube: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="mb-3 col-6">
            <input
              type="text"
              className="form-control mb-2"
              id="facebook"
              placeholder="Facebook"
              value={input.social.facebook}
              onChange={(e) =>
                setInput({
                  ...input,
                  social: {
                    ...input.social,
                    facebook: e.target.value,
                  },
                })
              }
            />
            <input
              type="text"
              className="form-control"
              id="linkedin"
              placeholder="Linkedin"
              value={input.social.linkedin}
              onChange={(e) =>
                setInput({
                  ...input,
                  social: {
                    ...input.social,
                    linkedin: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Insert Password to Proceed
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          value="Submit"
          className={`btn btn-primary ${style.link}`}
        >
          Submit
        </button>
      </form>
    </article>
  );
};

FormUpdateprofile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateProfile,
  setAlert,
  getCurrentProfile,
})(FormUpdateprofile);
