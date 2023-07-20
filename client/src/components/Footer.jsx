import style from "../css/app.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className="row">
        <div className="col-md-9">
          <h3>About Us</h3>
          <p className="m-0">
            Embrace creativity and express yourself through posts, stories, and
            much more on our intuitive and dynamic social platform. Join us on
            this incredible journey of joy, inspiration, and togetherness!
          </p>
          <div className="row mt-3">
            <div className="col-6">
              <ul>
                <li>Legal Department</li>
                <li>Sponsors</li>
                <li>Administration</li>
                <li>Donations</li>
                <li>Work With Us</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>Latest Version</li>
                <li>Help Desk</li>
                <li>Most Asked Questions</li>
                <hr />
                <li></li>
                <li>Copiright Statement</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h3>Contact Us</h3>
          <i className={`bi bi-instagram me-2 ${style.navLink}`} />
          <i className={`bi bi-twitter me-2 ${style.navLink}`} />
          <i className={`bi bi-facebook me-2 ${style.navLink}`} />
          <i className={`bi bi-linkedin me-2 ${style.navLink}`} />
          <i className={`bi bi-envelope me-2 ${style.navLink}`} />
          <p className="mt-3">
            Experience seamless interactions and meaningful connections as you
            explore diverse interests and follow your passions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
