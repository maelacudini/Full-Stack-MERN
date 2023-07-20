import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteAccount } from "../actions/profile";
import style from "../css/app.module.css";

const DeleteAccount = ({ deleteAccount }) => {
  return (
    <div className={style.dangerZone}>
      <h4>Danger Zone!</h4>
      <button
        className={`btn btn-danger ${style.link}`}
        onClick={() => deleteAccount()}
      >
        Delete Account
      </button>
    </div>
  );
};

DeleteAccount.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
};

export default connect(null, { deleteAccount })(DeleteAccount);
