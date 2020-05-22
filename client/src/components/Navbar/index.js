import React from "react";
import "./style.css";

function Navbar(props) {
  const showLogout = props.showLogin ? "form-group" : "form-group display-none";
  const hideLogoutButton = props.hideLogoutButton ? "display-none" : "display-block";
  return (
    <nav className="navbar navbar-light bg-light height">
      <div className="row">
        <a className="navbar-brand col-sm-3" href="/">
          <img src={props.image} width="100" height="100" alt="logo" />
        </a>
        <h1 className="title-font col-sm-8 text-center navbar-text">
          {props.title}
        </h1>

      </div>
      <div className={showLogout}>
        <form className="form-inline">
          <input
            name="loginName"
            value={props.loginNameValue}
            onChange={props.handleInputChange}
            className="form-control mr-sm-2"
            type="username"
            placeholder="Username"
            aria-label="Username" />
          <input
            name="loginPass"
            value={props.passwordValue}
            onChange={props.handleInputChange}
            className="form-control mr-sm-2"
            type="password"
            placeholder="Password"
            aria-label="Password" />
        </form>
        <div>
          <button  id="login-button" onClick={props.onClick} className="btn btn-outline-success my-2" type="submit">login</button>
        </div>
      </div>
      <div className={hideLogoutButton}>
        <button onClick={props.onClickLogout} className="btn btn-outline-success my-2" type="submit">{props.buttonNameTwo}</button>
      </div>
    </nav>
  );
}

export default Navbar;
