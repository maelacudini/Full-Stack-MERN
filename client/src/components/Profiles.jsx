import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../actions/profile";
import ProfileItem from "./ProfileItem";
import style from "../css/app.module.css";
import SearchBar from "./SearchBar";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleProfiles, setVisibleProfiles] = useState(5);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  // Filter profiles based on search query
  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name &&
      profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSeeMore = () => {
    setVisibleProfiles(visibleProfiles + 5);
  };

  const hiddenProfiles = filteredProfiles.length - visibleProfiles;

  return (
    <article className={style.allProfilesContainer}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <article>
            <SearchBar handleSearch={handleSearch} />
            {filteredProfiles.length > 0 ? (
              filteredProfiles
                .slice(0, visibleProfiles)
                .map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
            ) : (
              <h4 className="text-white" style={{ margin: "20px" }}>
                No profiles found...
              </h4>
            )}
            {filteredProfiles.length > 5 && hiddenProfiles > 0 && (
              <div className="text-center mt-3">
                <a className={style.postComments} onClick={handleSeeMore}>
                  See more...
                </a>
              </div>
            )}
          </article>
        </div>
      )}
    </article>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
