import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "../css/app.module.css";

const ProfileItem = ({
  profile: { _id, name, bio, status, avatar, location, website },
}) => {
  function truncateText(text, limit) {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className={`${style.containerSingleProfile}`}>
      <div className="pe-3">
        <img
          src={avatar}
          alt="avatar"
          className="rounded"
          height={"80px"}
          width={"80px"}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="w-75 pe-3">
        <h5>{name}</h5>
        {location && <p>{location}</p>}
        {website && <p>{website}</p>}
      </div>
      <div>
        <Link
          to={`/profile/${_id}`}
          className={`btn btn-primary ${style.link}`}
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
