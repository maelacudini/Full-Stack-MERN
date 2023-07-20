import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../actions/profile";
import style from "../css/app.module.css";
import { useParams } from "react-router-dom";

const ProfilePage = ({ getProfileById, profile: { profile }, auth }) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  if (!profile) {
    return <div>Loading...</div>; // Display a loading message while profile data is being fetched
  }

  return (
    <div className="text-white mb-3" style={{ marginTop: "100px" }}>
      <h3>
        {profile.name}'s profile! <i className="bi bi-stars" />
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
                height: "400px",
                objectFit: "cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
          <div className="col-md-8">
            <div className={style.cardDesc}>
              <h3 className="card-title">{profile?.name}</h3>
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
              <br />
              <br />
              <div>
                {profile?.social && (
                  <div className={style.socialProfilepage}>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(ProfilePage);
