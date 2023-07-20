import { Fragment } from "react";
import style from "../css/app.module.css";

const Error = () => {
  return (
    <article className={style.error}>
      <h3>Uh-oh...Something went wrong...</h3>
    </article>
  );
};

export default Error;
