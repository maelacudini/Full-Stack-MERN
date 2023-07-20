import { useEffect } from "react";
import { getPosts } from "../actions/post";
import style from "../css/app.module.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Hero = ({ post: { posts }, getPosts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <article className={`row m-0 ${style.heroContainer}`}>
      <div className="col-md-6">
        <h1>Welcome to Connect!</h1>
        <h3 className={style.subtitle}>
          Share, Connect, Inspire: Embrace the Journey!
        </h3>
        <p className={style.heroDescription}>
          Connect is a vibrant social platform that allows you to share your
          captivating images with the world. Join a thriving community of
          creative minds, express yourself through stunning visuals, and connect
          with others who share your passions. From breathtaking landscapes to
          heartwarming moments, PicConnect lets you explore and inspire, making
          meaningful connections one photo at a time. So, start sharing your
          unique perspective and discover the endless beauty that awaits you!
        </p>
      </div>

      <div
        id="carouselExampleInterval"
        className={`carousel slide col-md-6 ${style.heroCarousel}`}
        data-bs-ride="carousel"
      >
        <div className="carousel-inner rounded">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval="10000"
            >
              <img
                src={post.image}
                style={{
                  objectFit: "cover",
                  height: "400px",
                  border: "3px solid white",
                  borderRadius: "10px",
                }}
                className="d-block w-100"
                alt="..."
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </article>
  );
};

Hero.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Hero);
