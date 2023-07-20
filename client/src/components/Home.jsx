import Posts from "../components/Posts";
import Profiles from "./Profiles";
import style from "../css/app.module.css";
import Hero from "./Hero";
import { Parallax } from "react-scroll-parallax";

const Home = () => {
  return (
    <div>
      <div className="hero">
        <Hero />
      </div>

      <main className="row main">
        <div className="profiles col-lg-5">
          <Profiles />
        </div>

        <div className="posts col-lg-7">
          <Posts />
        </div>
      </main>
    </div>
  );
};

export default Home;
